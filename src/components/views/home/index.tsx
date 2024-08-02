import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DataView from "@/components/xeokit/data-viewer";
import { exampleData } from "@/data";
import { api } from "@/lib/api";
import { signIn, signOut, useSession } from "next-auth/react";

export function HomePageView() {
  return (
    <div>
      {/* <Viewer /> */}
      <DataView data={exampleData} />
      {/* <XeokitViewer /> */}
      {/* <div>
        <AuthShowcase />
      </div> */}
      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16"></div>
      </main> */}
    </div>
  );
}

{
  /* <Head>
<link rel="icon" href="/favicon.ico" />
</Head> */
}

function AuthShowcase() {
  const { data: sessionData } = useSession();
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  function generateAvatarUrl(t: string) {
    return `https://avatar.vercel.sh/${t}`;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      {sessionData && (
        <Avatar className="mr-2 h-7 w-7">
          <AvatarImage src={generateAvatarUrl(sessionData.user?.name)} />
          <AvatarFallback className="mr-2 h-7 w-7 rounded-full bg-gradient-to-br from-primary-700 to-primary-500"></AvatarFallback>
        </Avatar>
      )}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
