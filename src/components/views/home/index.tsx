import { Viewer3D } from "@/components/xeokit/data-viewer";
import { RenderViewProvider } from "@/context/render-view";
import { exampleData } from "@/data";
import { PotreeDate } from "@/types";

export function HomePageView() {
  return (
    <div>
      <DataView data={exampleData} />
    </div>
  );
}

type DataViewProps = {
  data: PotreeDate;
};

function DataView({ data }: DataViewProps) {
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
