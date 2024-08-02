import {
  Viewer as XEOViewer,
  LASLoaderPlugin,
  FastNavPlugin,
  AnnotationsPlugin,
  TreeViewPlugin,
  XKTLoaderPlugin,
  DistanceMeasurementsPlugin,
  DistanceMeasurementsMouseControl,
  // DistanceMeasurementEditMouseControl,
  ContextMenu,
  PointerLens,
  SkyboxesPlugin,
  AngleMeasurementsPlugin,
  AngleMeasurementsMouseControl,
  // PointerCircle,
} from "../../xeokitsdk";
import React from "react";

export default function CompareXeo({ index }: { index: number }) {
  React.useEffect(() => {
    function init() {
      const viewer = new XEOViewer({
        canvasId: `myCanvas${index}`,
        transparent: true,
      });

      viewer.scene.camera.eye = [-2.56, 8.38, 8.27];
      viewer.scene.camera.look = [13.44, 3.31, -14.83];
      viewer.scene.camera.up = [0.1, 0.98, -0.14];

      viewer.scene.pointsMaterial.pointSize = 2;
      viewer.scene.pointsMaterial.roundPoints = false;
      viewer.scene.pointsMaterial.perspectivePoints = true;
      viewer.scene.pointsMaterial.minPerspectivePointSize = 2;
      viewer.scene.pointsMaterial.maxPerspectivePointSize = 4;
      viewer.scene.pointsMaterial.filterIntensity = true;
      viewer.scene.pointsMaterial.minIntensity = 0;
      viewer.scene.pointsMaterial.maxIntensity = 1;

      const xktLoader = new XKTLoaderPlugin(viewer);

      const model = xktLoader.load({
        // Returns an Entity that represents the model
        id: "myModel",
        // src: "./models/xkt/Schependomlaan.xkt",
        // src: "/models/rac.xkt",
        // src: "/models/ar-demo-sample-single-building-01.xkt",
        src: "/models/meshed-1.ply.xkt",
        // src: "./models/xkt/v7/OTCConferenceCenter/OTCConferenceCenter.xkt",
        // src: "./rme.ply.xkt",
        edges: true,
      });

      model.on("loaded", () => {
        viewer.cameraFlight.jumpTo(model);
      });

      const pointsMaterial = viewer.scene.pointsMaterial;
      const camera = viewer.camera;

      const guiParams = new (function () {
        // positioning
        this.positionX = -9.5;
        this.positionY = -9;
        this.positionZ = 1;
        this.rotateX = 0;
        this.rotateY = -3.8;
        this.rotateZ = 0;
        // points material
        this.roundPoints = pointsMaterial.roundPoints;
        this.pointSize = pointsMaterial.pointSize;
        this.perspectivePoints = pointsMaterial.perspectivePoints;
        this.minPerspectivePointSize = pointsMaterial.minPerspectivePointSize;
        this.maxPerspectivePointSize = pointsMaterial.maxPerspectivePointSize;
        this.filterIntensity = pointsMaterial.filterIntensity;
        this.minIntensity = pointsMaterial.minIntensity;
        this.maxIntensity = pointsMaterial.maxIntensity;
        this.perspective = camera.projection === "perspective";
      })();

      const update = function () {
        // sceneModel.position = [
        //   guiParams.positionX,
        //   guiParams.positionY,
        //   guiParams.positionZ,
        // ];
        // sceneModel.rotation = [
        //   guiParams.rotateX,
        //   guiParams.rotateY,
        //   guiParams.rotateZ,
        // ];
        pointsMaterial.roundPoints = guiParams.roundPoints;
        pointsMaterial.pointSize = guiParams.pointSize;
        pointsMaterial.perspectivePoints = guiParams.perspectivePoints;
        pointsMaterial.minPerspectivePointSize =
          guiParams.minPerspectivePointSize;
        pointsMaterial.maxPerspectivePointSize =
          guiParams.maxPerspectivePointSize;
        pointsMaterial.filterIntensity = guiParams.filterIntensity;
        pointsMaterial.minIntensity = guiParams.minIntensity;
        pointsMaterial.maxIntensity = guiParams.maxIntensity;
        camera.projection = guiParams.perspective ? "perspective" : "ortho";
        requestAnimationFrame(update);
      };

      update();

      const gui = new dat.GUI({ autoPlace: false, width: "100%" });

      const lasPositionFolder = gui.addFolder("LAS Position");
      gui.add(guiParams, "positionX", -50, 50).onChange(update);
      gui.add(guiParams, "positionY", -50, 50).onChange(update);
      gui.add(guiParams, "positionZ", -50, 50).onChange(update);
      lasPositionFolder.open();

      const lasRotationFolder = gui.addFolder("LAS Orientation");
      gui.add(guiParams, "rotateX", -90, 90).onChange(update);
      gui.add(guiParams, "rotateY", -90, 90).onChange(update);
      gui.add(guiParams, "rotateZ", -90, 90).onChange(update);
      lasRotationFolder.open();

      const pointsMaterialFolder = gui.addFolder("PointsMaterial");
      pointsMaterialFolder.add(guiParams, "roundPoints");
      pointsMaterialFolder.add(guiParams, "pointSize", 1, 50);
      pointsMaterialFolder.add(guiParams, "perspectivePoints");
      pointsMaterialFolder.add(guiParams, "minPerspectivePointSize", 1, 50);
      pointsMaterialFolder.add(guiParams, "maxPerspectivePointSize", 1, 50);
      pointsMaterialFolder.add(guiParams, "filterIntensity");
      pointsMaterialFolder.add(guiParams, "minIntensity", 0.0, 1.0);
      pointsMaterialFolder.add(guiParams, "maxIntensity", 0.0, 1.0);
      pointsMaterialFolder.open();

      const cameraFolder = gui.addFolder("Camera");
      cameraFolder.add(guiParams, "perspective");
      cameraFolder.open();

      const customContainer = document.getElementById("myDatGuiContainer");
      customContainer?.appendChild(gui.domElement);

      console.log("viewer", viewer);
      window.viewer = viewer;
    }
    init();
  }, []);

  return (
    <div className="h-full w-full">
      <canvas
        id={`myCanvas${index}`}
        className={`h-full w-full`}
        // style={{ backgroundColor: canvasColor ?? DEFAULT_CANVAS_COLOR }}
      ></canvas>
    </div>
  );
}
