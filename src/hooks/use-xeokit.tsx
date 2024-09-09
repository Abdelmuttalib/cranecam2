// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from "react";

import {
  Viewer as XEOViewer,
  LASLoaderPlugin,
  FastNavPlugin,
  AnnotationsPlugin,
  TreeViewPlugin,
  XKTLoaderPlugin,
  DistanceMeasurementsPlugin,
  DistanceMeasurementsMouseControl,
  ContextMenu,
  PointerLens,
  AngleMeasurementsPlugin,
  AngleMeasurementsMouseControl,
} from "@xeokit/xeokit-sdk";

import { MousePointer, TriangleRightIcon, ZoomIn, ZoomOut } from "lucide-react";
import { LineIcon, PointIcon, DistanceIcon } from "@/components/icons";
import useModalState from "@/hooks/use-modal-state";

import { useCanvasColorStore } from "@/stores/use-canvas-color-store";
import { Mode } from "@/types";

export function useXeokit() {
  const viewerRef = React.useRef(null);

  const [linesPlugin, setLinesPlugin] = React.useState(null);

  const [linesMouseControl, setLinesMouseControl] = React.useState(null);

  const [viewerState, setViewerState] = React.useState<any | null>(null);

  const [mode, setMode] = React.useState<Mode>("view");
  const modeRef = React.useRef(mode);

  const [annotationPlugin, setAnnotationPlugin] = React.useState<any | null>(
    null,
  );
  const [distanceMeasurementsPlugin, setDistanceMeasurementsPlugin] =
    React.useState<any | null>(null);

  const [angleMeasurementsPlugin, setAngleMeasurementsPlugin] =
    React.useState(null);

  const [
    distanceMeasurementsMouseControl,
    setDistanceMeasurementsMouseControl,
  ] = React.useState(null);

  const [angleMeasurementsMouseControl, setAngleMeasurementsMouseControl] =
    React.useState(null);

  const distanceMeasurementsMouseControlRef = React.useRef(
    distanceMeasurementsMouseControl,
  );

  const angleMeasurementsMouseControlRef = React.useRef(
    angleMeasurementsMouseControl,
  );

  const linesMouseControlRef = React.useRef(linesMouseControl);

  React.useEffect(() => {
    linesMouseControlRef.current = linesMouseControl;
  }, [linesMouseControl]);

  React.useEffect(() => {
    angleMeasurementsMouseControlRef.current = angleMeasurementsMouseControl;
  }, [angleMeasurementsMouseControl]);

  React.useEffect(() => {
    modeRef.current = mode; // Update ref whenever mode changes

    if (mode === "line") {
      onActivateLinesMouseControl();
    }

    if (mode === "angle") {
      onActivateAngleMeasurementMouseControl();
    }

    if (mode === "distance") {
      onActivateDistanceMeasurementMouseControl();
    }
  }, [mode]);

  const [selectedObject, setSelectedObject] = React.useState<any | null>(null);

  React.useEffect(() => {
    // modeRef.current = mode; // Update ref whenever mode changes

    distanceMeasurementsMouseControlRef.current =
      distanceMeasurementsMouseControl;
  }, [distanceMeasurementsMouseControl]);

  const modeButtons: {
    title: string;
    mode: Mode;
    icon: React.ReactNode;
    onClick: () => void;
  }[] = [
    {
      title: "Select",
      mode: "select",
      icon: <MousePointer className="h-[20px] w-[20px] rotate-[18deg]" />,
      onClick: () => {
        setMode("select");
      },
    },
    // {
    //   title: "Line",
    //   mode: "line",
    //   icon: <LineIcon />,
    //   onClick: () => {
    //     setMode("line");
    //   },
    // },
    {
      title: "Distance",
      mode: "distance",
      icon: <DistanceIcon />,
      onClick: () => {
        setMode("distance");
      },
    },
    {
      title: "Angle",
      mode: "angle",
      icon: <TriangleRightIcon />,
      onClick: () => {
        setMode("angle");
      },
    },
    // {
    //   title: "Polygon",
    //   mode: "polygon",
    //   icon: <PolygonIcon />,
    //   onClick: () => {
    //     setMode("polygon");
    //   },
    // },
    // {
    //   title: "Circle",
    //   mode: "circle",
    //   icon: <CircleIcon />,
    //   onClick: () => {
    //     setMode("circle");
    //   },
    // },
    {
      title: "Point",
      mode: "point",
      icon: <PointIcon />,
      onClick: () => {
        setMode("point");
      },
    },
  ];

  const [canvasColor, changeColor] = useCanvasColorStore((state) => [
    state.color,
    state.changeColor,
  ]);

  const { isOpen, openModal, closeModal } = useModalState();

  function onAddAnnotation(coords, pickResult) {
    openModal();
    console.log("onAddAnnotation", coords, pickResult);
    if (!annotationPlugin) return;
  }

  const viewerClickData = React.useRef({
    coords: null,
    pickResult: null,
  });

  function onAddDistanceMeasurement() {
    const distMsRef: any = distanceMeasurementsMouseControlRef.current;

    if (!distMsRef) return;

    distMsRef.snapping = true;

    distMsRef.activate();
  }

  function onAddAngleMeasurement() {
    const anglMsRef: any = angleMeasurementsMouseControlRef.current;

    if (!anglMsRef) return;

    anglMsRef.snapping = true;

    anglMsRef.activate();
  }

  function onAddLine() {
    const lnsMouseControlRef: any = linesMouseControlRef.current;

    if (!lnsMouseControlRef) return;

    lnsMouseControlRef.snapping = true;

    lnsMouseControlRef.activate();
  }

  function onDeactivateDistanceMeasurementMouseControl() {
    const distMsRef: any = distanceMeasurementsMouseControlRef.current;

    if (!distMsRef) return;

    distMsRef.snapping = false;

    distMsRef.deactivate();
  }

  function onDeactivateAngleMeasurementMouseControl() {
    const anglMsRef: any = angleMeasurementsMouseControlRef.current;

    if (!anglMsRef) return;

    anglMsRef.snapping = false;

    anglMsRef.deactivate();
  }

  function onDeactivateLinesMouseControl() {
    const lnsMouseControlRef: any = linesMouseControlRef.current;

    if (!lnsMouseControlRef) return;

    lnsMouseControlRef.snapping = false;

    lnsMouseControlRef.deactivate();
  }

  function onActivateAngleMeasurementMouseControl() {
    const anglMsRef: any = angleMeasurementsMouseControlRef.current;

    if (!anglMsRef) return;

    anglMsRef.snapping = true;

    anglMsRef.activate();
  }

  function onActivateDistanceMeasurementMouseControl() {
    const distMsRef: any = distanceMeasurementsMouseControlRef.current;

    if (!distMsRef) return;

    distMsRef.snapping = true;

    distMsRef.activate();
  }

  function onActivateLinesMouseControl() {
    const lnsMouseControlRef: any = linesMouseControlRef.current;

    if (!lnsMouseControlRef) return;

    lnsMouseControlRef.snapping = true;

    lnsMouseControlRef.activate();
  }

  function onViewerClick(coords, pickResult) {
    viewerClickData.current.coords = coords;
    viewerClickData.current.pickResult = pickResult;

    const currentMode = modeRef.current;

    if (currentMode === "point") {
      onAddAnnotation(coords, pickResult);
    }

    if (currentMode === "line") {
      console.log("line");
    }

    if (currentMode === "distance") {
      onAddDistanceMeasurement();
    }

    if (currentMode === "angle") {
      // onAddDistanceMeasurement();
      onAddAngleMeasurement();
    }

    if (currentMode === "line") {
      // onAddDistanceMeasurement();
      onAddLine();
    }
  }

  function onCreateAnnotation(title: string, description: string) {
    console.log("viewer click data", viewerClickData.current);

    const pickResult = viewerClickData.current.pickResult;
    const coords = viewerClickData.current.coords;

    if (!annotationPlugin) return;

    annotationPlugin.createAnnotation({
      id: "myAnnotation",
      pickResult: pickResult,
      occludable: true,
      markerShown: true,
      labelShown: false,
      // labelShown: true,
      values: {
        glyph: "A",
        title: title,
        description: description,
      },
    });

    closeModal();
  }

  const [renderIndex, setRenderIndex] = React.useState(0);

  const [cameraPosition, setCameraPosition] = React.useState({
    eye: [0, 0, 0],
    look: [0, 0, 0],
    up: [0, 0, 0],
  });

  React.useEffect(() => {
    async function initXeo() {
      const viewer = new XEOViewer({
        canvasId: "myCanvas",
        transparent: true,
      });

      // 2
      // viewer.scene.camera.eye = [-2.56, 8.38, 8.27];
      // viewer.scene.camera.look = [13.44, 3.31, -14.83];
      // viewer.scene.camera.up = [0.1, 0.98, -0.14];

      if (viewer) {
        setCameraPosition({
          eye: [-2.56, 8.38, 8.27],
          look: [13.44, 3.31, -14.83],
          up: [0.1, 0.98, -0.14],
          // eye: viewer.scene.camera.eye,
          // look: viewer.scene.camera.look,
          // up: viewer.scene.camera.up,
        });
      }

      if (!window.viewer) {
        window.viewer = viewer;
      }
      if (!viewerRef.current) {
        viewerRef.current = viewer as any;
      }
      if (!viewerState) {
        setViewerState(viewer);
      }

      const annotations = new AnnotationsPlugin(viewer, {
        // markerHTML:
        //   "<div class='annotation-marker' on style='background-color: {{markerBGColor}};'><svg width='100%' height='100%' viewBox='0 0 24 24' fill='currentColor' onclick='function ddd(){console.log(dddd)}' className='w-[22px] h-[22px]' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid meet' focusable='false'><path d='M12 2a6.995 6.995 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a6.993 6.993 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z'></path></svg></div>",
        // labelHTML:
        //   "<div class='annotation-label' style='background-color: {{labelBGColor}};'><div class='annotation-title'>{{title}}</div><div class='annotation-desc'>{{description}}</div></div>",
        // markerElementId: "myMarkerElement",
        // labelElementId: "myLabelElement",

        // values: {
        //   markerBGColor: "black",
        //   glyph: "X",
        //   title: "Untitled",
        //   description: "No description",
        // },

        // markerHTML:
        //   "<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>",
        // labelHTML:
        //   "<div class='annotation-label' style='background-color: {{labelBGColor}};'>\
        //     <div class='annotation-title'>{{title}}</div>\
        //     <div class='annotation-desc'>{{description}}</div>\
        //     </div>",

        markerHTML:
          "<div class='annotation-marker' on style='background-color: transparent;'><svg width='100%' height='100%' viewBox='0 0 24 24' fill='currentColor' onclick='function ddd(){console.log(dddd)}' className='w-[22px] h-[22px]' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid meet' focusable='false'><path d='M12 2a6.995 6.995 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a6.993 6.993 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z'></path></svg></div>",
        labelHTML:
          "<div class='annotation-label' style='background-color: {{labelBGColor}};'><div class='annotation-title'>{{title}}</div><div class='annotation-desc'>{{description}}</div></div>",

        values: {
          markerBGColor: "red",
          labelBGColor: "white",
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

      setAnnotationPlugin(annotations);

      const distanceMeasurementsPlugin = new DistanceMeasurementsPlugin(viewer);
      setDistanceMeasurementsPlugin(
        distanceMeasurementsPlugin as unknown as typeof DistanceMeasurementsPlugin,
      );

      distanceMeasurementsPlugin.on(
        "measurementStart",
        (distanceMeasurement) => {
          console.log("measurementStart");
          console.log("origin", distanceMeasurement.origin.entity);
          console.log("target", distanceMeasurement.target.entity);
        },
      );

      distanceMeasurementsPlugin.on("measurementEnd", (distanceMeasurement) => {
        console.log("measurementEnd");
        console.log("origin", distanceMeasurement.origin.entity);
        console.log("target", distanceMeasurement.target.entity);
      });

      distanceMeasurementsPlugin.on(
        "measurementCancel",
        (distanceMeasurement) => {
          console.log("measurementCancel");
          console.log("origin", distanceMeasurement.origin.entity);
          console.log("target", distanceMeasurement.target.entity);
        },
      );

      const distanceMeasurementsMouseControl =
        new DistanceMeasurementsMouseControl(distanceMeasurementsPlugin, {
          pointerLens: new PointerLens(viewer),
          snapping: true, // Default
        });

      setDistanceMeasurementsMouseControl(
        distanceMeasurementsMouseControl as any,
      );

      const angleMeasurementsContextMenu = new ContextMenu({
        items: [
          [
            {
              getTitle: (context) => {
                return context.angleMeasurement.labelsVisible
                  ? "Hide Labels"
                  : "Show Labels";
              },
              doAction: function (context) {
                context.angleMeasurement.labelsVisible =
                  !context.angleMeasurement.labelsVisible;
              },
            },
            // {
            //   title: "Edit",
            //   doAction: function (context) {
            //     angleMeasurementsMouseControl.deactivate();
            //     const measurement = context.angleMeasurement;
            //     const edit = new AngleMeasurementEditMouseControl(measurement, {
            //       pointerLens: new PointerLens(viewer),
            //       snapping: true,
            //     });
            //     edit.on("edited", () => console.log("edited", measurement.id));
            //     endMeasurementEdit = () => {
            //       edit.deactivate();
            //       endMeasurementEdit = null;
            //     };
            //   },
            // },
          ],
          [
            {
              title: "Delete Measurement",
              doAction: function (context) {
                context.angleMeasurement.destroy();
              },
            },
          ],
          [
            {
              getTitle: () => {
                return "Cancel Measurement";
              },
              doAction: function () {
                angleMeasurementsMouseControl.reset();
              },
            },
            {
              getTitle: () => {
                return "End Editing";
              },
              getEnabled: function () {
                return !!endMeasurementEdit;
              },
              // doAction: function () {
              //   endMeasurementEdit();
              // },
            },
          ],
        ],
      });

      angleMeasurementsContextMenu.on("hidden", () => {
        if (angleMeasurementsContextMenu.context.angleMeasurement) {
          angleMeasurementsContextMenu.context.angleMeasurement.setHighlighted(
            false,
          );
        }
      });

      const angleMeasurementsPlugin = new AngleMeasurementsPlugin(viewer, {
        zIndex: 100000, // If set, the wires, dots and labels will have this zIndex (+1 for dots and +2 for labels).
      });

      // angleMeasurementsPlugin.on("measurementStart", (angleMeasurement) => {
      //   console.log("measurementStart");
      //   console.log("origin", angleMeasurement.origin.entity);
      //   console.log("corner", angleMeasurement.corner.entity);
      //   console.log("target", angleMeasurement.target.entity);
      // });

      // angleMeasurementsPlugin.on("measurementEnd", (angleMeasurement) => {
      //   console.log("measurementEnd");
      //   console.log("origin", angleMeasurement.origin.entity);
      //   console.log("corner", angleMeasurement.corner.entity);
      //   console.log("target", angleMeasurement.target.entity);
      // });

      // angleMeasurementsPlugin.on("measurementCancel", (angleMeasurement) => {
      //   console.log("measurementCancel");
      //   console.log("origin", angleMeasurement.origin.entity);
      //   console.log("corner", angleMeasurement.corner.entity);
      //   console.log("target", angleMeasurement.target.entity);
      // });

      setAngleMeasurementsPlugin(angleMeasurementsPlugin as any);

      // angleMeasurementsPlugin.on("measurementStart", (angleMeasurement) => {
      //   console.log("measurementStart");
      //   console.log("origin", angleMeasurement.origin.entity);
      //   console.log("corner", angleMeasurement.corner.entity);
      //   console.log("target", angleMeasurement.target.entity);
      // });

      // angleMeasurementsPlugin.on("measurementEnd", (angleMeasurement) => {
      //   console.log("measurementEnd");
      //   console.log("origin", angleMeasurement.origin.entity);
      //   console.log("corner", angleMeasurement.corner.entity);
      //   console.log("target", angleMeasurement.target.entity);
      // });

      // angleMeasurementsPlugin.on("measurementCancel", (angleMeasurement) => {
      //   console.log("measurementCancel");
      //   console.log("origin", angleMeasurement.origin.entity);
      //   console.log("corner", angleMeasurement.corner.entity);
      //   console.log("target", angleMeasurement.target.entity);
      // });

      const angleMeasurementsMouseControl = new AngleMeasurementsMouseControl(
        angleMeasurementsPlugin,
        {
          pointerLens: new PointerLens(viewer),
        },
      );

      setAngleMeasurementsMouseControl(angleMeasurementsMouseControl as any);

      angleMeasurementsPlugin.on("mouseOver", (e: any) => {
        // alert("mouseOver");
        if (endMeasurementEdit) {
          return;
        }
        e.angleMeasurement.setHighlighted(true);
      });

      // angleMeasurementsPlugin.on("mouseClick", (e) => {
      //   alert("mouseClick");
      //   if (endMeasurementEdit) {
      //     return;
      //   }
      //   e.angleMeasurement.setHighlighted(true);
      // });

      angleMeasurementsPlugin.on("mouseLeave", (e: any) => {
        if (endMeasurementEdit) {
          return;
        }
        if (
          angleMeasurementsContextMenu.shown &&
          angleMeasurementsContextMenu.context.angleMeasurement.id ===
            e.angleMeasurement.id
        ) {
          return;
        }
        e.angleMeasurement.setHighlighted(false);
      });

      angleMeasurementsPlugin.on("contextMenu", (e: any) => {
        if (endMeasurementEdit) {
          return;
        }
        angleMeasurementsContextMenu.context = {
          // Must set context before showing menu
          viewer: viewer,
          angleMeasurementsPlugin: angleMeasurementsPlugin,
          angleMeasurement: e.angleMeasurement,
        };
        angleMeasurementsContextMenu.show(e.event.clientX, e.event.clientY);
        e.event.preventDefault();
      });

      // const linesPlugin = new LinesPlugin(viewer, {
      //   zIndex: 100000, // If set, the wires, dots and labels will have this zIndex (+1 for dots and +2 for labels).
      //   defaultColor: "#00BB00",
      // });

      // setLinesPlugin(linesPlugin);

      // linesPlugin.on("measurementStart", (line) => {
      //   console.log("measurementStart");
      //   console.log("origin", line.origin.entity);
      //   console.log("corner", line.corner.entity);
      //   console.log("target", line.target.entity);
      // });

      // linesPlugin.on("measurementEnd", (line) => {
      //   console.log("measurementEnd");
      //   console.log("origin", line.origin.entity);
      //   console.log("corner", line.corner.entity);
      //   console.log("target", line.target.entity);
      // });

      // linesPlugin.on("measurementCancel", (line) => {
      //   console.log("measurementCancel");
      //   console.log("origin", line.origin.entity);
      //   console.log("corner", line.corner.entity);
      //   console.log("target", line.target.entity);
      // });

      // const linesContextMenu = new ContextMenu({
      //   items: [
      //     [
      //       {
      //         getTitle: (context) => {
      //           return context.line.labelsVisible
      //             ? "Hide Labels"
      //             : "Show Labels";
      //         },
      //         doAction: function (context) {
      //           context.line.labelsVisible = !context.line.labelsVisible;
      //         },
      //       },
      //     ],
      //     [
      //       {
      //         title: "Delete Measurement",
      //         doAction: function (context) {
      //           context.line.destroy();
      //         },
      //       },
      //     ],
      //     [
      //       {
      //         getTitle: () => {
      //           return "Cancel Measurement";
      //         },
      //         doAction: function () {
      //           linesMouseControl.reset();
      //         },
      //       },
      //       {
      //         getTitle: () => {
      //           return "End Editing";
      //         },
      //         getEnabled: function () {
      //           return !!endMeasurementEdit;
      //         },
      //         // doAction: function () {
      //         //   endMeasurementEdit();
      //         // },
      //       },
      //     ],
      //   ],
      // });

      angleMeasurementsContextMenu.on("hidden", () => {
        if (angleMeasurementsContextMenu.context.angleMeasurement) {
          angleMeasurementsContextMenu.context.angleMeasurement.setHighlighted(
            false,
          );
        }
      });

      let endMeasurementEdit = null;

      // const linesMouseControl = new LinesMouseControl(linesPlugin, {
      //   pointerLens: new PointerLens(viewer),
      // });

      // setLinesMouseControl(linesMouseControl);

      // linesPlugin.on("mouseOver", (e) => {
      //   if (endMeasurementEdit) {
      //     return;
      //   }
      //   // e.angleMeasurement.setHighlighted(true);
      // });

      // // mouse click

      // linesPlugin.on("mouseClick", (e) => {
      //   if (endMeasurementEdit) {
      //     return;
      //   }
      //   // console.log("mouseClick", e);
      //   // e.line.setHighlighted(true);
      // });

      // linesPlugin.on("mouseLeave", (e) => {
      //   if (endMeasurementEdit) {
      //     return;
      //   }
      //   if (
      //     linesContextMenu.shown &&
      //     linesContextMenu.context.line.id === e.line.id
      //   ) {
      //     return;
      //   }
      //   // e.line.setHighlighted(false);
      // });

      // linesPlugin.on("contextMenu", (e) => {
      //   if (endMeasurementEdit) {
      //     return;
      //   }
      //   linesContextMenu.context = {
      //     // Must set context before showing menu
      //     viewer: viewer,
      //     linesPlugin: linesPlugin,
      //     line: e.line,
      //   };
      //   linesContextMenu.show(e.event.clientX, e.event.clientY);
      //   e.event.preventDefault();
      // });

      viewer.scene.input.on("mouseclicked", (coords) => {
        const pickResult = viewer.scene.pick({
          canvasPos: coords,
          pickSurface: true, // <<------ This causes picking to find the intersection point on the entity
        });

        if (!pickResult) {
          return;
        }

        if (pickResult) {
          onViewerClick(coords, pickResult);
        }
      });

      // annotations.on("contextmenu", (annotation) => {
      //   // Initiate annotation's position change
      //   editedAnnotation = annotation;
      // });

      annotations.on("markerClicked", (annotation: any) => {
        setSelectedObject(annotation);
      });

      const pivotElement = document
        .createRange()
        .createContextualFragment(
          "<div className='xeokit-camera-pivot-marker'></div>",
        ).firstChild;

      document.body.appendChild(pivotElement as HTMLElement);

      viewer.cameraControl.pivotElement = pivotElement as HTMLElement;

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

      new TreeViewPlugin(viewer, {
        containerElement:
          document.getElementById("treeViewContainer") ?? undefined,
        autoExpandDepth: 3, // Initially expand the root tree node
      });

      //------------------------------------------------------------------------------------------------------------------
      // 1. Create a XKTLoaderPlugin,
      // 2. Load a building model and JSON IFC metadata
      //------------------------------------------------------------------------------------------------------------------

      // 1
      const xktLoader = new XKTLoaderPlugin(viewer);

      // // // 2
      // const model = xktLoader.load({
      //   // Returns an Entity that represents the model
      //   id: "myModel",
      //   // src: "./models/xkt/Schependomlaan.xkt",
      //   src: "./meshed-1.ply.xkt",
      //   // src: "./models/xkt/v7/OTCConferenceCenter/OTCConferenceCenter.xkt",
      //   // src: "./rme.ply.xkt",
      //   edges: true,
      // });

      // model.on("loaded", () => {
      //   viewer.cameraFlight.jumpTo(model);
      // });

      // 1
      // const xktLoader = new XKTLoaderPlugin(viewer);

      // // 2
      const model = xktLoader.load({
        // Returns an Entity that represents the model
        id: "myModel",
        // src: "./models/xkt/Schependomlaan.xkt",
        // src: "/models/rac.xkt",
        // src: "/models/ar-demo-sample-single-building-01.xkt",
        src: "/models/meshed-1.ply.xkt",
        // src: "/models/meshed-2.ply.xkt",
        // src: "/models/result-4.ply.xkt",
        // src: "./models/xkt/v7/OTCConferenceCenter/OTCConferenceCenter.xkt",
        // src: "./rme.ply.xkt",
        edges: true,
      });

      model.on("loaded", () => {
        viewer.cameraFlight.jumpTo(model);
      });

      // const t0 = performance.now();

      // const bimSceneModel = xktLoader.load({
      //   id: "myModel",
      //   src: "/models/MAP.gltf.xkt",
      //   saoEnabled: true,
      //   edges: true,
      //   objectDefaults: {
      //     // This model has opaque windows / spaces; make them transparent
      //     IfcPlate: {
      //       opacity: 0.3, // These are used as windows in this model - make transparent
      //     },
      //     IfcWindow: {
      //       opacity: 0.4,
      //     },
      //     IfcSpace: {
      //       opacity: 0.4,
      //     },
      //   },
      // });

      // const lasSceneModel = xktLoader.load({
      //   id: "myModel2",
      //   src: "/models/MAP-PointCloud.xkt",
      //   edges: true,
      //   objectDefaults: {
      //     // This model has opaque windows / spaces; make them transparent
      //     IfcPlate: {
      //       opacity: 0.3, // These are used as windows in this model - make transparent
      //     },
      //     IfcWindow: {
      //       opacity: 0.4,
      //     },
      //     IfcSpace: {
      //       opacity: 0.4,
      //     },
      //   },
      // });

      // bimSceneModel.on("loaded", () => {
      //   bimSceneModel.position = [
      //     -1842009.4968455553, -9.685518291306686, 5173295.851503017,
      //   ];
      //   var t1 = performance.now();
      //   // document.getElementById("time").innerHTML =
      //   //   "Model loaded in " +
      //   //   Math.floor(t1 - t0) / 1000.0 +
      //   //   " seconds<br>Objects: " +
      //   //   bimSceneModel.numEntities;
      // });

      // const lasLoader = new LASLoaderPlugin(viewer, {
      //   // skip: 10, // Load every 10th point
      //   fp64: false, // Positions expected in 32-bit floats instead of 64-bit
      //   colorDepth: "auto", // Whether colors encoded using 8 or 16 bits - accepted values are "auto", 8 and 16
      // });

      // const sceneModel = lasLoader.load({
      //   id: "myCanvas",
      //   // src: "./indoor.laz",
      //   // src: "./Nalls_Pumpkin_Hill.laz",
      //   // src: "/mees.las",
      //   src: "/models/mesh.las",
      //   // src: "./mes.las",
      //   // src: "http://47.97.51.98:6093/temp/2024-04-28/J72304752/dense/meshed-poisson.las",
      //   // src: "./meshed-poisson.las",
      //   // src: "http://47.97.51.98:6093/temp/2024-05-19/J72304752/dense/meshed-poisson.las",
      //   // rotation: [-90, 0, 0],
      // });

      // sceneModel.on("loaded", (model) => {
      //   console.log("model", model);
      //   const t0 = performance.now();
      // });

      // sceneModel.on("error", (error) => {
      //   console.error("Error loading model22", error);
      // });

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

      window.viewer = viewer;
    }

    initXeo();
  }, []);

  function getMeasurements() {
    if (!distanceMeasurementsPlugin) return;

    const measurements = distanceMeasurementsPlugin?.measurements;

    return measurements;
  }

  function destroyMeasurement(id: string) {
    if (!distanceMeasurementsPlugin || !id) return;

    distanceMeasurementsPlugin.destroyMeasurement(id);
  }

  function destroyAllMeasurements() {
    const measurements = getMeasurements();
    const measurementsArray = Object.values(measurements);
    measurementsArray.forEach((measurement: any) => {
      destroyMeasurement(measurement.id);
    });
  }

  const [measurements, setMeasurements] = React.useState(
    distanceMeasurementsPlugin?.measurements,
  );

  React.useEffect(() => {
    setMeasurements(distanceMeasurementsPlugin?.measurements);
  }, [distanceMeasurementsPlugin?.measurements]);

  function getSceneObjects() {
    const sceneObjects = window.viewer.scene.objects;
    Object.values(sceneObjects).forEach((sceneObject: any) => {
      sceneObject.visible = !sceneObject.visible;
    });
    return sceneObjects;
  }

  const [sceneObjects, setSceneObjects] = React.useState(null);

  React.useEffect(() => {
    if (!viewerState) return;
    setTimeout(() => {
      setSceneObjects(viewerState?.scene?.objects);
    }, 3000);
  }, [viewerState]);

  function takeScreenshot(canvasElement) {
    var tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvasElement.offsetWidth;
    tempCanvas.height = canvasElement.offsetHeight;
    var tempCtx: any = tempCanvas.getContext("2d");

    var computedStyle = window.getComputedStyle(canvasElement);
    tempCtx.fillStyle = computedStyle.backgroundColor;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    tempCtx.drawImage(canvasElement, 0, 0);

    var dataURL = tempCanvas.toDataURL();

    var downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "construction_site_screenshot.png";
    downloadLink.textContent = "Download Image";

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
  }

  // Function to capture and download screenshot
  function onScreenshot() {
    if (!viewerRef.current) {
      return;
    }
    const vier: any = viewerRef.current;

    // const viewerElem = potreeContainerDiv.current;
    const canvas = vier.scene.canvas.canvas;

    takeScreenshot(canvas);
  }

  // Function to zoom in
  function onZoomIn() {
    const viewer = viewerRef.current;
    if (viewer) {
      // viewer.controls.radiusDelta = -3; // Adjust this value as needed
      viewer.camera.zoom(-2);
    }
  }

  // Function to zoom out
  function onZoomOut() {
    const viewer = viewerRef.current;
    if (viewer) {
      const cLook = viewer.camera.eye;
      const cEye = viewer.camera.eye;
      const cUp = viewer.camera.up;

      viewer.camera.look = [cLook[0] + 5, cLook[1] + 5, cLook[2] + 5];
      // viewer.camera.zoom(2);
      // viewer.controls.radiusDelta = 3; // Adjust this value as needed
    }
  }

  const [settingsDialogOpen, setSettingsDialogOpen] = React.useState(false);

  function onRender() {
    setRenderIndex((currentIndex) => currentIndex + 1);
  }

  return {
    viewerRef,
    onRender,
    onZoomIn,
    onZoomOut,
    onScreenshot,
    settingsDialogOpen,
    setSettingsDialogOpen,
    renderIndex,
    setRenderIndex,
    cameraPosition,
    onDeactivateDistanceMeasurementMouseControl,
    onActivateDistanceMeasurementMouseControl,
    distanceMeasurementsMouseControlRef,
    distanceMeasurementsPlugin,
    linesMouseControlRef,
    linesPlugin,
    angleMeasurementsPlugin,
    angleMeasurementsMouseControlRef,
    mode,
    setMode,
    selectedObject,
    setSelectedObject,
    annotationPlugin,
    setAnnotationPlugin,
    canvasColor,
    changeColor,
    isOpen,
    openModal,
    closeModal,
    modeRef,
    viewerState,
    setViewerState,
    modeButtons,
    onViewerClick,
    destroyMeasurement,
    destroyAllMeasurements,
    getMeasurements,
    getSceneObjects,
    sceneObjects,
    onDeactivateAngleMeasurementMouseControl,
    onActivateAngleMeasurementMouseControl,
    onDeactivateLinesMouseControl,
    onActivateLinesMouseControl,
    onCreateAnnotation,
    onAddDistanceMeasurement,
    onAddAngleMeasurement,
    onAddLine,
  };
}

// import { useContext, createContext, useState, useEffect } from "react";
// import {
//   Viewer as XEOViewer,
//   LASLoaderPlugin,
//   FastNavPlugin,
//   AnnotationsPlugin,
//   TreeViewPlugin,
//   XKTLoaderPlugin,
//   DistanceMeasurementsPlugin,
//   DistanceMeasurementsMouseControl,
//   // DistanceMeasurementEditMouseControl,
//   ContextMenu,
//   PointerLens,
//   SkyboxesPlugin,
//   ViewerConfiguration,
// } from "@xeokit/xeokit-sdk";

// export type XeokitContextType = {
//   viewer: XEOViewer | null;
// };

// export const XeokitContext = createContext<XeokitContextType | null>(null);

// export function useXeokit() {
//   const context = useContext(XeokitContext);
//   if (!context) {
//     throw new Error("useXeokit must be used within a XeokitProvider");
//   }

//   return context;
// }

// type XeokitProviderProps = {
//   children: React.ReactNode;
// };

// const ANNOTATIONS_PLUGIN_CONFIG = {
//   markerHTML:
//     "<div class='annotation-marker' on style='background-color: {{markerBGColor}};'><svg width='100%' height='100%' viewBox='0 0 24 24' fill='currentColor' onclick='function ddd(){console.log(dddd)}' className='w-[22px] h-[22px]' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid meet' focusable='false'><path d='M12 2a6.995 6.995 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a6.993 6.993 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z'></path></svg></div>",
//   labelHTML:
//     "<div class='annotation-label' style='background-color: {{labelBGColor}};'><div class='annotation-title'>{{title}}</div><div class='annotation-desc'>{{description}}</div></div>",
//   // markerElementId: "myMarkerElement",
//   // labelElementId: "myLabelElement",

//   values: {
//     markerBGColor: "black",
//     glyph: "X",
//     title: "Untitled",
//     description: "No description",
//   },

//   surfaceOffset: 0.1,
// };

// export function XeokitProvider({ children }: { children: React.ReactNode }) {
//   const [viewer, setViewer] = useState<XEOViewer | null>(null);

//   const [annotationsPlugin, setAnnotationsPlugin] =
//     useState<AnnotationsPlugin | null>(null);

//   const [distanceMeasurementsPlugin, setDistanceMeasurementsPlugin] =
//     useState<DistanceMeasurementsPlugin | null>(null);

//   const [
//     distanceMeasurementsMouseControl,
//     setDistanceMeasurementsMouseControl,
//   ] = useState<DistanceMeasurementsMouseControl | null>(null);

//   useEffect(() => {
//     const viewer = new XEOViewer({
//       canvasId: "xeokit-canvas",
//       transparent: true,
//       // transparentBackground: true,
//     });

//     const annotationsPlugin = new AnnotationsPlugin(
//       viewer,
//       ANNOTATIONS_PLUGIN_CONFIG,
//     );

//     setAnnotationsPlugin(annotationsPlugin);

//     setViewer(viewer);

//     const distanceMeasurementsPlugin = new DistanceMeasurementsPlugin(viewer);
//     setDistanceMeasurementsPlugin(distanceMeasurementsPlugin);

//     distanceMeasurementsPlugin.on("measurementStart", (distanceMeasurement) => {
//       console.log("measurementStart");
//       console.log("origin", distanceMeasurement.origin.entity);
//       console.log("target", distanceMeasurement.target.entity);
//     });

//     distanceMeasurementsPlugin.on("measurementEnd", (distanceMeasurement) => {
//       console.log("measurementEnd");
//       console.log("origin", distanceMeasurement.origin.entity);
//       console.log("target", distanceMeasurement.target.entity);
//     });

//     distanceMeasurementsPlugin.on(
//       "measurementCancel",
//       (distanceMeasurement) => {
//         console.log("measurementCancel");
//         console.log("origin", distanceMeasurement.origin.entity);
//         console.log("target", distanceMeasurement.target.entity);
//       },
//     );

//     const distanceMeasurementsMouseControl =
//       new DistanceMeasurementsMouseControl(distanceMeasurementsPlugin, {
//         pointerLens: new PointerLens(viewer),
//         snapping: true, // Default
//       });

//     setDistanceMeasurementsMouseControl(distanceMeasurementsMouseControl);

//     return () => {
//       viewer.destroy();
//     };
//   }, []);

//   return (
//     <XeokitContext.Provider
//       value={{
//         viewer,
//       }}
//     >
//       {children}
//     </XeokitContext.Provider>
//   );
// }
