import { cn } from "@/lib/cn";

type LayoutContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function LayoutContainer({ children, className }: LayoutContainerProps) {
  return (
    <div className={cn("px-2 sm:px-4 md:px-6", className)}>{children}</div>
  );
}
