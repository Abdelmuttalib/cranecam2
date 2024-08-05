export default function XeokitViewerSyncClasses() {
  return <div>xeokit sync class</div>;
}

// // native js class
// // class Counter {
// //   constructor(count = 0) {
// //     this.count = count;
// //   }

// //   increment() {
// //     // this.count++;
// //     return new Counter(this.count + 1);
// //   }

// //   decrement() {
// //     // this.count--;
// //     return new Counter(this.count - 1);
// //   }

// //   getCount() {
// //     return this.count;
// //   }
// // }

// // function StudyClassWithReactState() {
// //   const [counter, setCounter] = useState(new Counter(0));

// //   useEffect(() => {
// //     console.log("counter22", counter);
// //   }, [counter]);

// //   function onIncrement() {
// //     setCounter(counter.increment());
// //   }

// //   function onDecrement() {
// //     setCounter(counter.decrement());
// //   }

// //   return (
// //     <div>
// //       <h1 className="p-3 bg-gray-200 rounded w-fit">{counter.getCount()}</h1>
// //       <Button onClick={() => onIncrement()}>Increment</Button>
// //       <Button onClick={() => onDecrement()}>Decrement</Button>
// //     </div>
// //   );
// // }

// // class Annotation {
// //   constructor(
// //     content = "",
// //     position = { x: 0, y: 0, z: 0 },
// //     color = "red",
// //     viewerId = ""
// //   ) {
// //     this.content = content;
// //     this.position = position;
// //     this.color = color;
// //     this.viewerId = viewerId;
// //   }

// //   setContent(content) {
// //     return new Annotation(content, this.position, this.color, this.viewerId);
// //   }

// //   setPosition(position) {
// //     return new Annotation(this.content, position, this.color, this.viewerId);
// //   }

// //   setColor(color) {
// //     return new Annotation(this.content, this.position, color, this.viewerId);
// //   }

// //   setViewerId(viewerId) {
// //     return new Annotation(this.content, this.position, this.color, viewerId);
// //   }

// //   getContent() {
// //     return this.content;
// //   }

// //   getPosition() {
// //     return this.position;
// //   }

// //   getColor() {
// //     return this.color;
// //   }

// //   getViewerId() {
// //     return this.viewerId;
// //   }
// // }

// // function AnnotationsView() {
// //   const [annotations, setAnnotations] = useState([
// //     new Annotation("Annotation 1", { x: 100, y: 100, z: 0 }, "red", "viewer1"),
// //   ]);

// //   function addAnnotation() {
// //     setAnnotations([...annotations, new Annotation()]);
// //   }

// //   function updateAnnotation(index, annotation) {
// //     const newAnnotations = [...annotations];
// //     newAnnotations[index] = annotation;
// //     setAnnotations(newAnnotations);
// //   }

// //   function removeAnnotation(index) {
// //     const newAnnotations = [...annotations];
// //     newAnnotations.splice(index, 1);
// //     setAnnotations(newAnnotations);
// //   }

// //   return (
// //     <div>
// //       <Button onClick={addAnnotation}>Add Annotation</Button>
// //       {annotations.map((annotation, index) => (
// //         <AnnotationItem
// //           key={index}
// //           annotation={annotation}
// //           onUpdate={(annotation) => updateAnnotation(index, annotation)}
// //           onRemove={() => removeAnnotation(index)}
// //         />
// //       ))}
// //     </div>
// //   );
// // }

// // function AnnotationItem({ annotation, onUpdate, onRemove }) {
// //   const [content, setContent] = useState(annotation.getContent());
// //   const [position, setPosition] = useState(annotation.getPosition());
// //   const [color, setColor] = useState(annotation.getColor());
// //   const [viewerId, setViewerId] = useState(annotation.getViewerId());

// //   useEffect(() => {
// //     console.log("change", content, position, color, viewerId);
// //     console.log("annotation", annotation);
// //   }, [content, position, color, viewerId]);

// //   useEffect(() => {
// //     console.log("annotation2", annotation);
// //   }, [annotation]);

// //   function onSubmit() {
// //     onUpdate(new Annotation(content, position, color, viewerId));
// //   }

// //   return (
// //     <div>
// //       <Input
// //         type="text"
// //         value={content}
// //         onChange={(e) => setContent(e.target.value)}
// //         placeholder="Content"
// //       />
// //       <Input
// //         type="text"
// //         value={position.x}
// //         onChange={(e) =>
// //           setPosition({ ...position, x: Number(e.target.value) })
// //         }
// //         placeholder="X"
// //       />
// //       <Input
// //         type="text"
// //         value={position.y}
// //         onChange={(e) =>
// //           setPosition({ ...position, y: Number(e.target.value) })
// //         }
// //         placeholder="Y"
// //       />
// //       <Input
// //         type="text"
// //         value={position.z}
// //         onChange={(e) =>
// //           setPosition({ ...position, z: Number(e.target.value) })
// //         }
// //         placeholder="Z"
// //       />
// //       <Input
// //         type="text"
// //         value={color}
// //         onChange={(e) => setColor(e.target.value)}
// //         placeholder="Color"
// //       />
// //       <Input
// //         type="text"
// //         value={viewerId}
// //         onChange={(e) => setViewerId(e.target.value)}
// //         placeholder="Viewer Id"
// //       />
// //       <Button onClick={onSubmit}>Update</Button>
// //       <Button onClick={onRemove}>Remove</Button>
// //     </div>
// //   );
// // }

// // class AnnotationsPlugin extends Plugin {
// //   /**
// //    * @constructor
// //    * @param {Viewer} viewer The Viewer.
// //    * @param {Object} cfg  Plugin configuration.
// //    * @param {String} [cfg.id="Annotations"] Optional ID for this plugin, so that we can find it within {@link Viewer#plugins}.
// //    * @param {String} [cfg.markerHTML] HTML text template for Annotation markers. Defaults to ````<div></div>````. Ignored on {@link Annotation}s configured with a ````markerElementId````.
// //    * @param {String} [cfg.labelHTML] HTML text template for Annotation labels. Defaults to ````<div></div>````.  Ignored on {@link Annotation}s configured with a ````labelElementId````.
// //    * @param {HTMLElement} [cfg.container] Container DOM element for markers and labels. Defaults to ````document.body````.
// //    * @param {{String:(String|Number)}} [cfg.values={}] Map of default values to insert into the HTML templates for the marker and label.
// //    * @param {Number}  [cfg.surfaceOffset=0.3] The amount by which each {@link Annotation} is offset from the surface of
// //    * its {@link Entity} when we create the Annotation by supplying a {@link PickResult} to {@link AnnotationsPlugin#createAnnotation}.
// //    */
// //   constructor(viewer, cfg) {
// //     super("Annotations", viewer);

// //     this._labelHTML = cfg.labelHTML || "<div></div>";
// //     this._markerHTML = cfg.markerHTML || "<div></div>";
// //     this._container = cfg.container || document.body;
// //     this._values = cfg.values || {};

// //     /**
// //      * The {@link Annotation}s created by {@link AnnotationsPlugin#createAnnotation}, each mapped to its {@link Annotation#id}.
// //      * @type {{String:Annotation}}
// //      */
// //     this.annotations = {};

// //     this.surfaceOffset = cfg.surfaceOffset;
// //   }

// //   /**
// //    * Gets the plugin's HTML container element, if any.
// //    * @returns {*|HTMLElement|HTMLElement}
// //    */
// //   getContainerElement() {
// //     return this._container;
// //   }

// //   /**
// //    * @private
// //    */
// //   send(name, value) {
// //     switch (name) {
// //       case "clearAnnotations":
// //         this.clear();
// //         break;
// //     }
// //   }

// //   /**
// //    * Sets the amount by which each {@link Annotation} is offset from the surface of its {@link Entity}, when we
// //    * create the Annotation by supplying a {@link PickResult} to {@link AnnotationsPlugin#createAnnotation}.
// //    *
// //    * See the class comments for more info.
// //    *
// //    * This is ````0.3```` by default.
// //    *
// //    * @param {Number} surfaceOffset The surface offset.
// //    */
// //   set surfaceOffset(surfaceOffset) {
// //     if (surfaceOffset === undefined || surfaceOffset === null) {
// //       surfaceOffset = 0.3;
// //     }
// //     this._surfaceOffset = surfaceOffset;
// //   }

// //   /**
// //    * Gets the amount by which an {@link Annotation} is offset from the surface of its {@link Entity} when
// //    * created by {@link AnnotationsPlugin#createAnnotation}, when we
// //    * create the Annotation by supplying a {@link PickResult} to {@link AnnotationsPlugin#createAnnotation}.
// //    *
// //    * This is ````0.3```` by default.
// //    *
// //    * @returns {Number} The surface offset.
// //    */
// //   get surfaceOffset() {
// //     return this._surfaceOffset;
// //   }

// //   /**
// //    * Creates an {@link Annotation}.
// //    *
// //    * The Annotation is then registered by {@link Annotation#id} in {@link AnnotationsPlugin#annotations}.
// //    *
// //    * @param {Object} params Annotation configuration.
// //    * @param {String} params.id Unique ID to assign to {@link Annotation#id}. The Annotation will be registered by this in {@link AnnotationsPlugin#annotations} and {@link Scene.components}. Must be unique among all components in the {@link Viewer}.
// //    * @param {String} [params.markerElementId] ID of pre-existing DOM element to render the marker. This overrides ````markerHTML```` and does not support ````values```` (data is baked into the label DOM element).
// //    * @param {String} [params.labelElementId] ID of pre-existing DOM element to render the label. This overrides ````labelHTML```` and does not support ````values```` (data is baked into the label DOM element).
// //    * @param {String} [params.markerHTML] HTML text template for the Annotation marker. Defaults to the marker HTML given to the AnnotationsPlugin constructor. Ignored if you provide ````markerElementId````.
// //    * @param {String} [params.labelHTML] HTML text template for the Annotation label. Defaults to the label HTML given to the AnnotationsPlugin constructor. Ignored if you provide ````labelElementId````.
// //    * @param {Number[]} [params.worldPos=[0,0,0]] World-space position of the Annotation marker, assigned to {@link Annotation#worldPos}.
// //    * @param {Entity} [params.entity] Optional {@link Entity} to associate the Annotation with. Causes {@link Annotation#visible} to be ````false```` whenever {@link Entity#visible} is also ````false````.
// //    * @param {PickResult} [params.pickResult] Sets the Annotation's World-space position and direction vector from the given {@link PickResult}'s {@link PickResult#worldPos} and {@link PickResult#worldNormal}, and the Annotation's Entity from {@link PickResult#entity}. Causes ````worldPos```` and ````entity```` parameters to be ignored, if they are also given.
// //    * @param {Boolean} [params.occludable=false] Indicates whether or not the {@link Annotation} marker and label are hidden whenever the marker occluded by {@link Entity}s in the {@link Scene}. The
// //    * {@link Scene} periodically occlusion-tests all Annotations on every 20th "tick" (which represents a rendered frame). We can adjust that frequency via property {@link Scene#ticksPerOcclusionTest}.
// //    * @param  {{String:(String|Number)}} [params.values={}] Map of values to insert into the HTML templates for the marker and label. These will be inserted in addition to any values given to the AnnotationsPlugin constructor.
// //    * @param {Boolean} [params.markerShown=true] Whether to initially show the {@link Annotation} marker.
// //    * @param {Boolean} [params.labelShown=false] Whether to initially show the {@link Annotation} label.
// //    * @param {Number[]} [params.eye] Optional World-space position for {@link Camera#eye}, used when this Annotation is associated with a {@link Camera} position.
// //    * @param {Number[]} [params.look] Optional World-space position for {@link Camera#look}, used when this Annotation is associated with a {@link Camera} position.
// //    * @param {Number[]} [params.up] Optional World-space position for {@link Camera#up}, used when this Annotation is associated with a {@link Camera} position.
// //    * @param {String} [params.projection] Optional projection type for {@link Camera#projection}, used when this Annotation is associated with a {@link Camera} position.
// //    * @returns {Annotation} The new {@link Annotation}.
// //    */
// //   createAnnotation(params) {
// //     if (this.viewer.scene.components[params.id]) {
// //       this.error("Viewer component with this ID already exists: " + params.id);
// //       delete params.id;
// //     }

// //     var markerElement = null;
// //     if (params.markerElementId) {
// //       markerElement = document.getElementById(params.markerElementId);
// //       if (!markerElement) {
// //         this.error(
// //           "Can't find DOM element for 'markerElementId' value '" +
// //             params.markerElementId +
// //             "' - defaulting to internally-generated empty DIV",
// //         );
// //       }
// //     }

// //     var labelElement = null;
// //     if (params.labelElementId) {
// //       labelElement = document.getElementById(params.labelElementId);
// //       if (!labelElement) {
// //         this.error(
// //           "Can't find DOM element for 'labelElementId' value '" +
// //             params.labelElementId +
// //             "' - defaulting to internally-generated empty DIV",
// //         );
// //       }
// //     }

// //     const annotation = new Annotation(this.viewer.scene, {
// //       id: params.id,
// //       plugin: this,
// //       container: this._container,
// //       markerElement: markerElement,
// //       labelElement: labelElement,
// //       markerHTML: params.markerHTML || this._markerHTML,
// //       labelHTML: params.labelHTML || this._labelHTML,
// //       occludable: params.occludable,
// //       values: utils.apply(params.values, utils.apply(this._values, {})),
// //       markerShown: params.markerShown,
// //       labelShown: params.labelShown,
// //       eye: params.eye,
// //       look: params.look,
// //       up: params.up,
// //       projection: params.projection,
// //       visible: params.visible !== false,
// //     });

// //     params.pickResult = params.pickResult || params.pickRecord;
// //     if (params.pickResult) {
// //       annotation.setFromPickResult(params.pickResult);
// //     } else {
// //       annotation.entity = params.entity;
// //       annotation.worldPos = params.worldPos;
// //     }

// //     this.annotations[annotation.id] = annotation;
// //     annotation.on("destroyed", () => {
// //       delete this.annotations[annotation.id];
// //       this.fire("annotationDestroyed", annotation.id);
// //     });
// //     this.fire("annotationCreated", annotation.id);
// //     return annotation;
// //   }

// //   /**
// //    * Destroys an {@link Annotation}.
// //    *
// //    * @param {String} id ID of Annotation to destroy.
// //    */
// //   destroyAnnotation(id) {
// //     var annotation = this.annotations[id];
// //     if (!annotation) {
// //       this.log("Annotation not found: " + id);
// //       return;
// //     }
// //     annotation.destroy();
// //   }

// //   /**
// //    * Destroys all {@link Annotation}s.
// //    */
// //   clear() {
// //     const ids = Object.keys(this.annotations);
// //     for (var i = 0, len = ids.length; i < len; i++) {
// //       this.destroyAnnotation(ids[i]);
// //     }
// //   }

// //   /**
// //    * Destroys this AnnotationsPlugin.
// //    *
// //    * Destroys all {@link Annotation}s first.
// //    */
// //   destroy() {
// //     this.clear();
// //     super.destroy();
// //   }
// // }

// // export { AnnotationsPlugin };

// import * as React from "react";

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
//   // PointerCircle,
//   Annotation,
// } from "@xeokit/xeokit-sdk";
// import { useMounted } from "@/hooks/use-mounted";
// import { Button } from "../ui/button";
// import { IconButton } from "../ui/icon-button";
// import { Trash } from "lucide-react";

// // make a viewer context provider with react context

// const ViewerContext = React.createContext(null);

// export function useViewer() {
//   return React.useContext(ViewerContext);
// }

// export function ViewerProvider({
//   children,
//   canvasId,
// }: {
//   children: React.ReactNode;
//   canvasId: string;
// }) {
//   const mounted = useMounted();

//   // function getInitViewer() {
//   //   return new XEOViewer({
//   //     canvasId: canvasId,
//   //     transparent: true,
//   //   });
//   // };

//   const [viewer, setViewer] = React.useState();

//   React.useEffect(() => {
//     setViewer(
//       new XEOViewer({
//         canvasId: "myCanvas",
//         // canvasId: canvasId ?? "myCanvas",
//         transparent: true,
//       }),
//     );
//   }, [mounted]);

//   // React.useEffect(() => {
//   //   async function initXeoViewer() {
//   //     const viewer = new XEOViewer({
//   //       canvasId: canvasId,
//   //       transparent: true,
//   //     });
//   //     console.log("viewerxxxxx", viewer);
//   //     setViewer(viewer);
//   //   }

//   //   // initXeoViewer();

//   //   return () => {
//   //     if (viewer) {
//   //       viewer.destroy();
//   //     }
//   //   };
//   // }, []);

//   return (
//     <ViewerContext.Provider value={{ viewer }}>
//       {children}
//     </ViewerContext.Provider>
//   );
// }

// // const AnnotationContext = React.createContext(null);

// // export const AnnotationProvider = ({ children, cart }) => {
// //   return <AnnotationContext.Provider value={cart}>{children}</AnnotationContext.Provider>;
// // };

// // export const useAnnotation = () => {
// //   const cart = React.useContext(CartContext);
// //   const [content, r] = React.useState();
// //   React.useEffect(() => {
// //     const notify = (productsInCart) => r(productsInCart);
// //     cart.subscribe(notify);
// //     cart.notify();
// //     return () => cart.unSubscribe(notify);
// //   }, [cart, r]);
// //   return {
// //     addToCart: cart.addToCart,
// //     removeFromCart: cart.removeFromCart,
// //     content
// //   };
// // };

// export default function XeokitViewerSyncClasses() {
//   return (
//     <ViewerProvider canvasId="myCanvas">
//       <XeokitView />
//       {/* <canvas id="myCanvas" className="h-full w-full"></canvas> */}
//     </ViewerProvider>
//   );
// }

// function XeokitView() {
//   const { viewer } = useViewer();

//   console.log("viewerXeokitView", viewer);

//   if (!viewer) {
//     console.log("viewerXeokitView33333333", viewer);
//     // return <div>Loading...</div>;
//   }

//   const [annotationPlugin, setAnnotationPlugin] = React.useState(null);

//   const [annotations, setAnnotations] = React.useState();

//   function clone(obj) {
//     if (obj == null || typeof obj != "object") return obj;
//     var copy = obj.constructor();
//     for (var attr in obj) {
//       if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
//     }
//     return copy;
//   }

//   function onViewerClick(coords, pickResult) {
//     console.log("onViewerClick", coords, pickResult);

//     console.log("annotationPlugin", annotationPlugin);

//     // create annotation
//     if (!annotationPlugin) {
//       return;
//     }

//     // const i = annotations.length + 1;

//     const i = Object.keys(annotationPlugin.annotations).length + 1;

//     // setAnnotations([
//     //   ...annotations,
//     annotationPlugin.createAnnotation({
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
//     // ]);

//     // copy exising annotations object, add new annotation

//     // setAnnotations({
//     //   ...annotations,
//     //   ["myAnnotation" + i]: ann,
//     // });

//     const nAnns = clone(annotationPlugin?.annotations);

//     annotationPlugin?.setAnnotations(nAnns);
//     console.log(
//       "typeof",
//       annotationPlugin?.annotations,
//       clone(annotationPlugin?.annotations),
//       annotationPlugin?.getAnnotations(),
//       annotationPlugin?.getAnnotation("myAnnotation1"),
//     );
//     // setAnnotations(clone(annotationPlugin?.getAnnotations()));
//     // console.log("annotation", annotation);
//   }

//   React.useEffect(() => {
//     console.log("annotations2222", annotations);
//   }, [annotations]);

//   React.useEffect(() => {
//     console.log("annotationPlugin", annotationPlugin);
//   }, [annotationPlugin]);

//   React.useEffect(() => {
//     console.log("annotationPluginannotations", annotationPlugin?.annotations);
//   }, [annotationPlugin?.annotations]);

//   React.useEffect(() => {
//     async function initXeo() {
//       if (!viewer) {
//         return;
//       }
//       // 2
//       viewer.scene.camera.eye = [-2.56, 8.38, 8.27];
//       viewer.scene.camera.look = [13.44, 3.31, -14.83];
//       viewer.scene.camera.up = [0.1, 0.98, -0.14];

//       // if (!window.viewer) {
//       //   window.viewer = viewer;
//       // }
//       // if (!viewerRef.current) {
//       //   viewerRef.current = viewer;
//       // }

//       // if (!viewerState) {
//       //   setViewerState(viewer);
//       // }

//       const annotationsPlugin = new AnnotationsPlugin(viewer, {
//         markerHTML:
//           "<div class='annotation-marker' on style='background-color: transparent;'><svg width='100%' height='100%' viewBox='0 0 24 24' fill='currentColor' className='w-[22px] h-[22px]' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid meet' focusable='false'><path d='M12 2a6.995 6.995 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a6.993 6.993 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z'></path></svg></div>",
//         labelHTML:
//           "<div class='annotation-label' style='background-color: {{labelBGColor}};'><div class='annotation-title'>{{title}}</div><div class='annotation-desc'>{{description}}</div></div>",

//         values: {
//           markerBGColor: "red",
//           labelBGColor: "white",
//           glyph: "X",
//           title: "Untitled",
//           description: "No description",
//         },
//         surfaceOffset: 0.1,
//       });

//       setAnnotationPlugin(annotationsPlugin);

//       // const annotation = annotations.createAnnotation({
//       //   id: "myAnnotation" + i,
//       //   pickResult: pickResult, // <<------- initializes worldPos and entity from PickResult
//       //   occludable: true, // Optional, default is true
//       //   markerShown: true, // Optional, default is true
//       //   labelShown: true, // Optional, default is true
//       //   values: {
//       //     // HTML template values
//       //     glyph: "A" + i,
//       //     title: "My annotation " + i,
//       //     description: "My description " + i,
//       //   },
//       //   markerElementId: "myMarkerElement",
//       //   markerHTML: "<div class='annotation-marker'>{{glyph}}</div>",
//       // });

//       // annotations.on("markerClicked", (annotation) => {
//       //   annotation.labelShown = !annotation.labelShown;
//       // });

//       //------------------------------------------------------------------------------------------------------------------
//       // Use the AnnotationsPlugin to create an annotation wherever we click on an object
//       //------------------------------------------------------------------------------------------------------------------

//       var i = 1;

//       let editedAnnotation = null;

//       viewer.scene.input.on("mouseclicked", (coords) => {
//         console.log("no pick result", coords);
//         const pickResult = viewer.scene.pick({
//           canvasPos: coords,
//           pickSurface: true, // <<------ This causes picking to find the intersection point on the entity
//         });

//         if (!pickResult) {
//           console.log("no pick result", coords);
//         }

//         // console.log("coords", coords);
//         // console.log("pickResult", pickResult);

//         if (pickResult) {
//           onViewerClick(coords, pickResult);
//           // if (annotationMode) {
//           //   onAddAnnotation(coords, pickResult);
//           //   if (editedAnnotation) {
//           //     editedAnnotation.setFromPickResult(pickResult);
//           //     editedAnnotation.setField("markerBGColor", "red");
//           //     editedAnnotation = null;
//           //     return;
//           //   }
//           //       const annotation = annotations.createAnnotation({
//           //         id: "myAnnotation" + i,
//           //         pickResult: pickResult, // <<------- initializes worldPos and entity from PickResult
//           //         occludable: true, // Optional, default is true
//           //         markerShown: true, // Optional, default is true
//           //         labelShown: true, // Optional, default is true
//           //         values: {
//           //           // HTML template values
//           //           glyph: "A" + i,
//           //           title: "My annotation " + i,
//           //           description: "My description " + i,
//           //         },
//           //         markerHTML: "<div class='bg-red-300'>{{glyph}}</div>",
//           //         labelHTML:
//           //           "<div class='annotation-label' style='background-color: {{labelBGColor}};'>\
//           //  <div class='annotation-title'>{{title}}</div>\
//           //  <div class='annotation-desc'>{{description}}</div>\
//           //  <br><img alt='myImage' width='150px' height='100px' src='{{imageSrc}}'>\
//           //  </div>",
//           //       });
//           //       i++;
//         }
//       });

//       annotationsPlugin.on("contextmenu", (annotation) => {
//         // Initiate annotation's position change
//         editedAnnotation = annotation;
//         editedAnnotation.setField("markerBGColor", "pink");
//       });

//       annotationsPlugin.on("markerClicked", (annotation) => {
//         console.log("annotation clicked", annotation);
//       });

//       // viewer.scene.camera.eye = [635796.0612055798, 855416.1847290703, -3167.352900630285];
//       // viewer.scene.camera.look = [637290.78125, 851209.90625, 510.70001220703125];
//       // viewer.scene.camera.up = [0.273790165300491, 0.686401912000719, 0.673714598763072];

//       // viewer.scene.camera.project.far = 10000000;

//       const pivotElement = document
//         .createRange()
//         .createContextualFragment(
//           "<div className='xeokit-camera-pivot-marker'></div>",
//         ).firstChild;

//       document.body.appendChild(pivotElement);

//       viewer.cameraControl.pivotElement = pivotElement;

//       viewer.scene.pointsMaterial.pointSize = 2;
//       viewer.scene.pointsMaterial.roundPoints = false;
//       viewer.scene.pointsMaterial.perspectivePoints = true;
//       viewer.scene.pointsMaterial.minPerspectivePointSize = 2;
//       viewer.scene.pointsMaterial.maxPerspectivePointSize = 4;
//       viewer.scene.pointsMaterial.filterIntensity = true;
//       viewer.scene.pointsMaterial.minIntensity = 0;
//       viewer.scene.pointsMaterial.maxIntensity = 1;

//       new TreeViewPlugin(viewer, {
//         containerElement: document.getElementById("treeViewContainer"),
//         autoExpandDepth: 3, // Initially expand the root tree node
//       });

//       const xktLoader = new XKTLoaderPlugin(viewer);

//       const model = xktLoader.load({
//         id: "myModel",
//         // src: "./models/xkt/Schependomlaan.xkt",
//         // src: "/models/rac.xkt",
//         // src: "/models/ar-demo-sample-single-building-01.xkt",
//         src: "/models/meshed-1.ply.xkt",
//         // src: "./models/xkt/v7/OTCConferenceCenter/OTCConferenceCenter.xkt",
//         // src: "./rme.ply.xkt",
//         edges: true,
//       });

//       model.on("loaded", () => {
//         viewer.cameraFlight.jumpTo(model);
//       });

//       const pointsMaterial = viewer.scene.pointsMaterial;
//       const camera = viewer.camera;

//       const guiParams = new (function () {
//         // positioning
//         this.positionX = -9.5;
//         this.positionY = -9;
//         this.positionZ = 1;
//         this.rotateX = 0;
//         this.rotateY = -3.8;
//         this.rotateZ = 0;
//         // points material
//         this.roundPoints = pointsMaterial.roundPoints;
//         this.pointSize = pointsMaterial.pointSize;
//         this.perspectivePoints = pointsMaterial.perspectivePoints;
//         this.minPerspectivePointSize = pointsMaterial.minPerspectivePointSize;
//         this.maxPerspectivePointSize = pointsMaterial.maxPerspectivePointSize;
//         this.filterIntensity = pointsMaterial.filterIntensity;
//         this.minIntensity = pointsMaterial.minIntensity;
//         this.maxIntensity = pointsMaterial.maxIntensity;
//         this.perspective = camera.projection === "perspective";
//       })();

//       const update = function () {
//         // sceneModel.position = [
//         //   guiParams.positionX,
//         //   guiParams.positionY,
//         //   guiParams.positionZ,
//         // ];
//         // sceneModel.rotation = [
//         //   guiParams.rotateX,
//         //   guiParams.rotateY,
//         //   guiParams.rotateZ,
//         // ];
//         pointsMaterial.roundPoints = guiParams.roundPoints;
//         pointsMaterial.pointSize = guiParams.pointSize;
//         pointsMaterial.perspectivePoints = guiParams.perspectivePoints;
//         pointsMaterial.minPerspectivePointSize =
//           guiParams.minPerspectivePointSize;
//         pointsMaterial.maxPerspectivePointSize =
//           guiParams.maxPerspectivePointSize;
//         pointsMaterial.filterIntensity = guiParams.filterIntensity;
//         pointsMaterial.minIntensity = guiParams.minIntensity;
//         pointsMaterial.maxIntensity = guiParams.maxIntensity;
//         camera.projection = guiParams.perspective ? "perspective" : "ortho";
//         requestAnimationFrame(update);
//       };

//       update();

//       const gui = new dat.GUI({ autoPlace: false, width: "100%" });

//       const lasPositionFolder = gui.addFolder("LAS Position");
//       gui.add(guiParams, "positionX", -50, 50).onChange(update);
//       gui.add(guiParams, "positionY", -50, 50).onChange(update);
//       gui.add(guiParams, "positionZ", -50, 50).onChange(update);
//       lasPositionFolder.open();

//       const lasRotationFolder = gui.addFolder("LAS Orientation");
//       gui.add(guiParams, "rotateX", -90, 90).onChange(update);
//       gui.add(guiParams, "rotateY", -90, 90).onChange(update);
//       gui.add(guiParams, "rotateZ", -90, 90).onChange(update);
//       lasRotationFolder.open();

//       const pointsMaterialFolder = gui.addFolder("PointsMaterial");
//       pointsMaterialFolder.add(guiParams, "roundPoints");
//       pointsMaterialFolder.add(guiParams, "pointSize", 1, 50);
//       pointsMaterialFolder.add(guiParams, "perspectivePoints");
//       pointsMaterialFolder.add(guiParams, "minPerspectivePointSize", 1, 50);
//       pointsMaterialFolder.add(guiParams, "maxPerspectivePointSize", 1, 50);
//       pointsMaterialFolder.add(guiParams, "filterIntensity");
//       pointsMaterialFolder.add(guiParams, "minIntensity", 0.0, 1.0);
//       pointsMaterialFolder.add(guiParams, "maxIntensity", 0.0, 1.0);
//       pointsMaterialFolder.open();

//       const cameraFolder = gui.addFolder("Camera");
//       cameraFolder.add(guiParams, "perspective");
//       cameraFolder.open();

//       const customContainer = document.getElementById("myDatGuiContainer");
//       customContainer?.appendChild(gui.domElement);

//       console.log("viewer", viewer);
//     }

//     initXeo();
//   }, [viewer]);

//   const [renderIndex, setRenderIndex] = React.useState(0);

//   function onRender() {
//     setRenderIndex((prevR) => prevR + 1);
//   }

//   function onGetAnnotations() {
//     console.log("annotations", annotationPlugin?.annotations);
//   }

//   return (
//     <div className="relative h-full min-h-screen w-full">
//       <div className="absolute left-0 top-0 z-20 rounded bg-white p-3 font-medium text-black">
//         {annotations &&
//           Object.keys(annotations).map((key) => (
//             <div className="flex rounded bg-gray-100 p-1">
//               <div>{key}</div>
//               <IconButton
//                 size="xs"
//                 onClick={() => {
//                   // annotationPlugin?.destroyAnnotation(key);
//                   // console.log("destroyed", annotationPlugin?.getAnnotations());
//                 }}
//               >
//                 <Trash className="w-4" />
//               </IconButton>
//             </div>
//           ))}

//         {/* {annotations.map((annotation, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <div className="rounded bg-red-300 p-2">
//               {annotation.values.glyph}
//             </div>
//             <div>
//               <div>{annotation.values.title}</div>
//               <div>{annotation.values.description}</div>
//             </div>
//           </div>
//         ))} */}
//         <Button onClick={onGetAnnotations}>GET-render</Button>
//         <Button onClick={onRender}>Re-render</Button>
//       </div>
//       <canvas id="myCanvas" className="h-full w-full"></canvas>
//       {/* <div id="myDatGuiContainer"></div> */}
//       {/* <div id="treeViewContainer"></div> */}
//     </div>
//   );
// }
