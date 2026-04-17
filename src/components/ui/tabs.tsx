import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { radius, borders, spacing } from "@/styles/design-tokens"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-4 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center p-[2px] text-text-dim group-data-horizontal/tabs:h-10 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-surface border border-line",
        line: "gap-4 bg-transparent",
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

function TabsList({
  className,
  variant = "default",
  radius = "none",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant, radius }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-full flex-1 items-center justify-center gap-2 px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap text-text-dim transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-text-main focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-brand disabled:pointer-events-none disabled:opacity-50",
        "data-active:bg-bg data-active:text-text-main data-active:shadow-none",
        "group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:text-accent-brand",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
