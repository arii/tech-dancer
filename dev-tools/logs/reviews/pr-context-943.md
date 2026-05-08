# PR Context: #943 — Refactor WSDCReminders into sub-components
**Author:** @arii

## Description
This PR refactors the WSDCReminders component by extracting the TimelineRow logic and its associated icon mapping into a separate TimelineRow.tsx file. This reduces the complexity of the main WSDCReminders.tsx file and improves maintainability.

Key changes:
- Created src/features/lab/wsdc-reminders/TimelineRow.tsx.
- Moved TimelineRow component and ICON_MAP to the new file.
- Updated WSDCReminders.tsx to import and use the new TimelineRow component.
- Removed unnecessary React imports to comply with project anti-pattern rules.

Fixes #901

---
*PR created automatically by Jules for task [9754922138867038239](https://jules.google.com/task/9754922138867038239) started by @arii*

## Files Changed
- 🟢 `dev-tools/tdw_services.egg-info/PKG-INFO`
- 🟢 `dev-tools/tdw_services.egg-info/SOURCES.txt`
- 🟢 `dev-tools/tdw_services.egg-info/dependency_links.txt`
- 🟢 `dev-tools/tdw_services.egg-info/entry_points.txt`
- 🟢 `dev-tools/tdw_services.egg-info/requires.txt`
- 🟢 `dev-tools/tdw_services.egg-info/top_level.txt`
- 🟢 `src/features/lab/wsdc-reminders/TimelineRow.tsx`
- 🟡 `src/features/lab/wsdc-reminders/WSDCReminders.tsx`
- 🟡 `src/features/lab/wsdc-reminders/types.ts`

## Diffs

### `dev-tools/tdw_services.egg-info/PKG-INFO` (added)
```diff
@@ -0,0 +1,12 @@
   1 |+Metadata-Version: 2.4
   2 |+Name: tdw_services
   3 |+Version: 0.1.0
   4 |+Summary: Tech-Dancer DevTools SDK
   5 |+Author: Tech-Dancer Team
   6 |+Requires-Python: >=3.8
   7 |+Requires-Dist: requests>=2.0.0
   8 |+Requires-Dist: google-genai
   9 |+Requires-Dist: python-dotenv
  10 |+Requires-Dist: pydantic
  11 |+Requires-Dist: click
  12 |+Requires-Dist: PyGithub
```

### `dev-tools/tdw_services.egg-info/SOURCES.txt` (added)
```diff
@@ -0,0 +1,15 @@
   1 |+README.md
   2 |+pyproject.toml
   3 |+tdw_services/__init__.py
   4 |+tdw_services/cli.py
   5 |+tdw_services/orchestrator.py
   6 |+tdw_services.egg-info/PKG-INFO
   7 |+tdw_services.egg-info/SOURCES.txt
   8 |+tdw_services.egg-info/dependency_links.txt
   9 |+tdw_services.egg-info/entry_points.txt
  10 |+tdw_services.egg-info/requires.txt
  11 |+tdw_services.egg-info/top_level.txt
  12 |+tdw_services/services/__init__.py
  13 |+tdw_services/services/gemini.py
  14 |+tdw_services/services/github.py
  15 |+tdw_services/services/jules.py
  16 |\ No newline at end of file
```

### `dev-tools/tdw_services.egg-info/dependency_links.txt` (added)
```diff

```

### `dev-tools/tdw_services.egg-info/entry_points.txt` (added)
```diff
@@ -0,0 +1,2 @@
   1 |+[console_scripts]
   2 |+td-cli = tdw_services.cli:cli
```

### `dev-tools/tdw_services.egg-info/requires.txt` (added)
```diff
@@ -0,0 +1,6 @@
   1 |+requests>=2.0.0
   2 |+google-genai
   3 |+python-dotenv
   4 |+pydantic
   5 |+click
   6 |+PyGithub
```

### `dev-tools/tdw_services.egg-info/top_level.txt` (added)
```diff
@@ -0,0 +1 @@
   1 |+tdw_services
```

### `src/features/lab/wsdc-reminders/TimelineRow.tsx` (added)
```diff
@@ -0,0 +1,71 @@
   1 |+import { Calendar, Plane, Hotel, Trophy, ShieldCheck, CheckCircle2, type LucideIcon } from 'lucide-react';
   2 |+import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
   3 |+import { TimelineItem } from './types';
   4 |+
   5 |+const ICON_MAP: Record<string, LucideIcon> = {
   6 |+  'flight-track': Plane,
   7 |+  'early-bird': Trophy,
   8 |+  'hotel-block': Hotel,
   9 |+  'comp-window': CheckCircle2,
  10 |+  'cancel-safety': ShieldCheck,
  11 |+};
  12 |+
  13 |+interface TimelineRowProps {
  14 |+  item: TimelineItem;
  15 |+  formattedDate: string;
  16 |+  onSync: (item: TimelineItem) => void;
  17 |+}
  18 |+
  19 |+export function TimelineRow({ item, formattedDate, onSync }: TimelineRowProps) {
  20 |+  const Icon = ICON_MAP[item.id] || Calendar;
  21 |+
  22 |+  return (
  23 |+    <Box position="relative" display="flex" gap={{ base: 4, sm: 10 }} className="group">
  24 |+      {/* Dot / Icon */}
  25 |+      <Box
  26 |+        display="flex"
  27 |+        align="center"
  28 |+        justify="center"
  29 |+        width={10}
  30 |+        height={10}
  31 |+        radius="full"
  32 |+        border
  33 |+        surface="surface"
  34 |+        color="accent"
  35 |+        zIndex={10}
  36 |+        className="shrink-0 group-hover:border-accent transition-colors shadow-sm"
  37 |+      >
  38 |+        <Icon className="w-5 h-5" />
  39 |+      </Box>
  40 |+
  41 |+      <Box flex={1} border radius="lg" padding={6} surface="surface" className="hover:border-accent/40 transition-all">
  42 |+        <Grid cols={{ base: 1, md: 4 }} gap={4} align="center">
  43 |+          <Box className="md:col-span-1">
  44 |+            <Text variant="mono" size="xs" color="accent" weight="font-bold">
  45 |+              {formattedDate}
  46 |+            </Text>
  47 |+          </Box>
  48 |+          <Box className="md:col-span-2">
  49 |+            <Stack gap={1}>
  50 |+              <Text variant="headline" size="md" weight="font-black" className="uppercase tracking-tight">{item.label}</Text>
  51 |+              <Text size="sm" color="dim" className="leading-relaxed">{item.description}</Text>
  52 |+            </Stack>
  53 |+          </Box>
  54 |+          <Box display="flex" justify={{ base: 'start', md: 'end' }}>
  55 |+            <Button
  56 |+              variant="outline"
  57 |+              size="sm"
  58 |+              onClick={() => onSync(item)}
  59 |+              className="h-10"
  60 |+            >
  61 |+              <Box display="flex" align="center" gap={2} paddingX={4}>
  62 |+                <Calendar className="w-3 h-3" />
  63 |+                <Text as="span" size="xs" weight="font-bold" uppercase className="tracking-widest">Sync</Text>
  64 |+              </Box>
  65 |+            </Button>
  66 |+          </Box>
  67 |+        </Grid>
  68 |+      </Box>
  69 |+    </Box>
  70 |+  );
  71 |+}
```

### `src/features/lab/wsdc-reminders/WSDCReminders.tsx` (modified)
```diff
@@ -1,75 +1,11 @@
     |-import React, { useState, useMemo } from 'react';
     |-import { Calendar, Download, Plus, Search, Globe, AlertCircle, CheckCircle2, Plane, Hotel, Trophy, ShieldCheck } from 'lucide-react';
   1 |+import { useState, useMemo } from 'react';
   2 |+import { Download, Plus, Search, Globe, AlertCircle } from 'lucide-react';
   3 | import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
   4 | import { getEvents } from '@/lib/content';
   5 | import { calculateTimeline } from './lib/timeline-engine';
   6 | import { generateICS, downloadICS } from './lib/ics-generator';
   7 | import { EventAnchors, TimelineItem } from './types';
     |-
     |-const ICON_MAP: Record<string, React.ReactNode> = {
     |-  'flight-track': <Plane className="w-5 h-5" />,
     |-  'early-bird': <Trophy className="w-5 h-5" />,
     |-  'hotel-block': <Hotel className="w-5 h-5" />,
     |-  'comp-window': <CheckCircle2 className="w-5 h-5" />,
     |-  'cancel-safety': <ShieldCheck className="w-5 h-5" />,
     |-};
     |-
     |-interface TimelineRowProps {
     |-  item: TimelineItem;
     |-  onSync: (item: TimelineItem) => void;
     |-}
     |-
     |-function TimelineRow({ item, onSync }: TimelineRowProps) {
     |-  return (
     |-    <Box position="relative" display="flex" gap={{ base: 4, sm: 10 }} className="group">
     |-      {/* Dot / Icon */}
     |-      <Box
     |-        display="flex"
     |-        align="center"
     |-        justify="center"
     |-        width={10}
     |-        height={10}
     |-        radius="full"
     |-        border
     |-        surface="surface"
     |-        color="accent"
     |-        zIndex={10}
     |-        className="shrink-0 group-hover:border-accent transition-colors shadow-sm"
     |-      >
     |-        {ICON_MAP[item.id] || <Calendar className="w-5 h-5" />}
     |-      </Box>
     |-
     |-      <Box flex={1} border radius="lg" padding={6} surface="surface" className="hover:border-accent/40 transition-all">
     |-        <Grid cols={{ base: 1, md: 4 }} gap={4} align="center">
     |-          <Box className="md:col-span-1">
     |-            <Text variant="mono" size="xs" color="accent" weight="font-bold">
     |-              {item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
     |-            </Text>
     |-          </Box>
     |-          <Box className="md:col-span-2">
     |-            <Stack gap={1}>
     |-              <Text variant="headline" size="md" weight="font-black" className="uppercase tracking-tight">{item.label}</Text>
     |-              <Text size="sm" color="dim" className="leading-relaxed">{item.description}</Text>
     |-            </Stack>
     |-          </Box>
     |-          <Box display="flex" justify={{ base: 'start', md: 'end' }}>
     |-            <Button
     |-              variant="outline"
     |-              size="sm"
     |-              onClick={() => onSync(item)}
     |-              className="h-10"
     |-            >
     |-              <Box display="flex" align="center" gap={2} paddingX={4}>
     |-                <Calendar className="w-3 h-3" />
     |-                <Text as="span" size="xs" weight="font-bold" uppercase className="tracking-widest">Sync</Text>
     |-              </Box>
     |-            </Button>
     |-          </Box>
     |-        </Grid>
     |-      </Box>
     |-    </Box>
     |-  );
     |-}
   8 |+import { TimelineRow } from './TimelineRow';
   9 | 
  10 | export default function WSDCReminders() {
  11 |   const events = useMemo(() => getEvents().filter(e => e.startDate && e.earlyBirdDate && e.hotelCutoffDate), []);
@@ -97,7 +33,10 @@ export default function WSDCReminders() {
  33 | 
  34 |   const timeline = useMemo(() => {
  35 |     if (!activeEvent.startDate || !activeEvent.earlyBirdDate || !activeEvent.hotelCutoffDate) return [];
     |-    return calculateTimeline(activeEvent);
  36 |+    return calculateTimeline(activeEvent).map(item => ({
  37 |+      ...item,
  38 |+      formattedDate: item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  39 |+    }));
  40 |   }, [activeEvent]);
  41 | 
  42 |   const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
@@ -244,7 +183,12 @@ export default function WSDCReminders() {
 183 | 
 184 |             <Stack gap={6}>
 185 |               {timeline.map((item) => (
     |-                <TimelineRow key={item.id} item={item} onSync={handleSingleSync} />
 186 |+                <TimelineRow
 187 |+                  key={item.id}
 188 |+                  item={item}
 189 |+                  formattedDate={item.formattedDate!}
 190 |+                  onSync={handleSingleSync}
 191 |+                />
 192 |               ))}
 193 |             </Stack>
 194 |           </Box>
```

### `src/features/lab/wsdc-reminders/types.ts` (modified)
```diff
@@ -11,4 +11,5 @@ export interface TimelineItem {
  11 |   date: Date;
  12 |   label: string;
  13 |   description: string;
  14 |+  formattedDate?: string;
  15 | }
```