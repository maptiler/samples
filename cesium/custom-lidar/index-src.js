/**
 * MapTiler sample testing version of Cesium webpack example
 *
 * Purpose: to test several mesh versions
 * Author: jachym.cepicky at maptiler.com
 *
 * you can adjust various DTMs in the `terrain.js` file
 */
import { viewerCesiumInspectorMixin,
        Viewer, BaseLayerPicker, CesiumWidget} from 'cesium';

import {terrainProviderModels} from './terrain.js';
import {imageryViewModels} from './imagery.js';

import {GeographicTilingScheme} from 'cesium';

import {Cesium3DTileset, Cesium3DTileStyle, Ellipsoid, Cartesian3, Math} from 'cesium';

import { CesiumTerrainProvider} from 'cesium';
import { UrlTemplateImageryProvider } from 'cesium';

import "./css/main.css";

var ts = new GeographicTilingScheme();
console.log("x=66, y=15", ts.tileXYToNativeRectangle(66, 15, 6));
console.log("x=68, y=15", ts.tileXYToNativeRectangle(68, 15, 6));

var krtiny = new Cesium3DTileset({
  url: "http://localhost:8081/data/3dtiles3/616000_5462000_c/tileset.json"
});

krtiny.readyPromise.then(function() {
  console.log('Loaded tileset');
  var bounding = tileset._root._boundingVolume;
  var center = bounding.boundingSphere.center;
  var cart = Ellipsoid.WGS84.cartesianToCartographic(center);
  var dest = Cartesian3.fromDegrees(
    cart.longitude * (180 / Math.PI),
    cart.latitude * (180 / Math.PI)-0.02,
    bounding.boundingSphere.radius * 1.5
  );

  var orientation = {
    heading : Math.toRadians(0.0), // east, default value is 0.0 (north)
    pitch : Math.toRadians(-22.5),    // default value (looking down)
    roll : 0.0
  };

  viewer.camera.setView({ destination: dest , orientation: orientation});
});


krtiny.style = new Cesium3DTileStyle({
  color: {
    conditions: [
      ["true", "color('#006600')"]
    ]
  },
  pointSize: 2
});


var MAPTILER_API_KEY="";

var satellite = new UrlTemplateImageryProvider({
    url: "https://api.maptiler.com/tiles/satellite-mediumres-2018/{z}/{x}/{y}.jpg?key=Yddov2aUInr8SSqd4AyH",
    minimumLevel: 0,
    maximumLevel: 20
});

var terrain = new CesiumTerrainProvider({
    url: "https://api.maptiler.com/tiles/terrain-quantized-mesh/?key=Yddov2aUInr8SSqd4AyH"
});

var viewer = new Viewer("cesiumContainer", {
  baseLayerPicker: false,
  vrButton: false,
  timeline: false,
  nagivationHelpButton: false,
  sceneModePicker: false,
  homeButton: false,
  geocoder: false,
  navigationHelpButton: false,
  terrainProvider: terrain,
  imageryProvider: satellite
});

var tileset = viewer.scene.primitives.add(krtiny);

