import Seo from "@/components/seo";
import { HomePageView } from "@/components/views/home";
import { getServerAuthSession } from "@/server/auth";
import { GetServerSideProps } from "next";

export default function HomePage() {
  return (
    <>
      <Seo title="Home" />
      <HomePageView />
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getServerAuthSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// };
