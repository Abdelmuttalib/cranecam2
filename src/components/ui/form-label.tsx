import { cn } from "@/lib/cn";
import React from "react";

type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function FormLabel({ className, ...props }: FormLabelProps) {
  return (
    <label
      // className="block text-sm font-medium leading-6 text-gray-900"
      className={cn("text-foreground block text-sm leading-none", className)}
      {...props}
    />
  );
}
