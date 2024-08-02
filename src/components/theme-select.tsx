import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";
import { useMounted } from "@/hooks/use-mounted";

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <IconButton
      type="button"
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn("text-foreground-light hidden sm:inline-flex", className)}
    >
      {theme === "light" ? (
        <SunIcon className="w-5" />
      ) : (
        <MoonIcon className="w-5" />
      )}
    </IconButton>
  );
}
