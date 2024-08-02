import * as React from "react";

import { useRenderView } from "@/hooks/use-render-view";

export function Viewer() {
  const { selectedDate, compareMode } = useRenderView();

  return (
    <div className="h-main relative w-full flex-grow">
      {/* <IFCViewer /> */}
      {/* <THREE ifcURL="./Project1.ifc" /> */}
      {/* <XeokitViewer /> */}
      {/* <XeokitIFCViewer /> */}
      {compareMode ? (
        <div className="grid h-full w-full grid-cols-2 divide-x-2 divide-zinc-900">
          <XeokitViewer />
          <XeokitViewer />
        </div>
      ) : (
        <>
          <XeokitViewer />
        </>
      )}

      {/* right sidebar */}
      {/* <div className="absolute top-0 right-0 bottom-0 w-80 h-full bg-zinc-800/80 z-50 flex justify-center items-center">
          <div className="flex w-full max-w-72 text-center flex-col items-center gap-4 text-white -mt-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-mouse-pointer rotate-12"
            >
              <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              <path d="m13 13 6 6" />
            </svg>
            <p className="text-sm">
              Select an object to view its properties or modify it.
            </p>
          </div>
        </div> */}
    </div>
  );
}

// las example xeokit-sdk
// <!doctype html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <title>xeokit Example</title>
//     <link href="../css/pageStyle.css" rel="stylesheet"/>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"></script>
//     <script src="../libs/dat.gui.min.js" type="text/javascript"></script>
//     <link href="../css/dat-gui-light-style.css" rel="stylesheet"/>
//     <style>
//         .xeokit-camera-pivot-marker {
//             color: #ffffff;
//             position: absolute;
//             width: 25px;
//             height: 25px;
//             border-radius: 15px;
//             border: 2px solid #ebebeb;
//             background: black;
//             visibility: hidden;
//             box-shadow: 5px 5px 15px 1px #000000;
//             z-index: 10000;
//             pointer-events: none;
//         }
//     </style>
// </head>

// <body>
// <input type="checkbox" id="info-button"/>
// <label for="info-button" className="info-button"><i className="far fa-3x fa-question-circle"></i></label>
// <canvas id="myCanvas"></canvas>
// <div className="slideout-sidebar">
//     <img className="info-icon" src="../../assets/images/laserScan.png"/>
//     <h1>LASLoaderPlugin</h1>
//     <h2>Loading a lidar point cloud with 31M colored points from LAS format</h2>
//     <h3>Stats</h3>
//     <ul>
//         <li>
//             <div id="time">Loading JavaScript modules...</div>
//         </li>
//     </ul>
//     <h3>Customize points</h3>
//     <div id="myDatGuiContainer"></div>
//     <h3>Components used</h3>
//     <ul>
//         <li>
//             <a href="../../docs/className/src/viewer/Viewer.js~Viewer.html"
//                target="_other">Viewer</a>
//         </li>
//         <li>
//             <a href="../../docs/className/src/plugins/LASLoaderPlugin/LASLoaderPlugin.js~LASLoaderPlugin.html"
//                target="_other">LASLoaderPlugin</a>
//         </li>
//         <li>
//             <a href="../../docs/className/src/viewer/scene/materials/PointsMaterial.js~PointsMaterial.html"
//                target="_other">PointsMaterial</a>
//         </li>
//     </ul>
//     <h3>Resources</h3>
//     <ul>
//         <li><a href="https://loaders.gl/" target="_other">Model source</a></li>
//     </ul>

// </div>
// </body>
// <script type="module">

//     //------------------------------------------------------------------------------------------------------------------
//     // Import the modules we need for this example
//     //------------------------------------------------------------------------------------------------------------------

//     import {Viewer, LASLoaderPlugin, FastNavPlugin} from "../../dist/xeokit-sdk.min.es.js";

//     const viewer = new Viewer({
//         canvasId: "myCanvas",
//         transparent: true
//     });

//     viewer.scene.camera.eye = [635796.0612055798, 855416.1847290703, -3167.352900630285];
//     viewer.scene.camera.look = [637290.78125, 851209.90625, 510.70001220703125];
//     viewer.scene.camera.up = [0.273790165300491, 0.686401912000719, 0.673714598763072];

//     viewer.scene.camera.project.far = 10000000;

//     const pivotElement = document.createRange().createContextualFragment("<div className='xeokit-camera-pivot-marker'></div>").firstChild;
//     document.body.appendChild(pivotElement);
//     viewer.cameraControl.pivotElement = pivotElement;

//     //------------------------------------------------------------------------------------------------------------------
//     // Configure points material
//     //------------------------------------------------------------------------------------------------------------------

//     viewer.scene.pointsMaterial.pointSize = 2;
//     viewer.scene.pointsMaterial.roundPoints = false;
//     viewer.scene.pointsMaterial.perspectivePoints = true;
//     viewer.scene.pointsMaterial.minPerspectivePointSize = 2;
//     viewer.scene.pointsMaterial.maxPerspectivePointSize = 4;
//     viewer.scene.pointsMaterial.filterIntensity = true;
//     viewer.scene.pointsMaterial.minIntensity = 0;
//     viewer.scene.pointsMaterial.maxIntensity = 1;

//     new FastNavPlugin(viewer, {
//         scaleCanvasResolution: true,      // Reduce canvas resolution while moving (default is false)
//         scaleCanvasResolutionFactor: 0.5,
//     });

//     //----------------------------------------------------------------------------------------------------------------------
//     // Install a LASLoaderPlugin, load a model, fit to view
//     //----------------------------------------------------------------------------------------------------------------------

//     const lasLoader = new LASLoaderPlugin(viewer, {
//         skip: 10, // Load every 10th point
//         fp64: false, // Positions expected in 32-bit floats instead of 64-bit
//         colorDepth: "auto" // Whether colors encoded using 8 or 16 bits - accepted values are "auto", 8 and 16
//     });

//     const t0 = performance.now();

//     document.getElementById("time").innerHTML = "Loading model...";

//     const sceneModel = lasLoader.load({
//         id: "myModel",
//         src: "../../assets/models/las/autzen.laz",
//         rotation: [-90, 0, 0]
//     });

//     sceneModel.on("loaded", () => {
//         const t1 = performance.now();
//         document.getElementById("time").innerHTML = "Model loaded in " + Math.floor(t1 - t0) / 1000.0 + " seconds<br>Objects: " + sceneModel.numEntities;
//     });

//     //------------------------------------------------------------------------------------------------------------------
//     // GUI to play with points material properties
//     //------------------------------------------------------------------------------------------------------------------

//     const pointsMaterial = viewer.scene.pointsMaterial;
//     const camera = viewer.camera;

//     const guiParams = new function () {
//         this.roundPoints = pointsMaterial.roundPoints;
//         this.pointSize = pointsMaterial.pointSize;
//         this.perspectivePoints = pointsMaterial.perspectivePoints;
//         this.minPerspectivePointSize = pointsMaterial.minPerspectivePointSize;
//         this.maxPerspectivePointSize = pointsMaterial.maxPerspectivePointSize;
//         this.filterIntensity = pointsMaterial.filterIntensity;
//         this.minIntensity = pointsMaterial.minIntensity;
//         this.maxIntensity = pointsMaterial.maxIntensity;
//         this.perspective = (camera.projection === "perspective");
//     }();

//     const update = function () {
//         pointsMaterial.roundPoints = guiParams.roundPoints;
//         pointsMaterial.pointSize = guiParams.pointSize;
//         pointsMaterial.perspectivePoints = guiParams.perspectivePoints;
//         pointsMaterial.minPerspectivePointSize = guiParams.minPerspectivePointSize;
//         pointsMaterial.maxPerspectivePointSize = guiParams.maxPerspectivePointSize;
//         pointsMaterial.filterIntensity = guiParams.filterIntensity;
//         pointsMaterial.minIntensity = guiParams.minIntensity;
//         pointsMaterial.maxIntensity = guiParams.maxIntensity;
//         camera.projection = guiParams.perspective ? "perspective" : "ortho";
//         requestAnimationFrame(update);
//     };

//     update();

//     const gui = new dat.GUI({autoPlace: false, width: "100%"});

//     const pointsMaterialFolder = gui.addFolder('PointsMaterial');
//     pointsMaterialFolder.add(guiParams, 'roundPoints');
//     pointsMaterialFolder.add(guiParams, 'pointSize', 1, 50);
//     pointsMaterialFolder.add(guiParams, 'perspectivePoints');
//     pointsMaterialFolder.add(guiParams, 'minPerspectivePointSize', 1, 50);
//     pointsMaterialFolder.add(guiParams, 'maxPerspectivePointSize', 1, 50);
//     pointsMaterialFolder.add(guiParams, 'filterIntensity');
//     pointsMaterialFolder.add(guiParams, 'minIntensity', 0.0, 1.0);
//     pointsMaterialFolder.add(guiParams, 'maxIntensity', 0.0, 1.0);
//     pointsMaterialFolder.open();

//     const cameraFolder = gui.addFolder('Camera');
//     cameraFolder.add(guiParams, 'perspective');
//     cameraFolder.open();

//     const customContainer = document.getElementById('myDatGuiContainer');
//     customContainer.appendChild(gui.domElement);

// </script>
// </html>

import {
  Viewer as XEOViewer,
  LASLoaderPlugin,
  FastNavPlugin,
  AnnotationsPlugin,
  TreeViewPlugin,
  XKTLoaderPlugin,
} from "@/xeokitsdk";

// const XEOViewer = dynamic(
//   () => import("@/xeokitsdk").then((mod) => mod.Viewer),
//   { ssr: false },
// );
// const LASLoaderPlugin = dynamic(
//   () => import("@/xeokitsdk").then((mod) => mod.LASLoaderPlugin),
//   { ssr: false },
// );
// const FastNavPlugin = dynamic(
//   () => import("@/xeokitsdk").then((mod) => mod.FastNavPlugin),
//   { ssr: false },
// );
// const AnnotationsPlugin = dynamic(
//   () => import("@/xeokitsdk").then((mod) => mod.AnnotationsPlugin),
//   { ssr: false },
// );
// const TreeViewPlugin = dynamic(
//   () => import("@/xeokitsdk").then((mod) => mod.TreeViewPlugin),
//   { ssr: false },
// );
// const XKTLoaderPlugin = dynamic(
//   () => import("@/xeokitsdk").then((mod) => mod.XKTLoaderPlugin),
//   { ssr: false },
// );

function Card({ title, icon, className, children }) {
  return (
    <div
      className={cn(
        "w-full max-w-lg space-y-6 rounded-lg bg-zinc-900 p-4 py-5 text-white",
        className,
      )}
    >
      <div className="flex items-center gap-x-2">
        {icon}
        <span className="text-lg font-medium">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function AnnotationForm({
  onSubmit = (title, description) => {
    console.log("title, description", title, description);
  },
}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  return (
    <div className="w-full rounded-2xl text-left">
      {/* <h3 className="text-lg font-medium leading-6 text-white">
          Add Annotation
        </h3> */}
      <div className="flex flex-col items-center gap-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded-md border-zinc-800 bg-zinc-900/10 p-2 text-white/90 text-zinc-100 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full rounded-md border-zinc-800 bg-zinc-900/10 p-2 text-white/90 text-zinc-100 focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex w-full justify-end">
          <Button
            //   className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
            type="button"
            variant="outline"
            className="space-x-1.5 text-black active:bg-zinc-400"
            onClick={() => onSubmit(title, description)}
          >
            <span>Submit</span>
          </Button>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        {/* <Button
            >
              Close
            </Button> */}
      </div>
    </div>
  );
}

function AnnoationFormCard() {
  return (
    <Card
      title="Add Annotation"
      icon={
        <svg
          width="100%"
          height="100%"
          fill="currentColor"
          className="h-5 w-5"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
          <path d="M13 2H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2l3 3 3-3h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"></path>
        </svg>
      }
      className="w-full"
    >
      <AnnotationForm />
    </Card>
  );
}

export default function XeokitViewer() {
  const { selectedDate, compareMode } = useRenderView();

  const viewer = React.useRef(null);

  const [annotationMode, setAnnotationMode] = React.useState(true);

  const { isOpen, closeModal, openModal } = useModalState();

  let er = false;

  type Mode = "view" | "select" | "line" | "polygon" | "circle" | "point";

  const [mode, setMode] = React.useState<Mode>("view");

  React.useEffect(() => {
    console.log("mode", mode);
  }, [mode]);

  const modeButtons = [
    {
      title: "Select",
      mode: "select",
      icon: <MousePointer className="h-[20px] w-[20px] rotate-[18deg]" />,
      onClick: () => {
        setMode("select");
      },
    },
    {
      title: "Line",
      mode: "line",
      icon: <LineIcon />,
      onClick: () => {
        setMode("line");
      },
    },
    {
      title: "Polygon",
      mode: "polygon",
      icon: <PolygonIcon />,
      onClick: () => {
        setMode("polygon");
      },
    },
    {
      title: "Circle",
      mode: "circle",
      icon: <CircleIcon />,
      onClick: () => {
        setMode("circle");
      },
    },
    {
      title: "Point",
      mode: "point",
      icon: <PointIcon />,
      onClick: () => {
        setMode("point");
      },
    },
  ];

  React.useEffect(() => {
    console.log("annotationMode", annotationMode);
  }, [annotationMode]);

  function FloatComponent({ children }) {
    return (
      <div className="relative flex h-screen w-screen items-center justify-center">
        <div className="absolute z-[999999] mx-auto text-center">
          {children}
        </div>
      </div>
    );
  }

  React.useEffect(() => {
    console.log("isOpen", isOpen);
  }, [isOpen]);

  function onAddAnnotation(coords, pickResult) {
    if (!er) {
      return;
    }

    if (editedAnnotation) {
      editedAnnotation.setFromPickResult(pickResult);
      editedAnnotation.setField("markerBGColor", "red");
      editedAnnotation = null;
      return;
    }

    const annotation = annotations.createAnnotation({
      id: "myAnnotation" + i,
      pickResult: pickResult, // <<------- initializes worldPos and entity from PickResult
      occludable: true, // Optional, default is true
      markerShown: true, // Optional, default is true
      labelShown: true, // Optional, default is true
      values: {
        // HTML template values
        glyph: "A" + i,
        title: "My annotation " + i,
        description: "My description " + i,
      },
    });

    i++;

    console.log("onAddAnnotation", coords, pickResult);

    openModal();
  }

  const [mesurementMode, setMesurementMode] = React.useState(false);

  function onViewerClick(coords, pickResult) {
    console.log("onViewerClick", mode);

    if (annotationMode) {
      // onAddAnnotation(coords, pickResult);
      console.log("mesurementMode");
    }

    if (mesurementMode) {
      console.log("mesurementMode");
    }
  }

  React.useEffect(() => {
    async function initXeo() {
      console.log("document", document);

      const viewer = new XEOViewer({
        canvasId: "myCanvas",
        transparent: true,
      });

      // 2
      viewer.scene.camera.eye = [-2.56, 8.38, 8.27];
      viewer.scene.camera.look = [13.44, 3.31, -14.83];
      viewer.scene.camera.up = [0.1, 0.98, -0.14];

      console.log("viewerb4", window.viewer);
      if (!window.viewer) {
        window.viewer = viewer;
      }
      console.log("viewera4", window.viewer);

      const annotations = new AnnotationsPlugin(viewer, {
        markerHTML:
          "<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>",
        labelHTML:
          "<div class='annotation-label' style='background-color: {{labelBGColor}};'><div class='annotation-title'>{{title}}</div><div class='annotation-desc'>{{description}}</div></div>",

        values: {
          markerBGColor: "red",
          glyph: "X",
          title: "Untitled",
          description: "No description",
        },

        // Amount to offset each Annotation from its Entity surface (0.3 is the default value).
        // This is useful when the Annotation is occludable, which is when it is hidden when occluded
        // by other objects. When occludable, there is potential for the Annotation#worldPos to become
        // visually embedded within the surface of its Entity when viewed from a distance. This happens
        // as a result of limited GPU accuracy GPU accuracy, especially when the near and far view-space clipping planes,
        // specified by Perspective#near and Perspective#far, or Ortho#near and Perspective#far, are far away from each other.
        //
        // Offsetting the Annotation may ensure that it does become visually embedded within its Entity. We may also
        // prevent this by keeping the distance between the view-space clipping planes to a minimum. In general, a good
        // default value for Perspective#far and Ortho#far is around ````2.000````.

        surfaceOffset: 0.1,
      });

      annotations.on("markerClicked", (annotation) => {
        annotation.labelShown = !annotation.labelShown;
      });

      //------------------------------------------------------------------------------------------------------------------
      // Use the AnnotationsPlugin to create an annotation wherever we click on an object
      //------------------------------------------------------------------------------------------------------------------

      var i = 1;

      let editedAnnotation = null;

      viewer.scene.input.on("mouseclicked", (coords) => {
        console.log("coords", coords);
        const pickResult = viewer.scene.pick({
          canvasPos: coords,
          pickSurface: true, // <<------ This causes picking to find the intersection point on the entity
        });

        console.log("pickResult", pickResult);

        if (pickResult) {
          onViewerClick(coords, pickResult);
          // if (annotationMode) {
          //   onAddAnnotation(coords, pickResult);

          //   if (editedAnnotation) {
          //     editedAnnotation.setFromPickResult(pickResult);
          //     editedAnnotation.setField("markerBGColor", "red");
          //     editedAnnotation = null;
          //     return;
          //   }

          //   const annotation = annotations.createAnnotation({
          //     id: "myAnnotation" + i,
          //     pickResult: pickResult, // <<------- initializes worldPos and entity from PickResult
          //     occludable: true, // Optional, default is true
          //     markerShown: true, // Optional, default is true
          //     labelShown: true, // Optional, default is true
          //     values: {
          //       // HTML template values
          //       glyph: "A" + i,
          //       title: "My annotation " + i,
          //       description: "My description " + i,
          //     },
          //   });

          //   i++;
          // }
        }
      });

      annotations.on("contextmenu", (annotation) => {
        // Initiate annotation's position change
        editedAnnotation = annotation;
        editedAnnotation.setField("markerBGColor", "pink");
      });

      // viewer.scene.camera.eye = [635796.0612055798, 855416.1847290703, -3167.352900630285];
      // viewer.scene.camera.look = [637290.78125, 851209.90625, 510.70001220703125];
      // viewer.scene.camera.up = [0.273790165300491, 0.686401912000719, 0.673714598763072];

      // viewer.scene.camera.project.far = 10000000;

      const pivotElement = document
        .createRange()
        .createContextualFragment(
          "<div className='xeokit-camera-pivot-marker'></div>",
        ).firstChild;

      document.body.appendChild(pivotElement);

      viewer.cameraControl.pivotElement = pivotElement;

      //------------------------------------------------------------------------------------------------------------------
      // Configure points material
      //------------------------------------------------------------------------------------------------------------------

      viewer.scene.pointsMaterial.pointSize = 2;
      viewer.scene.pointsMaterial.roundPoints = false;
      viewer.scene.pointsMaterial.perspectivePoints = true;
      viewer.scene.pointsMaterial.minPerspectivePointSize = 2;
      viewer.scene.pointsMaterial.maxPerspectivePointSize = 4;
      viewer.scene.pointsMaterial.filterIntensity = true;
      viewer.scene.pointsMaterial.minIntensity = 0;
      viewer.scene.pointsMaterial.maxIntensity = 1;

      // const annotations = new AnnotationsPlugin(viewer, {

      //   // Default HTML template for marker position
      //   markerHTML: "<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>",

      //   // Default HTML template for label
      //   labelHTML: "<div class='annotation-label' style='background-color: {{labelBGColor}};'>" +
      //     "<div class='annotation-title'>{{title}}</div><div class='annotation-desc'>{{description}}</div></div>",

      //   // Default values to insert into the marker and label templates
      //   values: {
      //     markerBGColor: "red",
      //     labelBGColor: "red",
      //     glyph: "X",
      //     title: "Untitled",
      //     description: "No description"
      //   }
      // });

      //------------------------------------------------------------------------------------------------------------------
      // Create an AnnotationsPlugin, with which we'll create annotations
      //------------------------------------------------------------------------------------------------------------------

      // // onclick viewer
      // viewer.scene.input.on("mouseclicked", (coords) => {
      //   const pickResult = viewer.scene.pick({
      //     canvasPos: coords,
      //     pickSurface: true, // <<------ This causes picking to find the intersection point on the entity
      //   });

      //   console.log("pickResult", pickResult, coords);

      //   if (pickResult) {
      //     if (editedAnnotation) {
      //       editedAnnotation.setFromPickResult(pickResult);
      //       editedAnnotation.setField("markerBGColor", "red");
      //       editedAnnotation = null;
      //       return;
      //     }

      //     const annotation = annotations.createAnnotation({
      //       id: "myAnnotation" + i,
      //       pickResult: pickResult, // <<------- initializes worldPos and entity from PickResult
      //       occludable: true, // Optional, default is true
      //       markerShown: true, // Optional, default is true
      //       labelShown: true, // Optional, default is true
      //       values: {
      //         // HTML template values
      //         glyph: "A" + i,
      //         title: "My annotation " + i,
      //         description: "My description " + i,
      //       },
      //     });

      //     i++;
      //   }
      // });

      // new FastNavPlugin(viewer, {
      //   scaleCanvasResolution: true,      // Reduce canvas resolution while moving (default is false)
      //   scaleCanvasResolutionFactor: 0.5,
      // });

      //----------------------------------------------------------------------------------------------------------------------
      // Install a LASLoaderPlugin, load a model, fit to view
      //----------------------------------------------------------------------------------------------------------------------

      new TreeViewPlugin(viewer, {
        containerElement: document.getElementById("treeViewContainer"),
        autoExpandDepth: 3, // Initially expand the root tree node
      });

      //------------------------------------------------------------------------------------------------------------------
      // 1. Create a XKTLoaderPlugin,
      // 2. Load a building model and JSON IFC metadata
      //------------------------------------------------------------------------------------------------------------------

      // 1
      const xktLoader = new XKTLoaderPlugin(viewer);

      // // 2
      const model = xktLoader.load({
        // Returns an Entity that represents the model
        id: "myModel",
        // src: "./models/xkt/Schependomlaan.xkt",
        src: "./meshed-1.ply.xkt",
        // src: "./models/xkt/v7/OTCConferenceCenter/OTCConferenceCenter.xkt",
        // src: "./rme.ply.xkt",
        edges: true,
      });

      model.on("loaded", () => {
        viewer.cameraFlight.jumpTo(model);
      });
      //   {
      //     "0": 9007199254740991,
      //     "1": 9007199254740991,
      //     "2": 9007199254740991,
      //     "3": -9007199254740991,
      //     "4": -9007199254740991,
      //     "5": -9007199254740991
      // }
      //--------------------------------------------------------------------------------------------------------------
      //   // 1. Find metadata on the third storey
      //   // 2. Select all the objects in the building's third storey
      //   // 3. Fit the camera to all the objects on the third storey
      //   //--------------------------------------------------------------------------------------------------------------

      //   // 1
      //   // const metaModel = viewer.metaScene.metaModels["myModel"]; // MetaModel with ID "myModel"
      //   // const metaObject =
      //   //   viewer.metaScene.metaObjects["0u4wgLe6n0ABVaiXyikbkA"]; // MetaObject with ID "0u4wgLe6n0ABVaiXyikbkA"

      //   // const name = metaObject.name; // "01 eerste verdieping"
      //   // const type = metaObject.type; // "IfcBuildingStorey"
      //   // const parent = metaObject.parent; // MetaObject with type "IfcBuilding"
      //   // const children = metaObject.children; // Array of child MetaObjects
      //   // const objectId = metaObject.id; // "0u4wgLe6n0ABVaiXyikbkA"
      //   // const objectIds = viewer.metaScene.getObjectIDsInSubtree(objectId); // IDs of leaf sub-objects
      //   // const aabb = viewer.scene.getAABB(objectIds); // Axis-aligned boundary of the leaf sub-objects

      //   // // 2
      //   // viewer.scene.setObjectsSelected(objectIds, true);

      //   // // 3
      //   // // viewer.scene.cameraFlight.jumpTo(aabb);
      //   // viewer.scene.cameraFlight.flyTo(aabb);
      // });

      // Find the model Entity by ID
      // model = viewer.scene.models["myModel"];

      // Destroy the model
      // model.destroy();

      // const IfcAPI = new WebIFC.IfcAPI();

      // IfcAPI.SetWasmPath("https://cdn.jsdelivr.net/npm/web-ifc@0.0.55/");

      // const lasLoader = new LASLoaderPlugin(viewer, {
      //   // skip: 10, // Load every 10th point
      //   fp64: false, // Positions expected in 32-bit floats instead of 64-bit
      //   colorDepth: "auto", // Whether colors encoded using 8 or 16 bits - accepted values are "auto", 8 and 16
      // });

      // // const t0 = performance.now();

      // // const timeElement = document.getElementById("time")!;

      // // timeElement.innerHTML = "Loading model...";

      // const lasSceneModel = lasLoader.load({
      //   id: "pointModel",
      //   // src: "./indoor.laz",
      //   // src: "./Nalls_Pumpkin_Hill.laz",
      //   src: "./mesh.las",
      //   // src: "./mesh-2.las",
      //   // src: "./mesh-3.las",
      //   // big
      //   // scale: [2, 2, 2],
      //   // src: "http://47.97.51.98:6093/temp/2024-04-28/J72304752/dense/meshed-poisson.las",
      //   // src: "./meshed-poisson.las",
      //   // src: "http://47.97.51.98:6093/temp/2024-05-19/J72304752/dense/meshed-poisson.las",
      //   rotation: [-90, 0, 0],
      //   // position: [50, 50, 50],
      // });

      // lasSceneModel.on("loaded", (e) => {
      //   console.log("lasSceneModel", e);
      //   // viewer.cameraFlight.jumpTo(lasSceneModel);
      // });

      // IfcAPI.Init().then(() => {

      //   const ifcLoader = new WebIFCLoaderPlugin(viewer, {
      //     WebIFC,
      //     IfcAPI
      //   });

      //   const ifcModel = ifcLoader.load({
      //     id: "ifcModel",
      //     // src: "./rac_advanced_sample_project.ifc",
      //     // src: "./19_rue_Marc_Antoine_Petit_Ground_floor.ifc",
      //     src: "./IfcOpenHouse4.ifc",
      //     // loadMetadata: false, // <<------- Don't load IFC metadata
      //     edges: true,
      //     // position: [50, 50, 50]
      //   });

      //   // const ifcModelTwo = ifcLoader.load({
      //   //   id: "ifcModel",
      //   //   // src: "./rac_advanced_sample_project.ifc",
      //   //   src: "./19_rue_Marc_Antoine_Petit_Ground_floor.ifc",
      //   //   // src: "./IfcOpenHouse4.ifc",
      //   //   // loadMetadata: false, // <<------- Don't load IFC metadata
      //   //   edges: true,
      //   //   // position: [50, 50, 50]
      //   // });

      //   ifcModel.on("loaded", () => {
      //     viewer.cameraFlight.jumpTo(ifcModel);
      //   });

      //   // const timeElement = document.getElementById("time")!;

      //   // const t0 = performance.now();
      //   // timeElement.innerHTML = "Loading model...";
      //   // sceneModel.on("loaded", function () {
      //   //   const t1 = performance.now();
      //   //   timeElement.innerHTML = "Model loaded in " + Math.floor(t1 - t0) / 1000.0 + " seconds<br>Objects: " + sceneModel.numEntities;
      //   // });
      // });

      // const lasLoader = new LASLoaderPlugin(viewer, {
      //   // skip: 10, // Load every 10th point
      //   fp64: false, // Positions expected in 32-bit floats instead of 64-bit
      //   colorDepth: "auto", // Whether colors encoded using 8 or 16 bits - accepted values are "auto", 8 and 16
      // });

      // const t0 = performance.now();

      // const timeElement = document.getElementById("time")!;

      // timeElement.innerHTML = "Loading model...";

      // console.log("selectedDate", selectedDate);
      // http://47.97.51.98:6093/temp/2024-05-19/J72304752/dense/meshed-poisson.las
      // http://47.97.51.98:6093/temp/2024-05-05/J72304752/dense/meshed-poisson.las

      // const lasSceneModel = lasLoader.load({
      //   id: "pointModel",
      //   // src: "./indoor.laz",
      //   // src: "http://47.97.51.98:6093/temp/2024-05-19/J72304752/dense/meshed-poisson.las",
      //   src: "http://47.97.51.98:6093/temp/2024-05-05/J72304752/dense/meshed-poisson.las",
      //   // src: "./Nalls_Pumpkin_Hill.laz",
      //   // src: "http://47.97.51.98:6093/temp/2024-04-28/J72304752/dense/meshed-poisson.las",
      //   // src: "./meshed-poisson.las",
      //   // src: "http://47.97.51.98:6093/temp/2024-05-19/J72304752/dense/meshed-poisson.las",
      //   rotation: [-90, 0, 0],
      //   // position: [50, 50, 50]
      // });

      // lasSceneModel.on("loaded", (e) => {
      //   console.log("lasSceneModel", e);
      //   viewer.cameraFlight.jumpTo(lasSceneModel);
      // });

      // const carModel = viewer.scene.models["pointModel"];
      // const houseModel = viewer.scene.models["ifcModel"];

      // console.log("carModel", carModel, "houseModel", houseModel);

      // console.log("models", viewer.scene);

      // const IfcAPI = new WebIFC.IfcAPI();

      // IfcAPI.SetWasmPath("https://cdn.jsdelivr.net/npm/web-ifc@0.0.55/");

      // const ifcApi = await IfcAPI.Init();

      // IfcAPI.Init().then((e) => {
      //   console.log("IfcAPI.Init", e);
      // });

      // console.log("ifcApi", ifcApi);

      // const ifcLoader = new WebIFCLoaderPlugin(viewer, {
      //   WebIFC,
      //   IfcAPI
      // });

      // const ifcModel = ifcLoader.load({
      //   id: "ifcModel",
      //   // src: "./rac_advanced_sample_project.ifc",
      //   src: "./19_rue_Marc_Antoine_Petit_Ground_floor.ifc",
      //   // src: "./IfcOpenHouse4.ifc",
      //   // loadMetadata: false, // <<------- Don't load IFC metadata
      //   edges: true
      // });

      // ifcModel.on("loaded", (e) => {
      //   console.log("ifcModel", e);
      //   // viewer.cameraFlight.jumpTo(ifcModel);
      // });

      // IfcAPI.Init().then(() => {

      //   const ifcLoader = new WebIFCLoaderPlugin(viewer, {
      //     WebIFC,
      //     IfcAPI
      //   });

      //   const ifcModel = ifcLoader.load({
      //     id: "myCanvas",
      //     // src: "./rac_advanced_sample_project.ifc",
      //     src: "./19_rue_Marc_Antoine_Petit_Ground_floor.ifc",
      //     // src: "./IfcOpenHouse4.ifc",
      //     // loadMetadata: false, // <<------- Don't load IFC metadata
      //     edges: true
      //   });

      //   ifcModel.on("loaded", () => {
      //     viewer.cameraFlight.jumpTo(ifcModel);
      //   });

      //   // const timeElement = document.getElementById("time")!;

      //   // const t0 = performance.now();
      //   // timeElement.innerHTML = "Loading model...";
      //   // sceneModel.on("loaded", function () {
      //   //   const t1 = performance.now();
      //   //   timeElement.innerHTML = "Model loaded in " + Math.floor(t1 - t0) / 1000.0 + " seconds<br>Objects: " + sceneModel.numEntities;
      //   // });
      // });

      // sceneModel.on("loaded", (model) => {
      //   console.log("model", model);
      //   const t1 = performance.now();
      //   timeElement.innerHTML = "Model loaded in " + Math.floor(t1 - t0) / 1000.0 + " seconds<br>Objects: " + sceneModel.numEntities;

      //   // const myAnnotation1 = annotations.createAnnotation({

      //   //   id: "myAnnotation",

      //   //   entity: viewer.scene.objects["2O2Fr$t4X7Zf8NOew3FLOH"], // Optional, associate with an Entity

      //   //   worldPos: [0, 0, 0],        // 3D World-space position

      //   //   occludable: true,           // Optional, default, makes Annotation invisible when occluded by Entities
      //   //   markerShown: true,          // Optional, default is true, makes position visible (when not occluded)
      //   //   labelShown: true,            // Optional, default is false, makes label visible (when not occluded)

      //   //   values: {                   // Optional, overrides AnnotationPlugin's defaults
      //   //     glyph: "A",
      //   //     title: "My Annotation",
      //   //     description: "This is my annotation."
      //   //   }
      //   // });
      // });

      // sceneModel.on("error", (error) => {
      //   console.error("Error loading model22", error);
      // });

      //------------------------------------------------------------------------------------------------------------------
      // GUI to play with points material properties
      //------------------------------------------------------------------------------------------------------------------

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
        // lasSceneModel.position = [
        //   guiParams.positionX,
        //   guiParams.positionY,
        //   guiParams.positionZ,
        // ];
        // lasSceneModel.rotation = [
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

      // const gui = new dat.GUI({ autoPlace: false, width: "100%" });

      // const lasPositionFolder = gui.addFolder("LAS Position");
      // gui.add(guiParams, "positionX", -50, 50).onChange(update);
      // gui.add(guiParams, "positionY", -50, 50).onChange(update);
      // gui.add(guiParams, "positionZ", -50, 50).onChange(update);
      // lasPositionFolder.open();

      // const lasRotationFolder = gui.addFolder("LAS Orientation");
      // gui.add(guiParams, "rotateX", -90, 90).onChange(update);
      // gui.add(guiParams, "rotateY", -90, 90).onChange(update);
      // gui.add(guiParams, "rotateZ", -90, 90).onChange(update);
      // lasRotationFolder.open();

      // const pointsMaterialFolder = gui.addFolder("PointsMaterial");
      // pointsMaterialFolder.add(guiParams, "roundPoints");
      // pointsMaterialFolder.add(guiParams, "pointSize", 1, 50);
      // pointsMaterialFolder.add(guiParams, "perspectivePoints");
      // pointsMaterialFolder.add(guiParams, "minPerspectivePointSize", 1, 50);
      // pointsMaterialFolder.add(guiParams, "maxPerspectivePointSize", 1, 50);
      // pointsMaterialFolder.add(guiParams, "filterIntensity");
      // pointsMaterialFolder.add(guiParams, "minIntensity", 0.0, 1.0);
      // pointsMaterialFolder.add(guiParams, "maxIntensity", 0.0, 1.0);
      // pointsMaterialFolder.open();

      // const cameraFolder = gui.addFolder("Camera");
      // cameraFolder.add(guiParams, "perspective");
      // cameraFolder.open();

      // const customContainer = document.getElementById("myDatGuiContainer");
      // customContainer?.appendChild(gui.domElement);

      console.log("viewer", viewer);
      window.viewer = viewer;
    }

    initXeo();
  }, []);

  // function onLoadPointCloud() {
  //   console.log("onLoadPointCloud");
  //   const lasLoader = new LASLoaderPlugin(window.viewer, {
  //     // skip: 10, // Load every 10th point
  //     fp64: false, // Positions expected in 32-bit floats instead of 64-bit
  //     colorDepth: "auto" // Whether colors encoded using 8 or 16 bits - accepted values are "auto", 8 and 16
  //   });

  //   // const t0 = performance.now();

  //   // const timeElement = document.getElementById("time")!;

  //   // timeElement.innerHTML = "Loading model...";

  //   const lasSceneModel = lasLoader.load({
  //     id: "pointModel",
  //     // src: "./indoor.laz",
  //     src: "./Nalls_Pumpkin_Hill.laz",
  //     // src: "http://47.97.51.98:6093/temp/2024-04-28/J72304752/dense/meshed-poisson.las",
  //     // src: "./meshed-poisson.las",
  //     // src: "http://47.97.51.98:6093/temp/2024-05-19/J72304752/dense/meshed-poisson.las",
  //     // rotation: [-90, 0, 0],
  //     // position: [50, 50, 50]
  //   });

  //   lasSceneModel.on("loaded", (e) => {
  //     console.log("lasSceneModel", e);
  //     window.viewer.cameraFlight.jumpTo(lasSceneModel);
  //   });

  // }

  function AnnotationCardFormDialog() {
    return (
      <CustomDialog
        title="Add Annotation"
        description="Add annotation to the point cloud"
        open={isOpen}
        triggerButton={null}
        onClose={closeModal}
        className="w-full"
      >
        <AnnoationFormCard />
      </CustomDialog>
    );
  }

  return (
    <>
      <div className="relative h-full w-full">
        {/* <button onClick={onLoadPointCloud} className="bg-white absolute z-20 top-0 left-0 w-fit p-1 rounded">load point cloud</button> */}
        {/* <button onClick={onCameraFlight} className="bg-white absolute z-20 top-10 left-0 w-fit p-1 rounded">onCameraFlight</button> */}
        {/* <input type="checkbox" id="info-button" /> */}
        <label htmlFor="info-button" className="info-button">
          <i className="far fa-3x fa-question-circle"></i>
        </label>
        <div className="absolute right-0 top-0 z-10">
          <Button
            type="button"
            onClick={() => {
              setAnnotationMode((p) => {
                er = !p;

                return !p;
              });

              // window.viewer.scene.annotations.setAnnotationMode(
              //   annotationMode ? "view" : "edit"
              // );
            }}
          >
            Annotation Mode: {annotationMode ? "Annotate" : "View"}
          </Button>
        </div>
        <AnnotationCardFormDialog />
        {/* <FloatComponent>
          <AnnoationFormCard />
        </FloatComponent> */}
        <div className="absolute right-[25rem] top-4 z-20 flex flex-col gap-x-1 overflow-hidden rounded-full bg-zinc-900/90 py-0.5">
          {modeButtons.map((modeButton) => (
            <Button
              title={modeButton.title}
              // className="bg-blue-500 text-white"
              size="icon"
              className={cn({
                "bg-transparent": mode !== modeButton.mode,
              })}
              onClick={() => {
                if (modeButton.mode !== mode) {
                  setMode(modeButton.mode);
                } else {
                  setMode("view");
                }
              }}
            >
              {modeButton.icon}
            </Button>
          ))}
          {/* <Button
            title="Select"
            // className="bg-blue-500 text-white"
            size="icon"
            className={cn({
              "bg-transparent": mode !== "select",
            })}
            onClick={() => {
              setMode("select");
            }}
          >
            <MousePointer className="w-[20px] h-[20px] rotate-[18deg]" />
          </Button>
          <Button
            title="Line"
            // onClick={zoomIn}
            // className="bg-blue-500 text-white"
            size="icon"
            className={cn({
              "bg-transparent": mode !== "line",
            })}
            onClick={() => {
              setMode("line");
            }}
          >
            <LineIcon />
          </Button>
          <Button
            title="Zoom Out"
            // onClick={zoomOut}
            // className="bg-blue-500 text-white"
            size="icon"
            className={cn({
              "bg-transparent": mode !== "select",
            })}
            onClick={() => {
              setMode("polygon");
            }}
          >
            <PolygonIcon />
          </Button>
          <Button
            title="Zoom Out"
            // onClick={zoomOut}
            // className="bg-blue-500 text-white"
            size="icon"
            className={cn({
              "bg-transparent": mode !== "select",
            })}
            onClick={() => {
              setMode("circle");
            }}
          >
            <CircleIcon />
          </Button>
          <Button
            title="Zoom Out"
            // onClick={zoomOut}
            // className="bg-blue-500 text-white"
            size="icon"
            className={cn({
              "bg-transparent": mode !== "select",
            })}
            onClick={() => {
              setMode("point");
            }}
          >
            <PointIcon />
          </Button> */}
        </div>
        <canvas id="myCanvas" className="h-full w-full"></canvas>
        <div></div>
        <div id="treeViewContainer" className="bg-red-300"></div>
        <div className="slideout-sidebar absolute bottom-0 right-0 top-0 hidden bg-zinc-800 px-4 py-4 text-white">
          {/* <img className="info-icon" src="../../assets/images/laserScan.png" /> */}
          <h1>LASLoaderPlugin</h1>
          <h2>
            Loading a lidar point cloud with 31M colored points from LAS format
          </h2>
          <h3>Stats</h3>
          <ul>
            <li>
              <div id="time">Loading JavaScript modules...</div>
            </li>
          </ul>
          <h3>Customize points</h3>
          <div id="myDatGuiContainer"></div>
          <h3>Components used</h3>
          <ul>
            <li>
              <a
                href="../../docs/className/src/viewer/Viewer.js~Viewer.html"
                target="_other"
              >
                Viewer
              </a>
            </li>
            <li>
              <a
                href="../../docs/className/src/plugins/LASLoaderPlugin/LASLoaderPlugin.js~LASLoaderPlugin.html"
                target="_other"
              >
                LASLoaderPlugin
              </a>
            </li>
            <li>
              <a
                href="../../docs/className/src/viewer/scene/materials/PointsMaterial.js~PointsMaterial.html"
                target="_other"
              >
                PointsMaterial
              </a>
            </li>
          </ul>
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="https://loaders.gl/" target="_other">
                Model source
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

// <!doctype html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <title>xeokit Example</title>
//     <link href="../css/pageStyle.css" rel="stylesheet"/>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js"></script>
//     <style>

//         /* ----------------------------------------------------------------------------------------------------------*/
//         /* NavCubePlugin */
//         /* ----------------------------------------------------------------------------------------------------------*/

//         #myNavCubeCanvas {
//             position: absolute;
//             width: 250px;
//             height: 250px;
//             bottom: 50px;
//             right: 10px;
//             z-index: 200000;
//         }

//         /* ----------------------------------------------------------------------------------------------------------*/
//         /* TreeViewPlugin */
//         /* ----------------------------------------------------------------------------------------------------------*/

//         #treeViewContainer {
//             pointer-events: all;
//             height: 100%;
//             overflow-y: scroll;
//             overflow-x: hidden;
//             position: absolute;
//             background-color: rgba(255, 255, 255, 0.2);
//             color: black;
//             top: 80px;
//             z-index: 200000;
//             float: left;
//             left: 0;
//             padding-left: 10px;
//             font-family: 'Roboto', sans-serif;
//             font-size: 15px;
//             user-select: none;
//             -ms-user-select: none;
//             -moz-user-select: none;
//             -webkit-user-select: none;
//             width: 350px;
//         }

//         #treeViewContainer ul {
//             list-style: none;
//             padding-left: 1.75em;
//             pointer-events: none;
//         }

//         #treeViewContainer ul li {
//             position: relative;
//             width: 500px;
//             pointer-events: none;
//             padding-top: 3px;
//             padding-bottom: 3px;
//             vertical-align: middle;
//         }

//         #treeViewContainer ul li a {
//             background-color: #eee;
//             border-radius: 50%;
//             color: #000;
//             display: inline-block;
//             height: 1.5em;
//             left: -1.5em;
//             position: absolute;
//             text-align: center;
//             text-decoration: none;
//             width: 1.5em;
//             pointer-events: all;
//         }

//         #treeViewContainer ul li a.plus {
//             background-color: #ded;
//             pointer-events: all;
//         }

//         #treeViewContainer ul li a.minus {
//             background-color: #eee;
//             pointer-events: all;
//         }

//         #treeViewContainer ul li a:active {
//             top: 1px;
//             pointer-events: all;
//         }

//         #treeViewContainer ul li span:hover {
//             color: white;
//             cursor: pointer;
//             background: black;
//             padding-left: 2px;
//             pointer-events: all;
//         }

//         #treeViewContainer ul li span {
//             display: inline-block;
//             width: calc(100% - 50px);
//             padding-left: 2px;
//             pointer-events: all;
//             height: 23px;
//         }

//         #treeViewContainer .highlighted-node { /* Appearance of node highlighted with TreeViewPlugin#showNode() */
//             border: black solid 1px;
//             background: yellow;
//             color: black;
//             padding-left: 1px;
//             padding-right: 5px;
//             pointer-events: all;
//         }

//     </style>
// </head>
// <body>
// <input type="checkbox" id="info-button"/>
// <label for="info-button" className="info-button"><i className="far fa-3x fa-question-circle"></i></label>
// <canvas id="myCanvas"></canvas>
// <canvas id="myNavCubeCanvas"></canvas>
// <div className="slideout-sidebar">
//     <img className="info-icon" src="../../assets/images/bim_icon.png"/>
//     <h1>WebIFCLoaderPlugin</h1>
//     <h2>Loading an IFC File</h2>
//     <p><a href="../../docs/className/src/plugins/WebIFCLoaderPlugin/WebIFCLoaderPlugin.js~WebIFCLoaderPlugin.html"
//           target="_other">WebIFCLoaderPlugin</a> is the easiest way to load IFC models into a xeokit Viewer.</p>
//     <p>WebIFCLoaderPlugin loads IFC STEP files and parses them within the browser using <a
//             href="https://github.com/tomvandig/web-ifc"
//             target="_other">web-ifc</a>, to create 3D objects within the
//         Viewer.</p>

//     <h3>Limitations</h3>
//     <p>Loading and parsing huge IFC STEP files can be slow, and can overwhelm the browser, however. To view your
//         largest IFC models, we recommend instead pre-converting those to xeokit's compressed native .XKT format, then
//         loading them with <a href="../../docs/className/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin.js~XKTLoaderPlugin.html"
//                              target="_other">XKTLoaderPlugin</a>.</p>
//     <h3>Stats</h3>
//     <ul>
//         <li>
//             <div id="time">Loading JavaScript modules...</div>
//         </li>
//     </ul>
//     <h3>Components used</h3>
//     <ul>
//         <li>
//             <a href="../../docs/className/src/viewer/Viewer.js~Viewer.html"
//                target="_other">Viewer</a>
//         </li>
//         <li>
//             <a href="../../docs/className/src/plugins/WebIFCLoaderPlugin/WebIFCLoaderPlugin.js~WebIFCLoaderPlugin.html"
//                target="_other">WebIFCLoaderPlugin</a>
//         </li>
//         <li>
//             <a href="../../docs/className/src/plugins/NavCubePlugin/NavCubePlugin.js~NavCubePlugin.html"
//                target="_other">NavCubePlugin</a>
//         </li>
//     </ul>
//     <h3>Assets</h3>
//     <ul>
//         <li>
//             <a href="http://openifcmodel.cs.auckland.ac.nz/Model/Details/274"
//                target="_other">Model source</a>
//         </li>
//     </ul>
// </div>
// </body>

// <script type="module">

//     import {Viewer, WebIFCLoaderPlugin, NavCubePlugin} from "../../dist/xeokit-sdk.min.es.js";
//     import * as WebIFC from "https://cdn.jsdelivr.net/npm/web-ifc@0.0.51/web-ifc-api.js";

//     const viewer = new Viewer({
//         canvasId: "myCanvas",
//         transparent: true
//     });

//     viewer.camera.eye = [102.07185264355974, 45.23873322531372, -54.1001537318987]
//     viewer.camera.look = [35.0291287591034, -3.5295781673428905, -20.312957533628705]
//     viewer.camera.up = [-0.48646319926706455, 0.8385999559445908, 0.24516049773277654]

//     new NavCubePlugin(viewer, {
//         canvasId: "myNavCubeCanvas",
//         visible: true,
//         size: 250,
//         alignment: "bottomRight",
//         bottomMargin: 100,
//         rightMargin: 10
//     });

//     const IfcAPI = new WebIFC.IfcAPI();

//     IfcAPI.SetWasmPath("https://cdn.jsdelivr.net/npm/web-ifc@0.0.51/");

//     IfcAPI.Init().then(() => {

//         const ifcLoader = new WebIFCLoaderPlugin(viewer, {
//             WebIFC,
//             IfcAPI
//         });

//         const sceneModel = ifcLoader.load({
//             id: "myModel",
//             src: "../../assets/models/ifc/rac_advanced_sample_project.ifc",
//             loadMetadata: false, // <<------- Don't load IFC metadata
//             edges: true
//         });

//         sceneModel.on("loaded", () => {
//             viewer.cameraFlight.jumpTo(sceneModel);
//         });

//         const t0 = performance.now();
//         document.getElementById("time").innerHTML = "Loading model...";
//         sceneModel.on("loaded", function () {
//             const t1 = performance.now();
//             document.getElementById("time").innerHTML = "Model loaded in " + Math.floor(t1 - t0) / 1000.0 + " seconds<br>Objects: " + sceneModel.numEntities;
//         });
//     });

// </script>
// </html>

import { WebIFCLoaderPlugin, NavCubePlugin } from "@/xeokitsdk";

// const WebIFCLoaderPlugin = dynamic(
//   () => import("@/xeokitsdk").then((mod) => mod.WebIFCLoaderPlugin),
//   { ssr: false },
// );
// const NavCubePlugin = dynamic(
//   () => import("@/xeokitsdk").then((mod) => mod.NavCubePlugin),
//   { ssr: false },
// );

import * as WebIFC from "web-ifc";
import { Button } from "@/components/ui/button";
import useModalState from "@/hooks/use-modal-state";
import CustomDialog from "@/components/ui/animated-dialog";
import { MousePointer } from "lucide-react";
import {
  CircleIcon,
  LineIcon,
  PointIcon,
  PolygonIcon,
} from "@/components/icons";
import { cn } from "@/lib/cn";
import dynamic from "next/dynamic";

export function XeokitIFCViewer() {
  React.useEffect(() => {
    const viewer = new XEOViewer({
      canvasId: "myCanvas",
      transparent: true,
    });

    viewer.camera.eye = [
      102.07185264355974, 45.23873322531372, -54.1001537318987,
    ];
    viewer.camera.look = [
      35.0291287591034, -3.5295781673428905, -20.312957533628705,
    ];
    viewer.camera.up = [
      -0.48646319926706455, 0.8385999559445908, 0.24516049773277654,
    ];

    new NavCubePlugin(viewer, {
      canvasId: "myNavCubeCanvas",
      visible: true,
      size: 250,
      alignment: "bottomRight",
      bottomMargin: 100,
      rightMargin: 10,
    });

    const lasLoader = new LASLoaderPlugin(viewer, {
      // skip: 10, // Load every 10th point
      fp64: false, // Positions expected in 32-bit floats instead of 64-bit
      colorDepth: "auto", // Whether colors encoded using 8 or 16 bits - accepted values are "auto", 8 and 16
    });

    const t0 = performance.now();

    const sceneModel = lasLoader.load({
      id: "myCanvas",
      // src: "./indoor.laz",
      src: "./Nalls_Pumpkin_Hill.laz",
      // src: "http://47.97.51.98:6093/temp/2024-04-28/J72304752/dense/meshed-poisson.las",
      // src: "./meshed-poisson.las",
      // src: "http://47.97.51.98:6093/temp/2024-05-19/J72304752/dense/meshed-poisson.las",
      rotation: [-90, 0, 0],
    });

    sceneModel.on("loaded", (model) => {
      console.log("model", model);
      const t1 = performance.now();
    });

    sceneModel.on("error", (error) => {
      console.error("Error loading model22", error);
    });

    const IfcAPI = new WebIFC.IfcAPI();

    IfcAPI.SetWasmPath("https://cdn.jsdelivr.net/npm/web-ifc@0.0.55/");

    IfcAPI.Init().then(() => {
      const ifcLoader = new WebIFCLoaderPlugin(viewer, {
        WebIFC,
        IfcAPI,
      });

      const sceneModel = ifcLoader.load({
        id: "myModel",
        // src: "./rac_advanced_sample_project.ifc",
        src: "./19_rue_Marc_Antoine_Petit_Ground_floor.ifc",
        // src: "./IfcOpenHouse4.ifc",
        // loadMetadata: false, // <<------- Don't load IFC metadata
        edges: true,
      });

      sceneModel.on("loaded", () => {
        viewer.cameraFlight.jumpTo(sceneModel);
      });

      const timeElement = document.getElementById("time")!;

      const t0 = performance.now();
      timeElement.innerHTML = "Loading model...";
      sceneModel.on("loaded", function () {
        const t1 = performance.now();
        timeElement.innerHTML =
          "Model loaded in " +
          Math.floor(t1 - t0) / 1000.0 +
          " seconds<br>Objects: " +
          sceneModel.numEntities;
      });
    });

    //------------------------------------------------------------------------------------------------------------------
    // GUI to play with points material properties
    //------------------------------------------------------------------------------------------------------------------

    const pointsMaterial = viewer.scene.pointsMaterial;
  }, []);

  return (
    <div className="h-full w-full">
      {/* <input type="checkbox" id="info-button" /> */}
      <label htmlFor="info-button" className="info-button">
        <i className="far fa-3x fa-question-circle"></i>
      </label>
      <canvas id="myCanvas"></canvas>
      {/*
        #myNavCubeCanvas {
            position: absolute;
            width: 250px;
            height: 250px;
            bottom: 50px;
            right: 10px;
            z-index: 200000;
        } */}
      {/* to tailwind classes */}
      <canvas
        id="myNavCubeCanvas"
        className="absolute bottom-[50px] right-[10px] z-[200000] h-[250px] w-[250px]"
      ></canvas>
      <div className="slideout-sidebar hidden">
        <img className="info-icon" src="../../assets/images/bim_icon.png" />
        <h1>WebIFCLoaderPlugin</h1>
        <h2>Loading an IFC File</h2>
        <p>
          <a
            href="../../docs/className/src/plugins/WebIFCLoaderPlugin/WebIFCLoaderPlugin.js~WebIFCLoaderPlugin.html"
            target="_other"
          >
            WebIFCLoaderPlugin
          </a>{" "}
          is the easiest way to load IFC models into a xeokit Viewer.
        </p>
        <p>
          WebIFCLoaderPlugin loads IFC STEP files and parses them within the
          browser using{" "}
          <a href="https://github.com/tomvandig/web-ifc" target="_other">
            web-ifc
          </a>
          , to create 3D objects within the Viewer.
        </p>

        <h3>Limitations</h3>
        <p>
          Loading and parsing huge IFC STEP files can be slow, and can overwhelm
          the browser, however. To view your largest IFC models, we recommend
          instead pre-converting those to xeokit's compressed native .XKT
          format, then loading them with{" "}
          <a
            href="../../docs/className/src/plugins/XKTLoaderPlugin/XKTLoaderPlugin.js~XKTLoaderPlugin.html"
            target="_other"
          >
            XKTLoaderPlugin
          </a>
          .
        </p>
        <h3>Stats</h3>
        <ul>
          <li>
            <div id="time">Loading JavaScript modules...</div>
          </li>
        </ul>
        <h3>Components used</h3>
        <ul>
          <li>
            <a
              href="../../docs/className/src/viewer/Viewer.js~Viewer.html"
              target="_other"
            >
              Viewer
            </a>
          </li>
          <li>
            <a
              href="../../docs/className/src/plugins/WebIFCLoaderPlugin/WebIFCLoaderPlugin.js~WebIFCLoaderPlugin.html"
              target="_other"
            >
              WebIFCLoaderPlugin
            </a>
          </li>
          <li>
            <a
              href="../../docs/className/src/plugins/NavCubePlugin/NavCubePlugin.js~NavCubePlugin.html"
              target="_other"
            >
              NavCubePlugin
            </a>
          </li>
        </ul>
        <h3>Assets</h3>
        <ul>
          <li>
            <a
              href="http://openifcmodel.cs.auckland.ac.nz/Model/Details/274"
              target="_other"
            >
              Model source
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
