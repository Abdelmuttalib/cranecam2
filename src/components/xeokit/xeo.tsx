// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from "react";

import { Button } from "@/components/ui/button";
import { CameraIcon, CheckIcon, ChevronRightIcon } from "lucide-react";
import {
  PointIcon,
  DistanceIcon,
  LayersIcon,
  OutputObjectIcon,
  PlyIcon,
  AnnotationIcon,
  SettingsIcon,
  TrashIcon,
} from "@/components/icons";
import CustomDialog from "../ui/animated-dialog";
import { Typography } from "@/components//ui/typography";
import { IconButton } from "../ui/icon-button";

import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {
  CANVAS_COLORS,
  DEFAULT_CANVAS_COLOR,
} from "@/stores/use-canvas-color-store";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { Label } from "../ui/label";
import { Topbar } from "./toolbar";
import { useXeokit } from "@/hooks/use-xeokit";
import { cloneObject } from "@/lib/obj";

export default function Xeo() {
  const {
    settingsDialogOpen,
    setSettingsDialogOpen,
    setRenderIndex,
    onDeactivateDistanceMeasurementMouseControl,
    distanceMeasurementsPlugin,
    mode,
    setMode,
    selectedObject,
    setSelectedObject,
    annotationPlugin,
    canvasColor,
    changeColor,
    isOpen,
    closeModal,
    modeRef,
    viewerState,
    modeButtons,
    onScreenshot,
    onDeactivateAngleMeasurementMouseControl,
    onDeactivateLinesMouseControl,
    onCreateAnnotation,
  } = useXeokit();

  return (
    <>
      <div className="relative h-screen w-screen">
        {/* top bar */}
        <Topbar />
        <div className="relative h-full w-full">
          <label htmlFor="info-button" className="info-button">
            <i className="far fa-3x fa-question-circle"></i>
          </label>
          <div className="absolute bottom-0 left-0 z-20 h-full w-full max-w-sm bg-background p-4 px-2 text-foreground dark:bg-[#303030]">
            <div className="relative">
              <div className="z-90 absolute left-full top-full ml-8 flex flex-col gap-x-1 overflow-hidden rounded-lg bg-transparent">
                {/* <div className="absolute rounded flex gap-x-1 bottom-0 left-4 z-20"> */}
                <div className="flex gap-x-2">
                  <div className="rounded-lg bg-blue-400/40 p-1.5 text-white">
                    <span>3D</span>
                  </div>

                  <div className="flex gap-x-1 rounded-l-lg bg-white px-1 dark:bg-[#303030]">
                    <CustomDialog
                      title="Settings"
                      open={settingsDialogOpen}
                      onClose={() => setSettingsDialogOpen(false)}
                      triggerButton={
                        <IconButton
                          size="xs"
                          onClick={() => setSettingsDialogOpen(true)}
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
                      onClick={() => onScreenshot()}
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
                {window.viewer && <OutputObjectsPanel viewer={viewerState} />}
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
                      onSubmit={(e: any) => {
                        e.preventDefault();

                        selectedObject.setValues({
                          title: e.target.title.value,
                          description: e.target.description.value,
                        });

                        setRenderIndex((currentIndex) => currentIndex + 1);

                        toast.success("Annotation updated successfully");
                        setSelectedObject(null);
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

            <div className="absolute -left-14 right-full top-12 z-20 mr-8 flex w-[34px] flex-col gap-x-1 overflow-hidden rounded-2xl bg-background">
              {modeButtons.map((modeButton) => (
                <IconButton
                  key={modeButton.mode}
                  title={modeButton.title}
                  variant={mode === modeButton.mode ? "primary" : "material"}
                  className={cn(
                    "focus:ring-none h-9 w-full rounded-none border-none ring-0 focus:border-none",
                  )}
                  onClick={() => {
                    if (mode === "distance") {
                      onDeactivateDistanceMeasurementMouseControl();
                    }

                    if (mode === "angle") {
                      onDeactivateAngleMeasurementMouseControl();
                    }

                    if (mode === "line") {
                      onDeactivateLinesMouseControl();
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
          </div>
        </div>
      </div>
    </>
  );
}

function MeasurementsPanel({ measurementsData, distanceMeasurementsPluginW }) {
  const [measurements, setMeasurements] = React.useState(measurementsData);

  const [showContent, setShowContent] = React.useState(true);

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

  function onHideMeasurement(id: string) {
    distanceMeasurementsPluginW.measurements[id].visible = false;
  }

  function onShowMeasurement(id: string) {
    distanceMeasurementsPluginW.measurements[id].visible = true;
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
          <input type="checkbox" checked={true} />
          <DistanceIcon className="h-5 w-5" />
          <Typography as="p" variant="base/medium">
            Measurements
          </Typography>
        </div>
        {showContent &&
          measurements &&
          Object.values(measurements).map((measurement: any, index) => (
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

                <IconButton
                  onClick={() => {
                    onRemoveMeasumenet(measurement?.id);
                  }}
                  variant="outline"
                  className="size-7"
                >
                  <TrashIcon className="h-4 w-4 fill-current" />
                </IconButton>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function OutputObjectsPanel({ viewer }) {
  const [objects, setObjects] = React.useState(viewer?.scene?.objects);

  function onHideObject(id: string) {
    window.viewer.scene.objects[id].visible = false;
  }

  function onShowObject(id: string) {
    window.viewer.scene.objects[id].visible = true;
  }

  const [showContent, setShowContent] = React.useState(true);

  function onHideAllObjects() {
    Object.values(viewer.scene.objects).forEach((object: any) => {
      object.visible = false;
    });
  }

  function onShowAllObjects() {
    Object.values(viewer.scene.objects).forEach((object: any) => {
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
                ? Object.values(objects).every((object: any) => object.visible)
                : undefined
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
          Object.values(objects).map((object: any, index) => (
            <div
              key={object.id}
              className="ml-2.5 flex items-center justify-between border-l-2 pl-6"
            >
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  defaultChecked={object.visible}
                  onChange={(v) => {
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
                </Typography>
              </div>

              <div className="space-x-2"></div>
            </div>
          ))}
      </div>
    </div>
  );
}

function AnnoatationsPanel({ annotationsData, annotationPlugin }) {
  const [annotations, setAnnotations] = React.useState(annotationsData);

  function onDestroyAnnotation(id: string) {
    if (!annotationPlugin || !id) return;

    annotationPlugin.destroyAnnotation(id);

    setAnnotations(cloneObject(annotationPlugin?.annotations));
  }

  const [showContent, setShowContent] = React.useState(true);

  return (
    <div>
      <div className="space-y-2.5">
        <div className="flex items-center gap-x-1">
          <button type="button" onClick={() => setShowContent((p) => !p)}>
            <ChevronRightIcon
              className={`w-5 ${showContent ? "rotate-90" : ""}`}
            />
          </button>
          <input type="checkbox" checked={true} />
          <AnnotationIcon className="h-5 w-5" />
          <Typography as="p" variant="base/medium">
            Annotations
          </Typography>
        </div>
        {showContent &&
          annotations &&
          Object.values(annotations).map((annotation: any, index) => (
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

                <IconButton
                  onClick={() => {
                    onDestroyAnnotation(annotation?.id);
                  }}
                  variant="outline"
                  className="size-7"
                >
                  <TrashIcon className="h-4 w-4 fill-current" />
                </IconButton>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

// #303030

function AnnotationForm({
  onSubmit = (title, description) => {
    console.log("title, description", title, description);
  },
}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  return (
    <div className="w-full rounded-2xl text-left">
      <div className="flex flex-col items-center gap-y-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex w-full justify-end">
          <Button
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
