// import Xeo from "@/components/xeokit/xeo";
import dynamic from "next/dynamic";

const XeokitViewerSyncClasses = dynamic(
  () => import("@/components/xeokit/xeokit-sync-classes"),
  { ssr: false },
);

export default function XeoPage() {
  return (
    <div className="h-screen w-screen">
      <XeokitViewerSyncClasses />
    </div>
  );
}
