import React from 'react';
import Style from './index.module.less';
// The URL on your server where CesiumJS's static files are hosted.

import {
  Cartesian3,
  createOsmBuildingsAsync,
  Ion,
  Math as CesiumMath,
  Terrain,
  Viewer,
} from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;

const ThreeDMap: React.FC = () => {
  // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.

  useEffect(() => {
    const viewer = new Viewer('cesiumContainer', {
      terrain: Terrain.fromWorldTerrain(),
    });

    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation: {
        heading: CesiumMath.toRadians(0.0),
        pitch: CesiumMath.toRadians(-15.0),
      },
    });

    // Add Cesium OSM Buildings, a global 3D buildings layer.
    createOsmBuildingsAsync().then((buildingTileset) => {
      viewer.scene.primitives.add(buildingTileset);
    });
  });
  return (
    <div>
      <div id="cesiumContainer"></div>
    </div>
  );
};

export default ThreeDMap;
