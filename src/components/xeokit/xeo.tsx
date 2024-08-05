// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from "react";

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
//   AngleMeasurementsPlugin,
//   AngleMeasurementsMouseControl,
// } from "@xeokit/xeokit-sdk";

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
} from "@xeokit/xeokit-sdk";

import { Button, ButtonLink } from "@/components/ui/button";
import {
  CalendarIcon,
  CameraIcon,
  CheckIcon,
  ChevronRight,
  ChevronRightIcon,
  EyeIcon,
  LogIn,
  MousePointer,
  TriangleRightIcon,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  LineIcon,
  CircleIcon,
  PointIcon,
  PolygonIcon,
  DistanceIcon,
  LayersIcon,
  OutputObjectIcon,
  PlyIcon,
  AnnotationIcon,
  SettingsIcon,
  UserIcon,
  TrashIcon,
} from "@/components/icons";
import useModalState from "@/hooks/use-modal-state";
import CustomDialog from "../ui/animated-dialog";
import { ShareDialog } from "./share-dialog";
import { ThemeSelect } from "./theme-select";
import { Typography } from "@/components//ui/typography";
import { IconButton } from "../ui/icon-button";
import { Timeline } from "@/components/xeokit/data-select-timeline";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {
  CANVAS_COLORS,
  DEFAULT_CANVAS_COLOR,
  useCanvasColorStore,
} from "@/stores/use-canvas-color-store";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import Script from "next/script";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Label } from "../ui/label";
import { signOut, useSession } from "next-auth/react";
import { generateAvatarUrl } from "@/lib/avatar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Mode =
  | "view"
  | "select"
  | "line"
  | "angle"
  | "distance"
  | "polygon"
  | "circle"
  | "point";

export default function Xeo() {
  const viewerRef = React.useRef(null);

  const [viewerState, setViewerState] = React.useState(null);

  const [mode, setMode] = React.useState<Mode>("view");
  const modeRef = React.useRef(mode);

  const [annotationPlugin, setAnnotationPlugin] = React.useState(null);
  const [distanceMeasurementsPlugin, setDistanceMeasurementsPlugin] =
    React.useState<typeof DistanceMeasurementsPlugin | null>(null);

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

  React.useEffect(() => {
    angleMeasurementsMouseControlRef.current = angleMeasurementsMouseControl;

    console.log("angleMeasurementsMouseControl", angleMeasurementsMouseControl);
  }, [angleMeasurementsMouseControl]);

  React.useEffect(() => {
    modeRef.current = mode; // Update ref whenever mode changes
    console.log("mode", mode);
  }, [mode]);

  const [selectedObject, setSelectedObject] = React.useState(null);

  React.useEffect(() => {
    console.log("selectedObject", selectedObject);
  }, [selectedObject]);

  React.useEffect(() => {
    // modeRef.current = mode; // Update ref whenever mode changes

    distanceMeasurementsMouseControlRef.current =
      distanceMeasurementsMouseControl;
    console.log(
      "distanceMeasurementsMouseControl",
      distanceMeasurementsMouseControl,
    );
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
  // const { count, inc } = useStore()
  console.log("canvasColor", canvasColor, changeColor);

  const { isOpen, openModal, closeModal } = useModalState();

  function onAddAnnotation(coords, pickResult) {
    openModal();
    console.log("onAddAnnotation", coords, pickResult);
    if (!annotationPlugin) return;

    // annotationPlugin.createAnnotation({
    //   id: "myAnnotation",
    //   pickResult: pickResult,
    //   occludable: true,
    //   markerShown: true,
    //   labelShown: true,
    //   values: {
    //     glyph: "A",
    //     title: "My annotation",
    //     description: "My description",
    //   },
    // });

    // closeModal();
  }

  const viewerClickData = React.useRef({
    coords: null,
    pickResult: null,
  });

  function onAddDistanceMeasurement() {
    const distMsRef = distanceMeasurementsMouseControlRef.current;

    if (!distMsRef) return;

    console.log("ddddd", distMsRef);

    distMsRef.snapping = true;

    distMsRef.activate();
  }

  function onAddAngleMeasurement() {
    const anglMsRef = angleMeasurementsMouseControlRef.current;

    if (!anglMsRef) return;

    console.log("anglMsRef", anglMsRef);

    anglMsRef.snapping = true;

    anglMsRef.activate();
  }

  function onDeactivateDistanceMeasurementMouseControl() {
    const distMsRef = distanceMeasurementsMouseControlRef.current;

    if (!distMsRef) return;

    distMsRef.snapping = false;

    distMsRef.deactivate();
  }

  function onDeactivateAngleMeasurementMouseControl() {
    const anglMsRef = angleMeasurementsMouseControlRef.current;

    if (!anglMsRef) return;

    anglMsRef.snapping = false;

    anglMsRef.deactivate();
  }

  function onViewerClick(coords, pickResult) {
    viewerClickData.current.coords = coords;
    viewerClickData.current.pickResult = pickResult;
    console.log("onViewerClick", mode);
    console.log("onViewerClick - Current mode:", modeRef.current);

    const currentMode = modeRef.current;

    if (currentMode === "point") {
      onAddAnnotation(coords, pickResult);
      console.log("point");
    }

    if (currentMode === "line") {
      console.log("line");
    }

    if (currentMode === "distance") {
      console.log("distance");
      onAddDistanceMeasurement();
    }

    if (currentMode === "angle") {
      console.log("angle");
      // onAddDistanceMeasurement();
      onAddAngleMeasurement();
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
      console.log("document", document);

      const viewer = new XEOViewer({
        canvasId: "myCanvas",
        transparent: true,
      });

      // 2
      // viewer.scene.camera.eye = [-2.56, 8.38, 8.27];
      // viewer.scene.camera.look = [13.44, 3.31, -14.83];
      // viewer.scene.camera.up = [0.1, 0.98, -0.14];

      console.log("eye", viewer.scene.camera.eye);
      console.log("look", viewer.scene.camera.look);
      console.log("up", viewer.scene.camera.up);

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

      console.log("viewerb4", viewer);
      if (!window.viewer) {
        window.viewer = viewer;
      }
      if (!viewerRef.current) {
        viewerRef.current = viewer;
      }
      if (!viewerState) {
        setViewerState(viewer);
      }
      console.log("viewera4", viewer);

      function ondddd() {
        console.log("dddd");
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

      setDistanceMeasurementsMouseControl(distanceMeasurementsMouseControl);

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

      setAngleMeasurementsPlugin(angleMeasurementsPlugin);

      angleMeasurementsPlugin.on("measurementStart", (angleMeasurement) => {
        console.log("measurementStart");
        console.log("origin", angleMeasurement.origin.entity);
        console.log("corner", angleMeasurement.corner.entity);
        console.log("target", angleMeasurement.target.entity);
      });

      angleMeasurementsPlugin.on("measurementEnd", (angleMeasurement) => {
        console.log("measurementEnd");
        console.log("origin", angleMeasurement.origin.entity);
        console.log("corner", angleMeasurement.corner.entity);
        console.log("target", angleMeasurement.target.entity);
      });

      angleMeasurementsPlugin.on("measurementCancel", (angleMeasurement) => {
        console.log("measurementCancel");
        console.log("origin", angleMeasurement.origin.entity);
        console.log("corner", angleMeasurement.corner.entity);
        console.log("target", angleMeasurement.target.entity);
      });

      const angleMeasurementsMouseControl = new AngleMeasurementsMouseControl(
        angleMeasurementsPlugin,
        {
          pointerLens: new PointerLens(viewer),
        },
      );

      setAngleMeasurementsMouseControl(angleMeasurementsMouseControl);

      angleMeasurementsPlugin.on("mouseOver", (e) => {
        // alert("mouseOver");
        if (endMeasurementEdit) {
          return;
        }
        e.angleMeasurement.setHighlighted(true);
      });

      // mouse click

      angleMeasurementsPlugin.on("mouseClick", (e) => {
        alert("mouseClick");
        if (endMeasurementEdit) {
          return;
        }
        e.angleMeasurement.setHighlighted(true);
      });

      angleMeasurementsPlugin.on("mouseLeave", (e) => {
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

      angleMeasurementsPlugin.on("contextMenu", (e) => {
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

      // distanceMeasurementsMouseControl.snapping = true;

      // distanceMeasurementsMouseControl.activate();

      //------------------------------------------------------------------------------------------------------------------
      // Create a context menu to delete and configure measurements
      //------------------------------------------------------------------------------------------------------------------

      // let endMeasurementEdit = null;

      // const distanceMeasurementsContextMenu = new ContextMenu({
      //   items: [
      //     [
      //       {
      //         title: "Clear",
      //         doAction: function (context) {
      //           context.distanceMeasurement.destroy();
      //         },
      //       },
      //       {
      //         getTitle: (context) => {
      //           return context.distanceMeasurement.axisVisible
      //             ? "Hide Axis"
      //             : "Show Axis";
      //         },
      //         doAction: function (context) {
      //           context.distanceMeasurement.axisVisible =
      //             !context.distanceMeasurement.axisVisible;
      //         },
      //       },
      //       {
      //         getTitle: (context) => {
      //           return context.distanceMeasurement.xLabelEnabled &&
      //             context.distanceMeasurement.labelsVisible
      //             ? "Disable X Label"
      //             : "Enable X Label";
      //         },
      //         doAction: function (context) {
      //           context.distanceMeasurement.xLabelEnabled =
      //             !context.distanceMeasurement.xLabelEnabled;
      //         },
      //       },
      //       {
      //         getTitle: (context) => {
      //           return context.distanceMeasurement.yLabelEnabled &&
      //             context.distanceMeasurement.labelsVisible
      //             ? "Disable Y Label"
      //             : "Enable Y Label";
      //         },
      //         doAction: function (context) {
      //           context.distanceMeasurement.yLabelEnabled =
      //             !context.distanceMeasurement.yLabelEnabled;
      //         },
      //       },
      //       {
      //         getTitle: (context) => {
      //           return context.distanceMeasurement.zLabelEnabled &&
      //             context.distanceMeasurement.labelsVisible
      //             ? "Disable Z Label"
      //             : "Enable Z Label";
      //         },
      //         doAction: function (context) {
      //           context.distanceMeasurement.zLabelEnabled =
      //             !context.distanceMeasurement.zLabelEnabled;
      //         },
      //       },
      //       {
      //         getTitle: (context) => {
      //           return context.distanceMeasurement.lengthLabelEnabled &&
      //             context.distanceMeasurement.labelsVisible
      //             ? "Disable Length Label"
      //             : "Enable Length Label";
      //         },
      //         doAction: function (context) {
      //           context.distanceMeasurement.lengthLabelEnabled =
      //             !context.distanceMeasurement.lengthLabelEnabled;
      //         },
      //       },
      //       {
      //         getTitle: (context) => {
      //           return context.distanceMeasurement.labelsVisible
      //             ? "Hide All Labels"
      //             : "Show All Labels";
      //         },
      //         doAction: function (context) {
      //           context.distanceMeasurement.labelsVisible =
      //             !context.distanceMeasurement.labelsVisible;
      //         },
      //       },
      //       // {
      //       //     title: "Edit",
      //       //     doAction: function (context) {
      //       //         distanceMeasurementsMouseControl.deactivate();
      //       //         const measurement = context.distanceMeasurement;
      //       //         const edit = new DistanceMeasurementEditMouseControl(measurement, {
      //       //             pointerLens: new PointerLens(viewer),
      //       //             snapping: true
      //       //         });
      //       //         edit.on("edited", () => console.log("edited", measurement.id));
      //       //         endMeasurementEdit = () => {
      //       //             edit.deactivate();
      //       //             endMeasurementEdit = null;
      //       //         };
      //       //     }
      //       // }
      //     ],
      //     [
      //       {
      //         title: "Clear All",
      //         getEnabled: function (context) {
      //           return (
      //             Object.keys(context.distanceMeasurementsPlugin.measurements)
      //               .length > 0
      //           );
      //         },
      //         doAction: function (context) {
      //           context.distanceMeasurementsPlugin.clear();
      //         },
      //       },
      //       {
      //         getTitle: () => {
      //           return "Cancel Measurement";
      //         },
      //         doAction: function () {
      //           distanceMeasurementsMouseControl.reset();
      //         },
      //       },
      //     ],
      //   ],
      // });

      // distanceMeasurementsContextMenu.on("hidden", () => {
      //   if (distanceMeasurementsContextMenu.context.distanceMeasurement) {
      //     distanceMeasurementsContextMenu.context.distanceMeasurement.setHighlighted(
      //       false
      //     );
      //   }
      // });

      console.log("annotations", annotations);

      // const annotation = annotations.createAnnotation({
      //   id: "myAnnotation" + i,
      //   pickResult: pickResult, // <<------- initializes worldPos and entity from PickResult
      //   occludable: true, // Optional, default is true
      //   markerShown: true, // Optional, default is true
      //   labelShown: true, // Optional, default is true
      //   values: {
      //     // HTML template values
      //     glyph: "A" + i,
      //     title: "My annotation " + i,
      //     description: "My description " + i,
      //   },
      //   markerElementId: "myMarkerElement",
      //   markerHTML: "<div class='annotation-marker'>{{glyph}}</div>",
      // });

      // annotations.on("markerClicked", (annotation) => {
      //   annotation.labelShown = !annotation.labelShown;
      // });

      //------------------------------------------------------------------------------------------------------------------
      // Use the AnnotationsPlugin to create an annotation wherever we click on an object
      //------------------------------------------------------------------------------------------------------------------

      var i = 1;

      let editedAnnotation = null;

      viewer.scene.input.on("mouseclicked", (coords) => {
        console.log("no pick result", coords);
        const pickResult = viewer.scene.pick({
          canvasPos: coords,
          pickSurface: true, // <<------ This causes picking to find the intersection point on the entity
        });

        if (!pickResult) {
          console.log("no pick result", coords);
        }

        // console.log("coords", coords);
        // console.log("pickResult", pickResult);

        if (pickResult) {
          console.log("CLICK", coords, pickResult);
          onViewerClick(coords, pickResult);
          // if (annotationMode) {
          //   onAddAnnotation(coords, pickResult);
          //   if (editedAnnotation) {
          //     editedAnnotation.setFromPickResult(pickResult);
          //     editedAnnotation.setField("markerBGColor", "red");
          //     editedAnnotation = null;
          //     return;
          //   }
          //       const annotation = annotations.createAnnotation({
          //         id: "myAnnotation" + i,
          //         pickResult: pickResult, // <<------- initializes worldPos and entity from PickResult
          //         occludable: true, // Optional, default is true
          //         markerShown: true, // Optional, default is true
          //         labelShown: true, // Optional, default is true
          //         values: {
          //           // HTML template values
          //           glyph: "A" + i,
          //           title: "My annotation " + i,
          //           description: "My description " + i,
          //         },
          //         markerHTML: "<div class='bg-red-300'>{{glyph}}</div>",
          //         labelHTML:
          //           "<div class='annotation-label' style='background-color: {{labelBGColor}};'>\
          //  <div class='annotation-title'>{{title}}</div>\
          //  <div class='annotation-desc'>{{description}}</div>\
          //  <br><img alt='myImage' width='150px' height='100px' src='{{imageSrc}}'>\
          //  </div>",
          //       });
          //       i++;
        }
      });

      annotations.on("contextmenu", (annotation) => {
        // Initiate annotation's position change
        editedAnnotation = annotation;
        editedAnnotation.setField("markerBGColor", "pink");
      });

      annotations.on("markerClicked", (annotation) => {
        console.log("annotation clicked", annotation);
        setSelectedObject(annotation);
        // Initiate annotation's position change
        // editedAnnotation = annotation;
        // editedAnnotation.setField("markerBGColor", "pink");
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

      new TreeViewPlugin(viewer, {
        containerElement: document.getElementById("treeViewContainer"),
        autoExpandDepth: 3, // Initially expand the root tree node
      });

      // Add a SkyboxesPlugin
      // const skyboxesPlugin = new SkyboxesPlugin(viewer);

      // skyboxesPlugin.createLight({
      //   id: "keyLight",
      //   dir: [0.8, -0.6, -0.8],
      //   color: [1.0, 0.3, 0.3],
      //   intensity: 1.0,
      //   space: "world",
      // });

      // skyboxesPlugin.createLight({
      //   id: "fillLight",
      //   dir: [-0.8, -0.4, -0.4],
      //   color: [0.3, 1.0, 0.3],
      //   intensity: 1.0,
      //   space: "world",
      // });

      // skyboxesPlugin.createDirLight({
      //   id: "rimLight",
      //   dir: [0.2, -0.8, 0.8],
      //   color: [0.6, 0.6, 0.6],
      //   intensity: 1.0,
      //   space: "world",
      // });

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

      console.log("viewer", viewer);
      window.viewer = viewer;
    }

    initXeo();
  }, []);

  function getMeasurements() {
    if (!distanceMeasurementsPlugin) return;

    const measurements = distanceMeasurementsPlugin?.measurements;

    return measurements;

    // measurements()
    console.log("measurements", measurements, measurementsArray);

    // destroy all measurements
    // distanceMeasurementsPlugin.clear();
  }

  function destroyMeasurement(id: string) {
    if (!distanceMeasurementsPlugin || !id) return;

    distanceMeasurementsPlugin.destroyMeasurement(id);
  }

  function destroyAllMeasurements() {
    const measurements = getMeasurements();
    const measurementsArray = Object.values(measurements);
    measurementsArray.forEach((measurement) => {
      destroyMeasurement(measurement.id);
    });
  }

  const [measurements, setMeasurements] = React.useState(
    distanceMeasurementsPlugin?.measurements,
  );

  React.useEffect(() => {
    console.log(
      "distanceMeasurementsPlugin.measurements",
      distanceMeasurementsPlugin?.measurements,
    );
    setMeasurements(distanceMeasurementsPlugin?.measurements);
  }, [distanceMeasurementsPlugin?.measurements]);

  function getSceneObjects() {
    const sceneObjects = window.viewer.scene.objects;
    console.log("sceneObjects", sceneObjects);
    Object.values(sceneObjects).forEach((sceneObject) => {
      console.log("sceneObject", sceneObject);
      sceneObject.visible = !sceneObject.visible;
    });
    return sceneObjects;
  }

  const [sceneObjects, setSceneObjects] = React.useState(null);

  function getSceneObjects() {
    if (!window.viewer) return;

    const sceneObjects = window.viewer.scene.objects;
    // console.log("sceneObjects", sceneObjects);
    Object.values(sceneObjects).forEach((sceneObject) => {
      console.log("sceneObject", sceneObject);
      sceneObject.visible = !sceneObject.visible;
    });
    return sceneObjects;
  }

  // React.useEffect(() => {
  //   console.log("sceneObjects", sceneObjects);
  //   setSceneObjects(viewerRef.current?.scene.objects);
  // }, [viewerRef?.current?.scene?.objects]);

  React.useEffect(() => {
    if (!viewerState) return;
    console.log("viewerState", viewerState);
    // wait for the scene to load
    setTimeout(() => {
      console.log("sceneObjects", viewerState?.scene?.objects);
      setSceneObjects(viewerState?.scene?.objects);
    }, 3000);

    // console.log("sceneObjects", viewerState?.scene?.objects);
    // setSceneObjects(viewerState?.scene?.objects);
  }, [viewerState]);

  // function takeScreenshot(canvasElement) {
  //   var tempCanvas = document.createElement("canvas");
  //   tempCanvas.width = canvasElement.offsetWidth;
  //   tempCanvas.height = canvasElement.offsetHeight;
  //   var tempCtx = tempCanvas.getContext("2d");
  //   tempCtx.drawImage(canvasElement, 0, 0);
  //   var dataURL = tempCanvas.toDataURL(); // Get data URL of the screenshot
  //   var image = new Image();
  //   image.src = dataURL;
  //   var newWindow = window.open();
  //   newWindow.document.write('<img src="' + dataURL + '"/>'); // Open the screenshot in a new window
  // }
  // function takeScreenshot(canvasElement) {
  //   var tempCanvas = document.createElement("canvas");
  //   tempCanvas.width = canvasElement.offsetWidth;
  //   tempCanvas.height = canvasElement.offsetHeight;
  //   var tempCtx = tempCanvas.getContext("2d");

  //   // Apply the background color to the temporary canvas
  //   var computedStyle = window.getComputedStyle(canvasElement);
  //   tempCtx.fillStyle = computedStyle.backgroundColor;
  //   tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  //   // Draw the content of the original canvas onto the temporary canvas
  //   tempCtx.drawImage(canvasElement, 0, 0);

  //   // Get data URL of the screenshot
  //   var dataURL = tempCanvas.toDataURL();

  //   // Display the screenshot in a new window
  //   var newWindow = window.open();
  //   newWindow.document.write('<img src="' + dataURL + '"/>');
  // }

  function takeScreenshot(canvasElement) {
    var tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvasElement.offsetWidth;
    tempCanvas.height = canvasElement.offsetHeight;
    var tempCtx = tempCanvas.getContext("2d");

    // Apply the background color to the temporary canvas
    var computedStyle = window.getComputedStyle(canvasElement);
    tempCtx.fillStyle = computedStyle.backgroundColor;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the content of the original canvas onto the temporary canvas
    tempCtx.drawImage(canvasElement, 0, 0);

    // Convert the canvas to data URL
    var dataURL = tempCanvas.toDataURL();

    // Create a link element
    var downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "construction_site_screenshot.png"; // Set a default filename or customize as needed
    downloadLink.textContent = "Download Image";

    // Append the link to the document body
    document.body.appendChild(downloadLink);

    // Trigger the download
    downloadLink.click();

    // Clean up: remove the link element from the DOM
    document.body.removeChild(downloadLink);
  }

  // Function to capture and download screenshot
  function captureScreenshot() {
    // console.log("captureScreenshot", viewerRef.current);
    if (!viewerRef.current) {
      return;
    }

    const vier = viewerRef.current;

    // const viewerElem = potreeContainerDiv.current;
    console.log("captureScreenshot", vier.scene);
    const canvas = vier.scene.canvas.canvas;

    console.log("canvas", canvas);

    takeScreenshot(canvas);

    // if (canvas) {
    //   const image = canvas
    //     .toDataURL("image/png")
    //     .replace("image/png", "image/octet-stream");
    //   const link = document.createElement("a");
    //   link.href = image;
    //   link.download = "construction_site_screenshot.png";
    //   link.click();
    // }
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
      console.log("zoom out", viewer.camera);
      const cLook = viewer.camera.eye;
      const cEye = viewer.camera.eye;
      const cUp = viewer.camera.up;

      console.log("cLook", cLook);
      viewer.camera.look = [cLook[0] + 5, cLook[1] + 5, cLook[2] + 5];
      // viewer.camera.zoom(2);
      // viewer.controls.radiusDelta = 3; // Adjust this value as needed
    }
  }

  const [settingsDialogOpen, setSettingsDialogOpen] = React.useState(false);

  function onRender() {
    setRenderIndex((currentIndex) => currentIndex + 1);
  }

  return (
    <>
      <div className="relative h-screen w-screen">
        {/* top bar */}
        <Topbar />
        {/* <div className="absolute bottom-4 right-4 z-20 h-full">
          <Button onClick={getSceneObjects}>
            <span className="flex items-center gap-x-2">
              <span>Share</span>
            </span>
          </Button>
        </div> */}
        {/* <button onClick={onLoadPointCloud} className="bg-white absolute z-20 top-0 left-0 w-fit p-1 rounded">load point cloud</button> */}
        {/* <button onClick={onCameraFlight} className="bg-white absolute z-20 top-10 left-0 w-fit p-1 rounded">onCameraFlight</button> */}
        {/* <input type="checkbox" id="info-button" /> */}
        <div className="relative h-full w-full">
          <label htmlFor="info-button" className="info-button">
            <i className="far fa-3x fa-question-circle"></i>
          </label>
          <div className="absolute bottom-0 left-0 z-20 h-full w-full max-w-sm bg-background p-4 px-2 text-foreground dark:bg-[#303030]">
            <div className="relative bg-red-300">
              <div className="z-90 absolute left-full top-[47rem] ml-8 flex flex-col gap-x-1 overflow-hidden rounded-lg bg-transparent">
                {/* <div className="absolute rounded flex gap-x-1 bottom-0 left-4 z-20"> */}
                <div className="flex gap-x-2">
                  <div className="rounded-lg bg-blue-400/40 p-1.5 text-white">
                    <span>3D</span>
                  </div>

                  <div className="flex gap-x-1 rounded-l-lg bg-[#303030] px-1">
                    <CustomDialog
                      title="Settings"
                      open={settingsDialogOpen}
                      onClose={() => setSettingsDialogOpen(false)}
                      triggerButton={
                        <IconButton
                          size="xs"
                          onClick={() => setSettingsDialogOpen(true)}
                          className="bg-[#303030] text-white"
                          variant="material"
                        >
                          <SettingsIcon />
                        </IconButton>
                      }
                    >
                      <div className="flex flex-col gap-y-7">
                        <div className="grid grid-cols-5">
                          <div className="col-span-2">
                            <p className="">Background Color</p>
                          </div>
                          {/* bg-foreground-muted-dark p-1.5 rounded */}
                          <div className="col-span-3 grid grid-cols-5 gap-y-2">
                            {CANVAS_COLORS.map((color) => (
                              <button
                                key={color}
                                className={cn(
                                  "inline-flex h-8 w-8 items-center justify-center rounded-full",
                                  {
                                    "border-2 border-foreground":
                                      canvasColor === color,
                                    "border-foreground":
                                      canvasColor === "#f8f8f8",
                                  },
                                )}
                                style={{ backgroundColor: color }}
                                onClick={() => changeColor(color)}
                              >
                                <CheckIcon
                                  className={cn(
                                    "hidden w-4 text-background dark:text-foreground",
                                    {
                                      inline: canvasColor === color,
                                      "text-foreground dark:text-background":
                                        canvasColor === "#f8f8f8",
                                    },
                                  )}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p>Point Size</p>
                          <div></div>
                        </div>
                        <div className="grid grid-cols-5">
                          <div className="col-span-2">
                            <p>Camera Mode</p>
                          </div>
                          <div className="col-span-3 flex flex-wrap gap-2">
                            {/* cameraControl.navMode = "orbit";
                              cameraControl.followPointer = true;  */}
                            {/* cameraControl.navMode = "firstPerson"; */}
                            {/* cameraControl.navMode = "planView"; */}
                            {[
                              { title: "Orbit", mode: "orbit" },
                              { title: "First Person", mode: "firstPerson" },
                              { title: "Plan View", mode: "planView" },
                            ].map((cameraMode) => (
                              <Button
                                key={cameraMode.mode}
                                onClick={() => {
                                  if (!viewerState) return;
                                  viewerState.cameraControl.navMode =
                                    cameraMode.mode;

                                  toast.success(
                                    `Camera mode changed: ${cameraMode.title}`,
                                  );
                                }}
                                variant="material"
                              >
                                {cameraMode.title}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CustomDialog>
                    <IconButton
                      size="xs"
                      onClick={() => captureScreenshot()}
                      className="bg-[#303030] text-white"
                      variant="material"
                    >
                      <CameraIcon className="h-5 w-5" />
                    </IconButton>
                    {/* <IconButton
                      size="xs"
                      onClick={() => onZoomIn()}
                      className="bg-[#303030] text-white"
                      variant="material"
                    >
                      <ZoomIn className="h-5 w-5" />
                    </IconButton>
                    <IconButton
                      size="xs"
                      onClick={() => onZoomOut()}
                      className="bg-[#303030] text-white"
                      variant="material"
                    >
                      <ZoomOut className="h-5 w-5" />
                    </IconButton> */}
                  </div>
                </div>
              </div>
            </div>
            {/* top */}
            <div className="h-full space-y-4 overflow-auto">
              <div className="flex items-center gap-x-2 pl-4">
                <div>
                  <LayersIcon />
                </div>
                <h1 className="text-lg font-semibold">Layers</h1>
              </div>
              {/* <h2 className="text-base">
                  Loading a lidar point cloud with 31M colored points from LAS
                  format
              </h2> */}

              {/* measurements */}
              <div className="space-y-3">
                {annotationPlugin && (
                  <AnnoatationsPanel
                    annotationsData={annotationPlugin.annotations}
                    annotationPlugin={annotationPlugin}
                  />
                )}
                {distanceMeasurementsPlugin && (
                  <MeasurementsPanel
                    measurementsData={distanceMeasurementsPlugin.measurements}
                    distanceMeasurementsPluginW={distanceMeasurementsPlugin}
                  />
                )}
                {window.viewer && (
                  <OutputObjectsPanel
                    ObjectsData={window?.viewer?.scene}
                    viewer={viewerState}
                  />
                )}
              </div>
            </div>
            {/* <div>
              {distanceMeasurementsPlugin && (
                <MeasurementsPanel
                  measurementsData={distanceMeasurementsPlugin.measurements}
                  distanceMeasurementsPluginW={distanceMeasurementsPlugin}
                />
              )}
            </div> */}
          </div>
          {/* <div className="absolute bg-background rounded-lg overflow-hidden w-9 flex flex-col gap-x-1 top-4 right-[25rem] z-20">
            {modeButtons.map((modeButton) => (
              <Button
                title={modeButton.title}
                // className="bg-blue-500 text-white"
                size="icon"
                className={cn("rounded-none w-full h-9", {
                  "bg-blue text-background dark:text-foreground":
                    mode === modeButton.mode,
                  // "bg-transparent": mode !== modeButton.mode,
                })}
                onClick={() => {
                  if (mode === "distance") {
                    onDeactivateDistanceMeasurementMouseControl();
                  }
                  if (modeButton.mode === mode) {
                    setMode((currentMode) => {
                      // if (currentMode === "distance") {
                      //   onDeactivateDistanceMeasurementMouseControl();
                      // }
                      return "view";
                    });
                  } else {
                    setMode(modeButton.mode);
                  }
                }}
              >
                {modeButton.icon}
              </Button>
            ))}
          </div> */}
          <CustomDialog
            title="Add Annotation"
            description="Add annotation to the point cloud"
            open={isOpen}
            triggerButton={null}
            onClose={closeModal}
            className="w-full"
            icon={<AnnotationIcon className="h-5 w-5 text-foreground" />}
          >
            <AnnotationForm
              onSubmit={(title, description) => {
                onCreateAnnotation(title, description);
              }}
            />
          </CustomDialog>
          {/* <AnnotationCardFormDialog /> */}
          <canvas
            id="myCanvas"
            className={`h-full w-full`}
            style={{ backgroundColor: canvasColor ?? DEFAULT_CANVAS_COLOR }}
          ></canvas>
          {/* <div id="myMarkerElement" className="bg-red-300 w-20 h-32 p-2"></div>
          <div id="myLabelElement" className="bg-red-300 w-20 h-32 p-2"></div> */}
          {/* <div id="treeViewContainer"></div> */}
          <div className="slideout-sidebar absolute bottom-0 right-0 top-0 w-full max-w-sm bg-background px-4 py-4 text-foreground dark:bg-[#303030]">
            <div className="relative">
              {/* {JSON.stringify(sceneObjects)} */}
              {selectedObject && (
                <div className="space-y-10">
                  {/* <h1>{selectedObject.id}</h1> */}
                  <Typography variant="lg/medium">
                    Annotation: {selectedObject.id}
                  </Typography>
                  <div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();

                        console.log("selectedObject", selectedObject);
                        selectedObject.setValues({
                          title: e.target.title.value,
                          description: e.target.description.value,
                        });

                        setRenderIndex((currentIndex) => currentIndex + 1);

                        toast.success("Annotation updated successfully");
                        setSelectedObject(null);
                        console.log("selectedObject", selectedObject);
                      }}
                      className="flex flex-col gap-y-5"
                    >
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          name="title"
                          type="text"
                          inputMode="text"
                          defaultValue={selectedObject.getValues().title}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          name="description"
                          defaultValue={selectedObject.getValues().description}
                          className="text-sm lg:py-2"
                        />
                        {/* <Input
                        name="description"
                        type="text"
                        inputMode="text"
                        defaultValue={selectedObject.getValues().description}
                      /> */}
                      </div>

                      <div className="flex justify-end">
                        <Button
                          // onClick={() => onLookCamera(selectedObject)}
                          /**
                           * Sets values for multiple placeholders within the Annotation's HTML templates for marker and label.
                           *
                           * See {@link AnnotationsPlugin} for more info.
                           *
                           * @param {{String:(String|Number)}} values Map of field values.
                           */
                          // setValues(values) {
                          //   for (var key in values) {
                          //     if (values.hasOwnProperty(key)) {
                          //       const value = values[key];
                          //       this.setField(key, value);
                          //     }
                          //   }
                          // }
                          type="submit"
                          // onClick={() => {
                          //   console.log("selectedObject", selectedObject);
                          //   selectedObject.setValues({
                          //     title: "My new title",
                          //     description: "My new description",
                          //   });

                          //   setRenderIndex((currentIndex) => currentIndex + 1);
                          // }}
                          size="sm"
                        >
                          save
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
            {/* <div className="relative right-full top-full h-fit bg-red-200">
              <div className="absolute">
                <Accordion type="single" collapsible className="h-full w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Customize points</AccordionTrigger>
                    <AccordionContent>
                      <div id="myDatGuiContainer"></div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div> */}
            <div className="absolute -left-14 right-full top-12 z-20 mr-8 flex w-[34px] flex-col gap-x-1 overflow-hidden rounded-2xl bg-background">
              {modeButtons.map((modeButton) => (
                <IconButton
                  key={modeButton.mode}
                  title={modeButton.title}
                  variant={mode === modeButton.mode ? "primary" : "material"}
                  className={cn(
                    "focus:ring-none h-9 w-full rounded-none border-none ring-0 focus:border-none",
                    "bg-[#303030]",
                  )}
                  onClick={() => {
                    if (mode === "distance") {
                      onDeactivateDistanceMeasurementMouseControl();
                    }

                    if (mode === "angle") {
                      onDeactivateAngleMeasurementMouseControl();
                    }

                    if (modeButton.mode === mode) {
                      setMode("view");
                    } else {
                      setMode(modeButton.mode);
                    }
                  }}
                >
                  {modeButton.icon}
                </IconButton>
              ))}
            </div>
            {/* <div className="relative bg-red-300">
              <div className="absolute right-full top-4 z-20 mr-8 flex w-9 flex-col gap-x-1 overflow-hidden rounded-lg bg-background">
                {modeButtons.map((modeButton) => (
                  <IconButton
                    title={modeButton.title}
                    variant={mode === modeButton.mode ? "primary" : "outline"}
                    className={cn(
                      "focus:ring-none h-9 w-full rounded-none border-none focus:border-none",
                    )}
                    onClick={() => {
                      if (mode === "distance") {
                        onDeactivateDistanceMeasurementMouseControl();
                      }

                      if (mode === "angle") {
                        onDeactivateAngleMeasurementMouseControl();
                      }

                      if (modeButton.mode === mode) {
                        setMode("view");
                      } else {
                        setMode(modeButton.mode);
                      }
                    }}
                  >
                    {modeButton.icon}
                  </IconButton>
                ))}
              </div>
            </div> */}
            {/* <img className="info-icon" src="../../assets/images/laserScan.png" /> */}
            {/* <h1>LASLoaderPlugin</h1>
            <h2>
              Loading a lidar point cloud with 31M colored points from LAS
              format
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
            </ul> */}
          </div>
        </div>
      </div>
    </>
  );
}

function MeasurementsPanel({ measurementsData, distanceMeasurementsPluginW }) {
  const [measurements, setMeasurements] = React.useState(measurementsData);

  const [showContent, setShowContent] = React.useState(true);

  console.log("measurementsData", measurementsData);

  function destroyMeasurement(id: string) {
    if (!distanceMeasurementsPluginW || !id) return;

    distanceMeasurementsPluginW.destroyMeasurement(id);
  }

  function onRemoveMeasumenet(id) {
    destroyMeasurement(id);
    setMeasurements((currentMeasurements) => {
      const newMeasurements = { ...currentMeasurements };
      delete newMeasurements[id];
      return newMeasurements;
    });
  }

  console.log("measurements", measurements);

  function onHideMeasurement(id: string) {
    distanceMeasurementsPluginW.measurements[id].visible = false;
  }

  function onShowMeasurement(id: string) {
    distanceMeasurementsPluginW.measurements[id].visible = true;
  }

  function getMeasurementVisibility(id: string) {
    return distanceMeasurementsPluginW.measurements[id].visible;
  }

  // console.log("window.viewer", window.viewer);

  function onLookCamera(measurement) {
    // measurement.originWorld

    // const origin = measurement.originWorld;
    const origin = measurement.targetWorld;

    // window.viewer.camera.look = origin;
    window.viewer.camera.eye = origin;

    // window.viewer.cameraFlight.flyTo({
    //   look: origin,
    //   // eye: [origin[0], origin[1], origin[2] + 10],
    //   // look: [origin[0], origin[1], origin[2] + 10],
    //   // up: [0, 0, 1],
    //   // duration: 1,
    // });
  }

  return (
    <div className="">
      <div className="space-y-2.5">
        <div className="flex items-center gap-x-1">
          <button type="button" onClick={() => setShowContent((p) => !p)}>
            <ChevronRightIcon
              className={`w-5 ${showContent ? "rotate-90" : ""}`}
            />
          </button>
          <input
            type="checkbox"
            checked={true}
            // all objects visible
            // defaultChecked={Object.values(objects).every(
            //   (object) => object.visible
            // )}
            // onChange={(v) => {
            //   const checked = v.target.checked;
            //   if (checked) {
            //     onShowAllObjects();
            //   } else {
            //     onHideAllObjects();
            //   }
            // }}
          />
          <DistanceIcon className="h-5 w-5" />
          <Typography as="p" variant="base/medium">
            Measurements
          </Typography>
        </div>
        {showContent &&
          measurements &&
          Object.values(measurements).map((measurement, index) => (
            <div
              key={measurement?.id}
              className="ml-2.5 flex items-center justify-between border-l-2 pl-6"
            >
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  // defaultChecked={
                  //   annotationPlugin.annotations[annotation.id].visible
                  // }
                  // checked={true}
                  defaultChecked={
                    distanceMeasurementsPluginW.measurements[measurement?.id]
                      .visible
                  }
                  onChange={(v) => {
                    console.log("v", v);
                    const checked = v.target.checked;
                    if (checked) {
                      onShowMeasurement(measurement.id);
                    } else {
                      onHideMeasurement(measurement.id);
                    }
                  }}
                  // defaultChecked={true}
                />
                <DistanceIcon className="w-4" />
                <Typography as="p" variant="base/medium">
                  Measurement
                  {index !== 0 ? index : ""}
                  {/* {measurement.id} */}
                </Typography>
              </div>
              {/* <Button size="icon" variant="ghost">
                <TrashIcon className="w-4 h-4 fill-current" />
              </Button> */}
              <div className="space-x-2">
                {/* <Button
                onClick={() => {
                  setLabel(annotation, !annotation.labelShown, annotation.id);
                }}
                size="icon"
                variant="outline"
              >
                <EyeIcon className="h-4 w-4 fill-current" />
              </Button> */}

                <Button
                  onClick={() => {
                    onRemoveMeasumenet(measurement?.id);
                  }}
                  size="icon"
                  variant="outline"
                >
                  <TrashIcon className="h-4 w-4 fill-current" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function OutputObjectsPanel({ objectsData, viewer }) {
  const [objects, setObjects] = React.useState(viewer?.scene?.objects);

  function onHideObject(id: string) {
    window.viewer.scene.objects[id].visible = false;
  }

  function onShowObject(id: string) {
    window.viewer.scene.objects[id].visible = true;
  }

  function getObjectVisibility(id: string) {
    return window.viewer.scene.objects[id].visible;
  }

  console.log("window.viewer", window.viewer);

  function onLookCamera(object) {
    // measurement.originWorld

    // const origin = measurement.originWorld;
    const origin = object.targetWorld;

    // window.viewer.camera.look = origin;
    window.viewer.camera.eye = origin;

    // window.viewer.cameraFlight.flyTo({
    //   look: origin,
    //   // eye: [origin[0], origin[1], origin[2] + 10],
    //   // look: [origin[0], origin[1], origin[2] + 10],
    //   // up: [0, 0, 1],
    //   // duration: 1,
    // });
  }

  const [showContent, setShowContent] = React.useState(true);

  function onHideAllObjects() {
    Object.values(viewer.scene.objects).forEach((object) => {
      object.visible = false;
    });
  }

  function onShowAllObjects() {
    Object.values(viewer.scene.objects).forEach((object) => {
      object.visible = true;
    });
  }

  return (
    <div className="">
      <div className="space-y-2.5">
        <div className="flex items-center gap-x-1">
          <button type="button" onClick={() => setShowContent((p) => !p)}>
            <ChevronRightIcon
              className={`w-5 ${showContent ? "rotate-90" : ""}`}
            />
          </button>
          <input
            type="checkbox"
            // all objects visible
            defaultChecked={
              objects
                ? Object.values(objects).every((object) => object.visible)
                : null
            }
            onChange={(v) => {
              const checked = v.target.checked;
              if (checked) {
                onShowAllObjects();
              } else {
                onHideAllObjects();
              }
            }}
          />
          <OutputObjectIcon />
          <Typography as="p" variant="base/medium">
            Outputs
          </Typography>
        </div>
        {showContent &&
          objects &&
          Object.values(objects).map((object, index) => (
            <div
              key={object.id}
              className="ml-2.5 flex items-center justify-between border-l-2 pl-6"
            >
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  // defaultChecked={
                  //   distanceMeasurementsPluginW.measurements[object.id].visible
                  // }
                  defaultChecked={object.visible}
                  onChange={(v) => {
                    console.log("v", v);
                    const checked = v.target.checked;
                    if (checked) {
                      onShowObject(object.id);
                    } else {
                      onHideObject(object.id);
                    }
                  }}
                />
                <PlyIcon className="w-4" />
                <Typography as="p" variant="base/medium">
                  Object {object.id}
                  {index !== 0 ? index : ""}
                  {/* {measurement.id} */}
                </Typography>
              </div>
              {/* <Button size="icon" variant="ghost">
                  <TrashIcon className="w-4 h-4 fill-current" />
                </Button> */}
              <div className="space-x-2">
                {/* <Button
                onClick={() => {
                  onLookCamera(measurement);
                  // destroyMeasurement(measurement.id);
                }}
                size="icon"
                variant="outline"
              >

                <EyeIcon className="w-4 h-4 fill-current" />
              </Button> */}
                {/* <Button
                  onClick={() => {
                  }}
                  size="icon"
                  variant="outline"
                >
                  <TrashIcon className="w-4 h-4 fill-current" />
                </Button> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function cloneObject(obj) {
  if (obj == null || typeof obj != "object") return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

function AnnoatationsPanel({ annotationsData, annotationPlugin }) {
  const [annotations, setAnnotations] = React.useState(annotationsData);

  function onDestroyAnnotation(id: string) {
    if (!annotationPlugin || !id) return;

    annotationPlugin.destroyAnnotation(id);

    console.log("destroyAnnotation", annotationPlugin?.annotations);

    setAnnotations(cloneObject(annotationPlugin?.annotations));

    // setAnnotations((currentAnnotations) => {
    //   const newAnnotations = { ...currentAnnotations };
    //   delete newAnnotations[id];
    //   return newAnnotations;
    // });
  }

  function onRemoveMeasumenet(id) {
    destroyMeasurement(id);
    setMeasurements((currentMeasurements) => {
      const newMeasurements = { ...currentMeasurements };
      delete newMeasurements[id];
      return newMeasurements;
    });
  }

  function onHideAnnotation(id: string) {
    annotationPlugin.annotations[id].visible = false;
  }

  function onShowAnnotation(id: string) {
    console.log("onShow", annotationPlugin.annotations[id]);
    annotationPlugin.annotations[id].visible = true;
  }

  // function onUpdateAnnotation() {
  //   myAnnotation1.setValues({
  //     title: "Here's a new title",
  //     description: "Here's a new description",
  //   });
  // }

  function getAnnotationVisibility(id: string) {
    return annotationPlugin.annotations[id].visible;
  }

  // console.log("window.viewer", window.viewer);

  function onLookCamera(annotation) {
    // annotation.originWorld

    // const origin = annotation.originWorld;
    const origin = annotation.targetWorld;

    // window.viewer.camera.look = origin;
    window.viewer.camera.eye = origin;

    // window.viewer.cameraFlight.flyTo({
    //   look: origin,
    //   // eye: [origin[0], origin[1], origin[2] + 10],
    //   // look: [origin[0], origin[1], origin[2] + 10],
    //   // up: [0, 0, 1],
    //   // duration: 1,
    // });
  }

  const [showContent, setShowContent] = React.useState(true);

  // function onHideAllObjects() {
  //   Object.values(viewer.scene.objects).forEach((object) => {
  //     object.visible = false;
  //   });
  // }

  // function onShowAllObjects() {
  //   Object.values(viewer.scene.objects).forEach((object) => {
  //     object.visible = true;
  //   });
  // }

  console.log("annotations", annotations);

  function setLabel(annotation, shown, id) {
    const ann = annotationPlugin.annotations[id];
    console.log("cc", annotation.getMarkerShown());
    //   setLabelShown(shown) {
    //     shown = !!shown;
    //     if (this._labelShown === shown) {
    //         return;
    //     }
    //     this._labelShown = shown;
    //     this._visibilityDirty = true;
    // }

    annotation.setLabelShown(!ann.getMarkerShown());
  }

  return (
    <div className="">
      <div className="space-y-2.5">
        <div className="flex items-center gap-x-1">
          <button type="button" onClick={() => setShowContent((p) => !p)}>
            <ChevronRightIcon
              className={`w-5 ${showContent ? "rotate-90" : ""}`}
            />
          </button>
          <input
            type="checkbox"
            checked={true}
            // all objects visible
            // defaultChecked={Object.values(objects).every(
            //   (object) => object.visible
            // )}
            // onChange={(v) => {
            //   const checked = v.target.checked;
            //   if (checked) {
            //     onShowAllObjects();
            //   } else {
            //     onHideAllObjects();
            //   }
            // }}
          />
          <AnnotationIcon className="h-5 w-5" />
          <Typography as="p" variant="base/medium">
            Annotations
          </Typography>
        </div>
        {showContent &&
          annotations &&
          Object.values(annotations).map((annotation, index) => (
            <div
              key={annotation.id}
              className="ml-2.5 flex items-center justify-between border-l-2 pl-6"
            >
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  // defaultChecked={
                  //   annotationPlugin.annotations[annotation.id].visible
                  // }
                  checked={true}
                  // defaultChecked={true}
                />
                <PointIcon className="w-4" />
                <Typography as="p" variant="base/medium">
                  Annotation {annotation.id}
                  {index !== 0 ? index : ""}
                  {/* {measurement.id} */}
                </Typography>
              </div>
              {/* <Button size="icon" variant="ghost">
                  <TrashIcon className="w-4 h-4 fill-current" />
                </Button> */}
              <div className="space-x-2">
                {/* <Button
                  onClick={() => {
                    setLabel(annotation, !annotation.labelShown, annotation.id);
                  }}
                  size="icon"
                  variant="outline"
                >
                  <EyeIcon className="h-4 w-4 fill-current" />
                </Button> */}

                <Button
                  onClick={() => {
                    onDestroyAnnotation(annotation?.id);
                  }}
                  size="icon"
                  variant="outline"
                >
                  <TrashIcon className="h-4 w-4 fill-current" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

// #303030

function Topbar() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex h-12 w-full items-center bg-background px-4 dark:bg-[#212121]">
        <div className="flex h-full w-full items-center gap-x-4 text-sm">
          <div className="flex items-center gap-x-1">
            <img
              src="/favicon.ico"
              width={35}
              height={35}
              className="object-contain"
            />
            {/* <h1 className="font-extralight uppercase pb-0.5">
          CraneCam<span className="font-medium lowercase">cloud</span>
        </h1> */}
          </div>
          <div className="h-8 w-0.5 bg-background"></div>
          <div className="flex h-full items-center gap-x-1.5">
            <p>Construction site with IFC files</p>
            <ChevronRight className="w-5" />
            {/* <p className="font-normal inline-flex items-center gap-x-2">
            <span>
              <CalendarIcon className="w-4" />
            </span>
            {formatDate(selectedDate.date)}{" "}
          </p> */}
            <p className="inline-flex items-center gap-x-2 font-normal">
              <span>
                <CalendarIcon className="w-4" />
              </span>
              9/27/2022, 4:00 PM
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-5 pr-2">
          <ShareDialog />
          <UserMenu />
          {/* <ThemeSelect /> */}
          {/* <Button>
      <span className="flex items-center gap-x-2">
        <Share2 className="w-[17px]" />
        <span>Share</span>
      </span>
    </Button> */}
        </div>
      </div>
      <div>
        <Timeline />
      </div>
    </div>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appPaths } from "@/config/app";

function UserMenu() {
  const { data: session } = useSession();

  return session?.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="material" size="sm">
          {/* <Avatar className="mr-2 h-6 w-6">
          <AvatarImage src={generateAvatarUrl(session?.user?.name)} />
          <AvatarFallback className="mr-2 h-6 w-6 rounded-full bg-gradient-to-br from-primary-700 to-primary-500"></AvatarFallback>
        </Avatar> */}
          <UserIcon />
          <p className="ml-2 pb-0.5">{session.user.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 bg-background">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => signOut()}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <ButtonLink
      href={appPaths.login}
      variant="material"
      // leftIcon={<LogIn className="w-4" />}
      className="whitespace-nowrap"
      size="sm"
    >
      Sign in
    </ButtonLink>
  );
}

function Card({
  title,
  icon,
  className,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
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
        <Input
          type="text"
          placeholder="Title"
          // className="w-full p-2 rounded-md bg-zinc-900/10 text-zinc-100 border-zinc-800 text-white/90 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          // className="w-full p-2 rounded-md bg-zinc-900/10 text-zinc-100 border-zinc-800 text-white/90 focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex w-full justify-end">
          <Button
            //   className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
            type="button"
            variant="outline"
            className="space-x-1.5"
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

// function AnnoationFormCard() {
//   return (
//     <Card
//       title="Add Annotation"
//       icon={
//         <svg
//           width="100%"
//           height="100%"
//           fill="currentColor"
//           className="w-5 h-5"
//           viewBox="0 0 16 16"
//           xmlns="http://www.w3.org/2000/svg"
//           fit=""
//           preserveAspectRatio="xMidYMid meet"
//           focusable="false"
//         >
//           <path d="M13 2H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2l3 3 3-3h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"></path>
//         </svg>
//       }
//       className="w-full "
//     ></Card>
//   );
// }
