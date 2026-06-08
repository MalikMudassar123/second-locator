"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 will-change-transform",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-[0_0_0_1px_rgba(96,165,250,0.4),0_8px_30px_-8px_rgba(59,130,246,0.7)] hover:scale-[1.03] hover:shadow-[0_0_0_1px_rgba(96,165,250,0.6),0_12px_50px_-8px_rgba(59,130,246,0.9)]",
        secondary:
          "glass text-ink-muted hover:text-white hover:scale-[1.03]",
        ghost: "text-ink-subtle hover:text-white",
      },
      size: {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(button({ variant, size }), className)} {...props} />
  );
}
