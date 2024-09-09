import { CalendarIcon, ChevronRight } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appPaths } from "@/config/app";
import { Button, ButtonLink } from "../ui/button";
import { UserIcon } from "../icons";
import { Timeline } from "@/components/xeokit/data-select-timeline";
import { ShareDialog } from "./share-dialog";
import { ThemeSwitch } from "./theme-select";

export function Topbar() {
  return (
    <div>
      <div className="flex h-12 w-full items-center bg-background px-4 dark:bg-[#212121]">
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
          <div className="h-8 w-0.5 bg-background"></div>
          <div className="flex h-full items-center gap-x-1.5">
            <p>Construction site with IFC files</p>
            <ChevronRight className="w-5" />
            {/* <p className="font-normal inline-flex items-center gap-x-2">
            <span>
              <CalendarIcon className="w-4" />
            </span>
            {formatDate(selectedDate.date)}{" "}
          </p> */}
            <p className="inline-flex items-center gap-x-2 font-normal">
              <span>
                <CalendarIcon className="w-4" />
              </span>
              9/27/2022, 4:00 PM
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-5 pr-2">
          <ShareDialog />
          <UserMenu />
          <ThemeSwitch />
        </div>
      </div>
      <div>
        <Timeline />
      </div>
    </div>
  );
}

export function UserMenu() {
  const { data: session } = useSession();

  return session?.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="material" size="sm">
          {/* <Avatar className="mr-2 h-6 w-6">
          <AvatarImage src={generateAvatarUrl(session?.user?.name)} />
          <AvatarFallback className="mr-2 h-6 w-6 rounded-full bg-gradient-to-br from-primary-700 to-primary-500"></AvatarFallback>
        </Avatar> */}
          <UserIcon />
          <p className="ml-2 pb-0.5">{session.user.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 bg-background">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => signOut()}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <ButtonLink
      href={appPaths.login}
      variant="material"
      // leftIcon={<LogIn className="w-4" />}
      className="whitespace-nowrap"
      size="sm"
    >
      Sign in
    </ButtonLink>
  );
}
