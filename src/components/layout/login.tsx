import type { ReactNode } from "react";
import { Typography } from "../ui/typography";
import { GradientBackground } from "../ui/gradient";
import Image from "next/image";

{
  /* <h1 className="h3 sm:h2 sm:h1 xl:display-sm from-primary-foreground dark:from-brand-100 bg-gradient-to-br to-primary-900 bg-clip-text text-transparent dark:bg-gradient-to-br dark:to-gray-800 dark:bg-clip-text dark:text-transparent lg:tracking-tighter ">
              Momentum
            </h1> */
}

export function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-[100svh] w-full grid-flow-row grid-cols-1 grid-rows-6 bg-neutral-50 dark:bg-neutral-900/70 lg:grid-flow-col lg:grid-cols-5 lg:grid-rows-1 lg:p-2">
      <div className="relative row-span-5 flex h-full w-full items-center justify-center rounded-t-lg lg:col-span-3 lg:row-span-1 lg:rounded-l-lg lg:rounded-tr-none">
        <GradientBackground />
        {children}
      </div>

      <div className="relative h-full overflow-hidden rounded-lg lg:col-span-2">
        {/* <div className="text-primary-foreground bg-foreground dark:bg-background flex h-full w-full flex-col items-center justify-center text-center">
          <div className="bg-primary-200 flex rounded p-4 py-3">
            <Typography
              as="h2"
              variant="display-lg/semibold"
              className="from-foreground to-primary-900 dark:from-background dark:to-primary-800 bg-gradient-to-br bg-clip-text text-transparent lg:tracking-tighter"
            >
              Momentum
            </Typography>
          </div>
          <Image src="/images/app.png" alt="Momentum" width={40} height={40} />
        </div> */}{" "}
        {/* <Typography
          as="h2"
          variant="display-lg/semibold"
          className="from-foreground to-primary-900 dark:from-background dark:to-primary-800 bg-gradient-to-br bg-clip-text text-transparent lg:tracking-tighter"
        >
          Momentum
        </Typography> */}
        <div className="text-primary-foreground relative flex h-full w-full flex-col justify-end bg-foreground text-center dark:bg-neutral-900/50">
          <div className="z-40 mb-14 px-8 text-left text-3xl font-semibold text-background dark:text-foreground">
            Explore the world’s leading design portfolios. Millions of designers
            and agencies around the world showcase their portfolio work on
            Flowbite.
          </div>
          <div className="relative mb-10 flex h-[60%] w-full items-end justify-end rounded opacity-60">
            <div className="relative isolate flex h-full w-full items-end justify-end p-2 pr-0">
              <img
                // src="/images/app.png"
                src="/images/app-2.png"
                alt="Momentum"
                // layout="fill"
                className="absolute h-full w-fit rounded-l border border-r-0 border-foreground-light object-contain dark:border-foreground-muted-light"
              />
              <GradientBackground />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
