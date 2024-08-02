import { RegisterPageView } from "@/components/views/register";
import { getServerAuthSession } from "@/server/auth";
import { GetServerSideProps } from "next";

export default function LoginPage() {
  return (
    <>
      <RegisterPageView />
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
