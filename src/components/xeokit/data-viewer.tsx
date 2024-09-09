import { DateTimeline } from "./data-select-timeline";
import { RenderViewProvider } from "@/context/render-view";
// import { Viewer, XeokitViewer } from "./viewer";
import { CalendarIcon, ChevronRight, ShareIcon } from "lucide-react";
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

import * as React from "react";

import { ReactCompareSlider } from "react-compare-slider";
import { CompareIcon, XIcon } from "../icons";
import { Button } from "../ui/button";

export function Viewer3D() {
  const { compareMode, setCompareMode } = useRenderView();

  const [portrait, setPortrait] = React.useState(false);

  // #141414

  return (
    <>
      {compareMode ? (
        <div className="flex h-screen w-screen flex-col">
          <div className="flex h-12 w-full items-center justify-between bg-[#3d5afe] px-4">
            <div className="flex items-center gap-x-4">
              <div className="flex h-full items-center gap-x-4">
                <CompareIcon className="w-6" />
                <div className="h-[32px] w-0.5 bg-white text-red-400"></div>
                <div>
                  <p className="font-medium">Compare mode</p>
                </div>
              </div>
            </div>
            <div className="flex gap-x-6 text-white">
              <Button
                leftIcon={
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    className="w-[18px]"
                    fill="currentColor"
                  >
                    <path d="M8.5 2.5h-1v11h1v-11Z"></path>
                    <path d="M9 2H7v12h2V2Z"></path>
                    <path d="M14 3h-4v1h3v8h-3v1h4V3Z"></path>
                    <path d="M2.5 3.5h3-3v9-9Z"></path>
                    <path d="M6 3H2v10h4v-1H3V4h3V3Z"></path>
                  </svg>
                }
                size="xs"
                variant="ghost"
                onClick={() => {
                  setPortrait(false);
                }}
              >
                Split horizontally
              </Button>
              <Button
                leftIcon={
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                    focusable="false"
                    className="w-[18px]"
                    fill="currentColor"
                  >
                    <path d="M13.5 7.5h-11v1h11v-1Z"></path>
                    <path d="M14 7H2v2h12V7Z"></path>
                    <path d="M13 2H3v4h1V3h8v3h1V2Z"></path>
                    <path d="M13 10h-1v3H4v-3H3v4h10v-4Z"></path>
                  </svg>
                }
                size="xs"
                variant="ghost"
                onClick={() => {
                  setPortrait(true);
                }}
              >
                Split vertically
              </Button>
              <Button
                leftIcon={<ShareIcon className="w-4" />}
                size="xs"
                variant="ghost"
              >
                Share
              </Button>
              <Button
                leftIcon={<XIcon className="w-4" />}
                size="xs"
                variant="ghost"
                onClick={() => setCompareMode(false)}
              >
                Exit compare mode
              </Button>
            </div>
          </div>
          <ReactCompareSlider
            boundsPadding={0}
            itemOne={<CompareXeo index={1} />}
            itemTwo={<CompareXeo index={2} />}
            keyboardIncrement="5%"
            position={50}
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
            }}
            portrait={portrait}
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
