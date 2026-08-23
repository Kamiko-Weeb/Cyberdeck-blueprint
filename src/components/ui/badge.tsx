import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 font-display text-xs font-semibold uppercase tracking-[0.14em]",
  {
    variants: {
      variant: {
        default: "bg-elevated text-muted shadow-[var(--shadow-border)]",
        accent: "bg-accent text-accent-fg",
        danger: "bg-danger/15 text-danger",
        ok: "bg-ok/15 text-ok",
        warn: "bg-warn/15 text-warn",
        pos: "bg-wire-pos/15 text-wire-pos",
        v5: "bg-wire-5v/15 text-wire-5v",
        gnd: "bg-elevated text-muted",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
