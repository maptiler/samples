import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, Color, BackSide, sRGBEncoding } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const gltfs = {};

const SCENE_TIME = 2000;

const scenes = ['st_helens', 'alaska', 'uluru', 'klyuchevskaya', 'colorado_river', 'matterhorn', 'fuji', 'montana', 'patagonia', 'sarez_lake'];

let currentScene = 0;
let sceneName = scenes[currentScene];
const ele = document.querySelectorAll(".btn-group > button.btn");
for(let i=0; i<ele.length; i++){
    ele[i].addEventListener("click", function(){
				console.log(this.value);
				document.querySelector(".btn-group > button.btn.btn-outline-primary.active").classList.remove("active");
				this.classList.add("active");
				loadScene(this.value);
    });
}

// Instantiate a loader
const loader = new GLTFLoader();
let scene = new Scene();
let width = window.innerWidth;
let height = window.innerHeight;
const camera = new PerspectiveCamera(30, 1, 0.0001, 1000);
camera.position.set(2, 0, 1);
camera.up.set(0, 0, 1);
camera.aspect = width / height;
camera.updateProjectionMatrix();
const container = document.getElementById('map');
const renderer = new WebGLRenderer({ antialias: true });
renderer.outputEncoding = sRGBEncoding;
renderer.flipY = false;
renderer.setSize( width, height );
container.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

const backMesh = new Mesh();
backMesh.material = new MeshBasicMaterial({
	color: 0x614d48,
	side: BackSide,
});

controls.update();

const loadGltf = (name) => {
	return new Promise((resolve, reject) => {
	
		// Load a glTF resource
		loader.load(
			// resource URL
			`./assets/${name}.gltf`,
			// called when the resource is loaded
			function ( gltf ) {
				gltfs[name] = gltf;
				resolve(name);
			},
			// called while loading is progressing
			function ( xhr ) {
				//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			// called when loading has errors
			function ( error ) {
				console.log( 'An error happened' );
				console.log(error);
				resolve();
			}
		);
	});
}

const loadGltfAsync = (name) => loader.loadAsync(`https://docs.maptiler.com/assets/gltf/${name}.gltf`);

const loadScene = (gltf) => {
	if (!gltf) return; 
	while(scene.children.length > 0){ 
		scene.remove(scene.children[0]); 
	}

	scene.background = new Color(0xEFF3FB);

	scene.add( gltf.scene );

	gltf.animations; // Array<THREE.AnimationClip>
	gltf.scene; // THREE.Group
	gltf.scenes; // Array<THREE.Group>
	gltf.cameras; // Array<THREE.Camera>
	gltf.asset; // Object

	controls.autoRotate = true;
	controls.autoRotateSpeed = 1.0;
	const base = scene.children[0].children[0];
	backMesh.geometry = base.geometry;
	scene.add(backMesh);
}

const updateSize = (width, height) => {
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
	renderer.render( scene, camera );
}

const changeScene = () => {
	const nextScene = (currentScene + 1) !== scenes.length ? currentScene + 1 : 0;
	sceneName = scenes[nextScene];
	currentScene = nextScene;
	const next2Scene = (currentScene + 1) !== scenes.length ? currentScene + 1 : 0;
	if (!gltfs[scenes[next2Scene]] && currentScene !== 0  && next2Scene !== 0) {
		loadNextGltf();
	}
	loadScene(gltfs[sceneName]);
}

const loadNextGltf = () => {
	const nextScene = (currentScene + 1) !== scenes.length ? currentScene + 1 : 0;
	if (scenes[nextScene]) {
		loadGltfAsync(scenes[nextScene]).then(gltf => {
			gltfs[scenes[nextScene]] = gltf;
		});
	}
}

loadGltfAsync(sceneName).then(gltf => {
	gltfs[sceneName] = gltf;
	loadScene(gltf);
	loadNextGltf();
});

setInterval(changeScene, SCENE_TIME);

const animate = function () {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
};

animate();

window.addEventListener('resize', () => {
	updateSize(window.innerWidth, window.innerHeight);
});
