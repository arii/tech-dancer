import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cn } from "@/lib/utils"

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
        "group/tabs flex gap-8 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      className={cn(
        "group/tabs-list border-b border-line w-full flex flex-row items-stretch gap-0",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "relative inline-flex h-full items-center justify-center gap-2 px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap text-text-dim transition-all hover:text-text-main focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-brand disabled:pointer-events-none disabled:opacity-50",
        "data-active:text-accent-brand data-active:after:content-[''] data-active:after:absolute data-active:after:bottom-0 data-active:after:left-0 data-active:after:w-full data-active:after:h-[2px] data-active:after:bg-accent-brand",
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
      className={cn("flex-1 text-sm outline-none pt-8", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
