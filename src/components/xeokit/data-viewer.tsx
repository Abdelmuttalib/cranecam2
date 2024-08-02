import { DateTimeline } from "./data-select-timeline";
import { RenderViewProvider } from "@/context/render-view";
// import { Viewer, XeokitViewer } from "./viewer";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { ShareDialog } from "./share-dialog";
import { useRenderView } from "@/hooks/use-render-view";
import { formatDate } from "@/lib/date";
import { PotreeDate } from "@/types";
import dynamic from "next/dynamic";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
// import Xeo from "./xeo";

// dynamic import for the XeokitViewer component

const XeokitViewer = dynamic(() => import("./viewer"), {
  ssr: false,
});

const Xeo = dynamic(() => import("./xeo"), {
  ssr: false,
});

const CompareXeo = dynamic(() => import("./xeo-compare"), {
  ssr: false,
});

type DataViewProps = {
  data: PotreeDate;
};

export default function DataView({ data }: DataViewProps) {
  return (
    <RenderViewProvider data={data}>
      <>
        {/* <XeokitViewer /> */}
        <Viewer3D />
      </>
      {/* <div className="relative flex h-full min-h-screen w-full flex-col">
        <div className="flex w-full flex-col items-center justify-center bg-zinc-950 font-semibold text-gray-100">
          <Navbar />
          <DateTimeline />
        </div>
        <Viewer />
      </div> */}
    </RenderViewProvider>
  );
}

import { ReactCompareSlider } from "react-compare-slider";

function Viewer3D() {
  const { compareMode } = useRenderView();

  console.log("compareMode", compareMode);

  return (
    <>
      {compareMode ? (
        <div className="flex h-screen w-screen">
          <ReactCompareSlider
            boundsPadding={0}
            itemOne={<CompareXeo index={1} />}
            itemTwo={<CompareXeo index={2} />}
            keyboardIncrement="5%"
            position={50}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
          {/* <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            <ResizablePanel defaultSize={50}>
              <CompareXeo index={1} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <CompareXeo index={2} />
            </ResizablePanel>
          </ResizablePanelGroup> */}
        </div>
      ) : (
        <Xeo />
      )}
    </>
  );
}

export function Navbar() {
  const { selectedDate } = useRenderView();

  return (
    <div className="flex h-14 w-full items-center bg-background px-4 text-foreground">
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
        <div className="h-8 w-0.5 bg-foreground-muted-light"></div>
        <div className="flex h-full items-center gap-x-1.5">
          <p>Construction site</p>
          <ChevronRight className="w-5" />
          <p className="inline-flex items-center gap-x-2 font-normal">
            <span>
              <CalendarIcon className="w-4" />
            </span>
            {formatDate(selectedDate.date)}{" "}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <ShareDialog />
        {/* <Button>
        <span className="flex items-center gap-x-2">
          <Share2 className="w-[17px]" />
          <span>Share</span>
        </span>
      </Button> */}
      </div>
    </div>
  );
}
