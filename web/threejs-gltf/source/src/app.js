import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, TextureLoader, Color, PlaneGeometry, RawShaderMaterial, BackSide } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const gltfs = {};

const SCENE_TIME = 5000;
const SCENE_TRANSITION = 50;

const scenes = ['st_helens', 'alaska', 'klyuchevskaya', 'colorado_river', 'matterhorn', 'fuji', 'montana', 'patagonia', 'sarez_lake', 'taranaki'];

let currentScene = 0;

const tileSize = 512
const metersPerPixelEquator = 40075.016686 * 1000 / tileSize
// loading some apline tiles
let lonA = 6.8681284538046485;
let latA = 45.8311940795735;
let zoom = 10;
const meterPerPixelAtLocation = metersPerPixelEquator * Math.cos(latA*Math.PI/180) / Math.pow(2, zoom);
const tileWidthMeter = meterPerPixelAtLocation * tileSize;

// Instantiate
let scene = new Scene();
scene.background = new Color(0xEFF3FB);
let width = window.innerWidth;
let height = window.innerHeight;
let ratio = 1;

const camera = new PerspectiveCamera( 20, width / height, 1, 100000);
camera.up.set(0, 0, 1);
camera.position.set(tileWidthMeter, tileWidthMeter, tileWidthMeter / 2);
camera.updateProjectionMatrix();


const container = document.getElementById('map');
const renderer = new WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
container.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;

function loadTextures(scenes) {
	return scenes.reduce((agg, sceneName) => {
		agg.push({
			s: new TextureLoader().load(`./assets/${sceneName}_s.png`),
			t: new TextureLoader().load(`./assets/${sceneName}_t.png`) 
		});
		return agg;
	}, []);
}

const textures = loadTextures(scenes);

// the vertex shader is the one in charge of displacing each vertice upwards/downwards by reading from the elevation texture.
const vertexShader = `
#version 300 es

#define EPS 0.0001

precision mediump float;
precision mediump int;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform sampler2D demTextureA;
uniform sampler2D demTextureB;
uniform float ratioFirst;

in vec3 position;
in vec2 uv;

out vec2 vUv;

// This little subtle varying is so that its value is going to be strictly above 0.0
// only if it matches the edge condition.
// This will later be used in the fragment shader so that we detech what are the vertical edges, in order
// to make them brown
out float isEdge;


void main() {
  isEdge = 0.0;
  vUv = uv;

  vec4 demColorA = texture(demTextureA, uv) * 255.;
  float elevationA = -10000. + ((demColorA.r * 256. * 256. + demColorA.g * 256. + demColorA.b) * 0.1);

  vec4 demColorB = texture(demTextureB, uv) * 255.;
  float elevationB = -10000. + ((demColorB.r * 256. * 256. + demColorB.g * 256. + demColorB.b) * 0.1);

  vec3 positionCopy = vec3(position.x, position.y, position.z);
  positionCopy.z += (elevationA * ratioFirst + elevationB * (1. - ratioFirst)) ;

  // this is shifting the position of the vertices so that that they stick to elevation 0,
  // in order to make nice terrain sides
  if (uv.x <= EPS || uv.y <= EPS || uv.x >= 1. - EPS || uv.y >= 1. - EPS) {
    positionCopy.z = 0.;
    isEdge = 1.0;
  }

  vec4 positionOut = projectionMatrix * modelViewMatrix * vec4(positionCopy, 1.0);
  gl_Position = positionOut;
}
`

const fragmentShader = `
#version 300 es

#define EPS 0.005
#define BROWN vec4(0.18, 0.125, 0.11, 1.)

precision mediump float;
precision mediump int;

uniform sampler2D satTextureA;
uniform sampler2D satTextureB;
uniform float ratioFirst;

in vec2 vUv;
in float isEdge;

out vec4 fragColor;


void main() {
  vec4 colorA = texture(satTextureA, vUv);
  vec4 colorB = texture(satTextureB, vUv);

  vec4 color = colorA * ratioFirst + (1. - ratioFirst) * colorB ;

  // this is shifting the position of the vertices so that that they stick to elevation 0,
  // in order to make nice terrain sides
  if (isEdge > 0.0) {
    color = BROWN;
  }

  fragColor = color;
}
`

const satTextureA = textures[currentScene].s;
const demTextureA = textures[currentScene].t;
const satTextureB = textures[currentScene+1].s;
const demTextureB = textures[currentScene+1].t;

// creating the raw shader mat that receives both the satellite texture and the elevation png
let rawMaterial = new RawShaderMaterial({
	uniforms: {
		satTextureA: { value: satTextureA },
		demTextureA: { value: demTextureA },

		satTextureB: { value: satTextureB },
		demTextureB: { value: demTextureB },

		ratioFirst: { value: 1. },
	},
	vertexShader: vertexShader.trim(),
	fragmentShader: fragmentShader.trim(),
});

// creating the mountain mesh and adding it to the scene
const planeGeom = new PlaneGeometry(tileWidthMeter, tileWidthMeter, tileSize, tileSize)
const planeMesh = new Mesh( planeGeom, rawMaterial )
scene.add(planeMesh)

// creating the bottom plane, that lays under the mountain mesh
const bottomPlaneGeom = new PlaneGeometry(tileWidthMeter, tileWidthMeter, 1, 1)
const bottomPlaneMat = new MeshBasicMaterial( {side: BackSide , color: 0x614d48 } )
const bottomPlaneMesh = new Mesh( bottomPlaneGeom, bottomPlaneMat );
scene.add(bottomPlaneMesh)

const animate = function () {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
};

animate();

const updateSize = (width, height) => {
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
	renderer.render( scene, camera );
}

window.addEventListener('resize', () => {
	updateSize(window.innerWidth, window.innerHeight);
});

let transInterval;

const changeScene = () => {
	transInterval = setInterval(transition, SCENE_TRANSITION);
};

const transition = () => {
	if (ratio > 0.1){
		ratio = ratio - 0.1;
		rawMaterial.uniforms.ratioFirst.value = ratio;
	} else {
		ratio = 1;
		clearInterval(transInterval);
		currentScene = (currentScene !== (scenes.length - 1) ) ? currentScene + 1 : 0;
		const nextScene = (currentScene + 1) !== scenes.length ? currentScene + 1 : 0;
		const satTextureA = textures[currentScene].s;
		const demTextureA = textures[currentScene].t;
		const satTextureB = textures[nextScene].s;
		const demTextureB = textures[nextScene].t;
		rawMaterial = new RawShaderMaterial({
			uniforms: {
				satTextureA: { value: satTextureA },
				demTextureA: { value: demTextureA },
		
				satTextureB: { value: satTextureB },
				demTextureB: { value: demTextureB },
		
				ratioFirst: { value: 1. },
			},
			vertexShader: vertexShader.trim(),
			fragmentShader: fragmentShader.trim(),
		});
		planeMesh.material = rawMaterial;
	}
}

setInterval(changeScene, SCENE_TIME);

/*
* TODO: Try this to see if the animation acceleration error is corrected. 

let count = 0;
document.getElementById('count').innerHTML = count;

let countInterval;

function startInterval() {
	countInterval = setInterval(() => {
	count++;
  document.getElementById('count').innerHTML = count;
}, 1000);
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
     clearInterval(countInterval);
  } else {
    startInterval();
  }
});

startInterval();

*/