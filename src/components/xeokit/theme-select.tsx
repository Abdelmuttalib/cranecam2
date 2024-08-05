import * as React from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { IconButton } from "../ui/icon-button";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton
      variant="material"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="xs"
      className="-ml-2 h-8 w-8"
    >
      {theme === "light" ? (
        <SunIcon className="w-4" />
      ) : (
        <MoonIcon className="w-4" />
      )}
    </IconButton>
  );
}

export function ThemeSelect() {
  const { theme: currentTheme, setTheme, themes } = useTheme();

  // if there is duplicate in themes, fix it

  const thms = [...new Set(themes)];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          as="button"
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "hidden border text-foreground-light sm:flex",
          )}
        >
          {/* <p className="w-5 text-foreground-light"> */}
          {currentTheme}
          {/* {currentTheme === "system" ? "🌞" : "🌙"} */}
          {/* </p> */}
        </Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-layer text-foreground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="relative">
            {thms?.map((theme) => (
              <Menu.Item key={`${theme}`}>
                <button
                  onClick={() => {
                    setTheme(theme);
                  }}
                  className={cn(
                    "flex w-full items-center px-3 py-2.5 font-medium capitalize text-foreground",
                    {
                      "bg-primary-100 text-foreground": theme === currentTheme,
                      "hover:bg-accent-hover": theme !== currentTheme,
                    },
                  )}
                >
                  {/* <span className={cn("mr-2 h-4 w-4 rounded-full")}></span> */}
                  <>{theme}</>
                  {theme == currentTheme && (
                    <CheckIcon className="absolute right-2 h-4 w-4 text-current" />
                  )}
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
