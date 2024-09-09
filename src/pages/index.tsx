import Seo from "@/components/seo";
import { HomePageView } from "@/components/views/home";

export default function HomePage() {
  return (
    <>
      <Seo title="Home" />
      <HomePageView />
    </>
  );
}
