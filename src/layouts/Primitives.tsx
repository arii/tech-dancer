export * from "./Box"
export * from "./Stack"
export * from "./Text"
export * from "./Grid"
export * from "./Button"
export * from "./system-utils"

import { Text } from "./Text"

export const SystemMarker = ({ code }: { code: string }) => (
  <Text variant="system" size="micro" className="select-none text-text-dim/50">
    {`// SYS.${code}`}
  </Text>
);
