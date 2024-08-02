import { LoginPageView } from "@/components/views/login";
import { getServerAuthSession } from "@/server/auth";
import { GetServerSideProps } from "next";

export default function LoginPage() {
  return (
    <>
      <LoginPageView />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
