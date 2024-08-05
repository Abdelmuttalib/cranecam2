import { useState, Fragment, type ReactNode } from "react";
import * as React from "react";
import { cn } from "@/lib/cn";
import { useRouter } from "next/router";
import { IconButton } from "../ui/icon-button";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Typography } from "@/components/ui/typography";
import { LayoutContainer } from "@/components/ui/container";
import SideBar from "./sidebar";

import {
  formatDateShortMonthWithoutYear,
  formatDateShortWithoutYear,
  getDateMonth,
} from "@/lib/date";
import { DateField } from "@/types";
import { organizeData } from "@/context/render-view";
// import { Button } from "@/components/ui/button";
// import { CompareIcon } from "./icons";
import { PotreeDate } from "@/types";
import { RenderViewProvider } from "@/context/render-view";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { useRenderView } from "@/hooks/use-render-view";
import { formatDate } from "@/lib/date";

interface HeaderProps {
  pageTitle: string | ReactNode;
  actions: ReactNode;
}
// Header
function Header({ pageTitle, actions }: HeaderProps) {
  const { pathname } = useRouter();
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);

  return (
    <>
      {showSidebarMenu && (
        <SideBar mode="mobile" setShowSidebarMenu={setShowSidebarMenu} />
      )}
      <header className="z-40 w-full flex-none backdrop-blur-md lg:pl-0">
        <LayoutContainer>
          <div className="flex h-16 items-center justify-between overflow-y-hidden">
            <div className="flex w-full items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <IconButton
                  className={cn("", {
                    flex: pathname === "/",
                    "flex xl:hidden": pathname !== "/",
                  })}
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowSidebarMenu((prev) => !prev)}
                >
                  <Bars3Icon className="w-6" />
                </IconButton>
                <div className="block dark:text-gray-200 print:hidden">
                  <Typography
                    as="h1"
                    variant="xl/semibold"
                    className="capitalize"
                  >
                    {pageTitle}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="mt-1.5 hidden items-center gap-2 sm:flex">
              {actions}
            </div>
          </div>
        </LayoutContainer>
      </header>
    </>
  );
}

// Footer
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t px-4 py-4 text-gray-700 lg:px-6">
      <div className="w-full text-center md:text-left">
        <Typography as="h5" variant="sm/regular" className="mb-1">
          Momentum
        </Typography>
        <Typography as="h5" variant="sm/regular" className="mb-1">
          Copyright © {new Date().getFullYear()} invix. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

interface LayoutProps {
  pageTitle: string | ReactNode;
  children: ReactNode;
  rightSideActions?: ReactNode;
  className?: string;
}

export default function Layout({
  pageTitle,
  children,
  rightSideActions,
  className,
}: LayoutProps) {
  return (
    <div className="fixed left-0 top-0 flex h-full min-h-[100svh] w-screen min-w-full overflow-auto antialiased">
      <aside>
        <SideBar mode="normal" />
        {/* <MobileNav /> */}
      </aside>
      <div className="flex h-full w-full flex-col overflow-auto">
        <Header pageTitle={pageTitle} actions={rightSideActions} />
        <main className={cn("relative w-full flex-grow pb-10 pt-2", className)}>
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

type DataViewProps = {
  data: PotreeDate;
};

export function DataView({ data }: DataViewProps) {
  return (
    <RenderViewProvider data={data}>
      <div className="relative flex h-full min-h-screen w-full flex-col">
        <div className="flex w-full flex-col items-center justify-center bg-zinc-950 font-semibold text-gray-100">
          <Navbar />
          <DateTimeline />
        </div>
        <Viewer />
      </div>
    </RenderViewProvider>
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

import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { CopyIcon, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Viewer } from "../xeokit/viewer";

export function ShareDialog() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // const url = window ? window.location.href : "";
  const url = "rl";

  function copyToClipboard() {
    navigator.clipboard.writeText(url).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      },
    );
  }

  return (
    <>
      {/* <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Open dialog
      </button> */}
      <Button onClick={openModal} leftIcon={<Share2 className="w-[17px]" />}>
        Share
      </Button>
      {/* <Button

        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Share
      </Button> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-layer p-6 text-left align-middle text-foreground shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Share Construction site
                  </Dialog.Title>
                  <div className="mt-6 flex items-center gap-x-2">
                    <Input
                      type="text"
                      value={url}
                      disabled
                      // className="w-full p-2 rounded-md bg-zinc-900/10 text-zinc-400 border-zinc-800 text-white/90 focus:outline-none"
                    />
                    <Button
                      //   className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
                      variant="outline"
                      onClick={copyToClipboard}
                      className="space-x-1.5 active:bg-zinc-400"
                    >
                      <CopyIcon className="w-4" />
                      <span>Copy</span>
                    </Button>
                    {/* <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p> */}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      //   className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
                      onClick={closeModal}
                    >
                      Close
                    </Button>
                    {/* <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Done
                    </button> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

type ACC = {
  [key: string]: DateField[];
};

export function DateTimeline() {
  const { data, selectedDate, handleDateChange } = useRenderView();

  // Function to group dates by month
  const groupedDates = data.reduce((acc: ACC, dateObj) => {
    const month = getDateMonth(dateObj.date);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(dateObj);
    return acc;
  }, {});

  const totalDates = Object.values(groupedDates).reduce(
    (acc, datesInMonth) => acc + datesInMonth.length,
    0,
  );

  return (
    <div className="flex h-24 w-full bg-layer-3">
      <div className="flex h-full w-full items-end divide-x divide-border-light">
        {Object.keys(groupedDates).map((month) => {
          const datesInMonth = groupedDates[month];
          const percentageWidth =
            (datesInMonth?.length ?? 0 ?? 0 / totalDates) * 100;

          return (
            <div
              key={month}
              className="flex w-full flex-col items-center justify-center"
              style={{ flex: `1 1 ${percentageWidth}%` }}
            >
              {/* Dates in the month */}
              <div className="flex w-full justify-evenly">
                {datesInMonth?.map((dateObj) => {
                  const { date } = dateObj;
                  const selected = selectedDate.date === date;

                  return (
                    <button
                      key={date}
                      className="z-10 -mb-1 flex w-fit flex-col items-center text-sm"
                      onClick={() => handleDateChange(dateObj)}
                    >
                      <span
                        className={cn(
                          "inline-flex rounded-lg p-1.5 px-2 text-xs font-medium text-background",
                          {
                            "bg-blue-500 text-white": selected,
                            "bg-foreground": !selected, //  hover:bg-zinc-300
                          },
                        )}
                      >
                        {/* <span className="border-r mr-1 border-zinc-300 pr-1">
                          <CalendarIcon />
                        </span> */}
                        {formatDateShortWithoutYear(date)}
                      </span>
                      <span
                        className={cn("h-4 w-0.5 bg-foreground-light", {
                          "bg-blue-400": selected,
                        })}
                      ></span>
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full bg-foreground-light",
                          {
                            "bg-blue-400": selected,
                            "bg-foreground-light": !selected,
                          },
                        )}
                      ></span>
                    </button>
                  );
                })}
              </div>

              {/* Month */}
              <div className="flex h-6 w-full items-center justify-center space-x-1 border-t border-t-border bg-layer-2 text-xs font-normal text-foreground-light">
                <CalendarIcon />
                <span>{month}</span>
              </div>
            </div>
          );
        })}
        {/* {data.map((dateObj) => {
          const { date } = dateObj;
          const selected = selectedDate.date === date;

          return (
            <div
              key={date}
              className="w-full justify-center items-center flex flex-col"
            >
              <button
                className="flex -mb-1 z-10 flex-col w-fit items-center text-sm"
                onClick={() => handleDateChange(dateObj)}
              >
                <span
                  className={cn(
                    "text-zinc-900 inline-flex font-medium p-1.5 px-2 rounded-lg text-xs",
                    {
                      "bg-blue-500 text-white": selected,
                      "bg-white hover:bg-zinc-300": !selected,
                    }
                  )}
                >
                  <span className="border-r mr-1 border-zinc-300 pr-1">
                    <CalendarIcon />
                  </span>
                  {formatDateShort(date)}
                </span>
                <span
                  className={cn("w-0.5 h-4 bg-zinc-300", {
                    "bg-blue-400": selected,
                  })}
                ></span>
                <span
                  className={cn("w-2.5 h-2.5 bg-white rounded-full", {
                    "bg-blue-400": selected,
                    "bg-zinc-200": !selected,
                  })}
                ></span>
              </button>
              <div className="h-6 w-full flex items-center text-zinc-300 border-t border-t-zinc-700 bg-zinc-900/60 text-xs font-normal justify-center">
                {getDateMonth(date)}
              </div>
            </div>
          );
        })} */}
      </div>
      {/* <div className="flex justify-center border-t border-l border-zinc-700 items-center px-3 bg-zinc-900">
        <Button
          // onClick={onCompare}
          className="rounded-full bg-blue-500 space-x-1"
        >
          <CompareIcon className="w-5 h-5" />
          <span>Compare</span>
        </Button>
      </div> */}
    </div>
  );
}

const data = {
  status: "success",
  msg: "成功",
  result: [
    {
      "2024-02-25":
        "http://47.97.51.98:6093/temp/2024-02-25/J72304752/perugia/perugia.html",
      "2024-03-03":
        "http://47.97.51.98:6093/temp/2024-03-03/J72304752/perugia/perugia.html",
      "2024-03-10":
        "http://47.97.51.98:6093/temp/2024-03-10/J72304752/dense/perugia/perugia.html",
      "2024-04-17":
        "http://47.97.51.98:6093/temp/2024-04-17/J72304752/dense/perugia/perugia.html",
      "2024-04-21":
        "http://47.97.51.98:6093/temp/2024-04-21/J72304752/dense/perugia/perugia.html",
    },
  ],
  resultTest: [
    {
      "2024-02-25":
        "http://47.97.51.98:6093/temp/2024-02-25/J72304752/perugia/pointclouds/perugia/metadata.json",
      "2024-03-03":
        "http://47.97.51.98:6093/temp/2024-03-03/J72304752/perugia/pointclouds/perugia/metadata.json",
      "2024-03-10":
        "http://47.97.51.98:6093/temp/2024-03-10/J72304752/dense/perugia/pointclouds/perugia/metadata.json",
      "2024-04-17":
        "http://47.97.51.98:6093/temp/2024-04-17/J72304752/dense/perugia/pointclouds/perugia/metadata.json",
      "2024-04-21":
        "http://47.97.51.98:6093/temp/2024-04-21/J72304752/dense/perugia/pointclouds/perugia/metadata.json",
    },
  ],
};

export function Timeline() {
  const processedData = organizeData(data);

  const [selectedDate, setSelectedDate] = React.useState(processedData[0]);

  const handleDateChange = (date: DateField) => {
    setSelectedDate(date);
  };

  // Function to group dates by month
  const groupedDates = processedData.reduce((acc: ACC, dateObj) => {
    const month = getDateMonth(dateObj.date);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(dateObj);
    return acc;
  }, {});

  const totalDates = Object.values(groupedDates).reduce(
    (acc, datesInMonth) => acc + datesInMonth.length,
    0,
  );

  // #212121
  // #424242

  return (
    <div className="flex h-24 w-full bg-layer-3">
      <div className="flex h-full w-full items-end divide-x divide-border-light">
        {Object.keys(groupedDates).map((month) => {
          const datesInMonth = groupedDates[month];
          const percentageWidth =
            (datesInMonth?.length ?? 0 / totalDates) * 100;

          return (
            <div
              key={month}
              className="flex w-full flex-col items-center justify-center"
              style={{ flex: `1 1 ${percentageWidth}%` }}
            >
              {/* Dates in the month */}
              <div className="flex w-full justify-evenly">
                {datesInMonth?.map((dateObj) => {
                  const { date } = dateObj;
                  const selected = selectedDate?.date === date;

                  return (
                    <button
                      key={date}
                      className="relative z-10 -mb-1 flex w-fit max-w-[60px] flex-col items-center rounded-t text-sm"
                      onClick={() => handleDateChange(dateObj)}
                    >
                      <img
                        src="/date-1.png"
                        // width={55}
                        // height={35}
                        className="h-11 w-full rounded-t border border-b-0 border-foreground-muted-light object-cover"
                      />
                      <span
                        className={cn(
                          "inline-flex w-full justify-center rounded rounded-t-none border border-t-0 border-foreground-muted-light px-1 text-[11px] font-medium text-background",
                          {
                            "bg-blue-500 text-white": selected,
                            "bg-foreground-light dark:bg-foreground": !selected, //  hover:bg-zinc-300
                          },
                        )}
                      >
                        {/* <span className="border-r mr-1 border-zinc-300 pr-1">
                          <CalendarIcon />
                        </span> */}
                        {formatDateShortMonthWithoutYear(date)}
                      </span>
                      <span
                        className={cn("h-2 w-0.5", {
                          "bg-blue-500 dark:bg-blue-500": selected,
                          "bg-foreground-light dark:bg-foreground": !selected,
                        })}
                      ></span>
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full bg-foreground-light",
                          {
                            "bg-blue-500": selected,
                            "bg-foreground-light dark:bg-foreground": !selected,
                          },
                        )}
                      ></span>
                    </button>
                  );
                })}
              </div>

              {/* Month */}
              <div className="flex h-[17px] w-full items-center justify-center space-x-1 border-t border-t-border-light bg-layer-2 text-xs font-normal text-foreground">
                <CalendarIcon className="w-3" />
                <span>{month}</span>
              </div>
            </div>
          );
        })}
        {/* {data.map((dateObj) => {
          const { date } = dateObj;
          const selected = selectedDate.date === date;

          return (
            <div
              key={date}
              className="w-full justify-center items-center flex flex-col"
            >
              <button
                className="flex -mb-1 z-10 flex-col w-fit items-center text-sm"
                onClick={() => handleDateChange(dateObj)}
              >
                <span
                  className={cn(
                    "text-zinc-900 inline-flex font-medium p-1.5 px-2 rounded-lg text-xs",
                    {
                      "bg-blue-500 text-white": selected,
                      "bg-white hover:bg-zinc-300": !selected,
                    }
                  )}
                >
                  <span className="border-r mr-1 border-zinc-300 pr-1">
                    <CalendarIcon />
                  </span>
                  {formatDateShort(date)}
                </span>
                <span
                  className={cn("w-0.5 h-4 bg-zinc-300", {
                    "bg-blue-400": selected,
                  })}
                ></span>
                <span
                  className={cn("w-2.5 h-2.5 bg-white rounded-full", {
                    "bg-blue-400": selected,
                    "bg-zinc-200": !selected,
                  })}
                ></span>
              </button>
              <div className="h-6 w-full flex items-center text-zinc-300 border-t border-t-zinc-700 bg-zinc-900/60 text-xs font-normal justify-center">
                {getDateMonth(date)}
              </div>
            </div>
          );
        })} */}
      </div>
      {/* <div className="flex justify-center border-t border-l border-zinc-700 items-center px-3 bg-zinc-900">
        <Button
          // onClick={onCompare}
          className="rounded-full bg-blue-500 space-x-1"
        >
          <CompareIcon className="w-5 h-5" />
          <span>Compare</span>
        </Button>
      </div> */}
    </div>
  );
}
