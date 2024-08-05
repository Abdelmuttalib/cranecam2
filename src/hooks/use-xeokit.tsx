import { useContext, createContext, useState, useEffect } from "react";
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
  ViewerConfiguration,
} from "@xeokit/xeokit-sdk";

export type XeokitContextType = {
  viewer: XEOViewer | null;
};

export const XeokitContext = createContext<XeokitContextType | null>(null);

export function useXeokit() {
  const context = useContext(XeokitContext);
  if (!context) {
    throw new Error("useXeokit must be used within a XeokitProvider");
  }

  return context;
}

type XeokitProviderProps = {
  children: React.ReactNode;
};

const ANNOTATIONS_PLUGIN_CONFIG = {
  markerHTML:
    "<div class='annotation-marker' on style='background-color: {{markerBGColor}};'><svg width='100%' height='100%' viewBox='0 0 24 24' fill='currentColor' onclick='function ddd(){console.log(dddd)}' className='w-[22px] h-[22px]' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid meet' focusable='false'><path d='M12 2a6.995 6.995 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a6.993 6.993 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z'></path></svg></div>",
  labelHTML:
    "<div class='annotation-label' style='background-color: {{labelBGColor}};'><div class='annotation-title'>{{title}}</div><div class='annotation-desc'>{{description}}</div></div>",
  // markerElementId: "myMarkerElement",
  // labelElementId: "myLabelElement",

  values: {
    markerBGColor: "black",
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
};

export function XeokitProvider({ children }: { children: React.ReactNode }) {
  const [viewer, setViewer] = useState<XEOViewer | null>(null);

  const [annotationsPlugin, setAnnotationsPlugin] =
    useState<AnnotationsPlugin | null>(null);

  const [distanceMeasurementsPlugin, setDistanceMeasurementsPlugin] =
    useState<DistanceMeasurementsPlugin | null>(null);

  const [
    distanceMeasurementsMouseControl,
    setDistanceMeasurementsMouseControl,
  ] = useState<DistanceMeasurementsMouseControl | null>(null);

  useEffect(() => {
    const viewer = new XEOViewer({
      canvasId: "xeokit-canvas",
      transparent: true,
      // transparentBackground: true,
    });

    const annotationsPlugin = new AnnotationsPlugin(
      viewer,
      ANNOTATIONS_PLUGIN_CONFIG,
    );

    setAnnotationsPlugin(annotationsPlugin);

    setViewer(viewer);

    const distanceMeasurementsPlugin = new DistanceMeasurementsPlugin(viewer);
    setDistanceMeasurementsPlugin(distanceMeasurementsPlugin);

    distanceMeasurementsPlugin.on("measurementStart", (distanceMeasurement) => {
      console.log("measurementStart");
      console.log("origin", distanceMeasurement.origin.entity);
      console.log("target", distanceMeasurement.target.entity);
    });

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

    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <XeokitContext.Provider
      value={{
        viewer,
      }}
    >
      {children}
    </XeokitContext.Provider>
  );
}
