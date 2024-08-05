// import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/lib/api";

import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import TailwindIndicator, { UICustomizer } from "@/components/tailwind";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        themes={["light", "dark", "system"]}
        defaultTheme="light"
        // enableSystem
      >
        <Toaster
          position="bottom-right"
          // expand
          // visibleToasts={6}
          closeButton
        />
        {/* <div className={GeistSans.className}> */}
        <Component {...pageProps} />
        {/* <UICustomizer />
        <TailwindIndicator /> */}
        {/* </div> */}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
