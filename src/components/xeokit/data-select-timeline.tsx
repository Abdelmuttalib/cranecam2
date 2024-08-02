import * as React from "react";
import {
  formatDateShortMonthWithoutYear,
  formatDateShortWithoutYear,
  getDateMonth,
} from "@/lib/date";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useRenderView } from "@/hooks/use-render-view";
import { DateField } from "@/types";
import { organizeData } from "@/context/render-view";
import { cn } from "@/lib/cn";
import { Button } from "../ui/button";
import { CompareIcon } from "../icons";
// import { Button } from "@/components/ui/button";
// import { CompareIcon } from "./icons";

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
          const percentageWidth = (datesInMonth.length / totalDates) * 100;

          return (
            <div
              key={month}
              className="flex w-full flex-col items-center justify-center"
              style={{ flex: `1 1 ${percentageWidth}%` }}
            >
              {/* Dates in the month */}
              <div className="flex w-full justify-evenly">
                {datesInMonth.map((dateObj) => {
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
  // #212121
  // #424242
  // #424242
  // #303030
  // #0191ea

  const { setCompareMode } = useRenderView();

  return (
    <div className="flex h-24 w-full bg-layer-3 dark:bg-[#424242]">
      <div className="flex h-full w-full items-end divide-x divide-border-light">
        {Object.keys(groupedDates).map((month) => {
          const datesInMonth = groupedDates[month];
          const percentageWidth = (datesInMonth.length / totalDates) * 100;

          return (
            <div
              key={month}
              className="flex w-full flex-col items-center justify-center"
              style={{ flex: `1 1 ${percentageWidth}%` }}
            >
              {/* Dates in the month */}
              <div className="flex w-full justify-evenly">
                {datesInMonth.map((dateObj) => {
                  const { date } = dateObj;
                  const selected = selectedDate.date === date;

                  return (
                    <button
                      key={date}
                      className="relative z-10 -mb-1 flex w-fit max-w-[60px] flex-col items-center rounded-t text-sm"
                      onClick={() => handleDateChange(dateObj)}
                    >
                      <img
                        src="/images/date-1.png"
                        // width={55}
                        // height={35}
                        className="h-11 w-full rounded-t-sm border border-b-0 border-foreground-muted-light object-cover"
                      />
                      <span
                        className={cn(
                          "inline-flex w-full justify-center rounded-sm rounded-t-none border border-t-0 border-foreground-muted-light px-1 text-[11px] font-medium text-background",
                          {
                            "bg-[#0191ea] text-white": selected,
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
                          "bg-[#0191ea] dark:bg-[#0191ea]": selected,
                          "bg-foreground-light dark:bg-foreground": !selected,
                        })}
                      ></span>
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full bg-foreground-light",
                          {
                            "bg-[#0191ea]": selected,
                            "bg-foreground-light dark:bg-foreground": !selected,
                          },
                        )}
                      ></span>
                    </button>
                  );
                })}
              </div>

              {/* Month */}
              <div className="flex h-[17px] w-full items-center justify-center space-x-1 border-t border-t-border-light bg-layer-2 text-xs font-normal text-foreground dark:bg-[#212121]">
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
      <div className="flex items-center justify-center border-l border-t border-zinc-700 bg-[#212121] px-3">
        <Button
          // onClick={onCompare}
          className="space-x-1 rounded-full bg-[#0191ea] font-semibold"
          leftIcon={<CompareIcon className="w-6" />}
          onClick={() => setCompareMode(true)}
        >
          Compare
        </Button>
      </div>
    </div>
  );
}
