import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { radius, borders } from "@/styles/design-tokens"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-brand [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-accent-brand text-bg border-transparent",
        secondary:
          "bg-surface text-text-main border-line",
        destructive:
          "bg-red-900/10 text-red-900 border-red-900/20",
        outline:
          "border-line text-text-dim bg-transparent",
        ghost:
          "hover:bg-line text-text-dim border-transparent",
        link: "text-accent underline-offset-4 hover:underline",
      },
      radius: {
        none: radius.none,
        industrial: radius.industrial,
      }
    },
    defaultVariants: {
      variant: "default",
      radius: "none",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
