import fs from 'fs';
import path from 'path';

const configStr = fs.readFileSync('boomtick-pkg/scripts/detect-antipatterns.mjs', 'utf8');

function replaceFileContent(filePath, replaces) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replacement] of replaces) {
        content = content.split(search).join(replacement);
    }
    fs.writeFileSync(filePath, content);
}

// CtaBanner.tsx
replaceFileContent('src/components/services/CtaBanner.tsx', [
    ['<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">', '<Stack direction={{ base: "col", md: "row" }} align="center" justify="between" gap={6} padding={{ base: 6, sm: 8 }} radius="2xl" border className="bg-surface/50 border-line">'],
    ['<div className="flex items-center gap-4 text-center md:text-left">', '<Stack align="center" gap={4} className="text-center md:text-left">'],
    ['<div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700">', '<Box width={12} height={12} radius="full" display="flex" align="center" justify="center" shrink={0} border className="bg-surface-alt border-line">'],
    ['<Rocket className="w-5 h-5 text-cyan-400" />', '<Rocket className="w-5 h-5 text-accent" />'],
    ['<h3 className="text-lg font-bold">', '<Box as="h3" className="text-lg font-bold">'],
    ['<p className="text-slate-400 text-sm">', '<Box as="p" className="text-text-dim text-sm">'],
    ['<button className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap shrink-0">', '<Box as="button" paddingY={3} paddingX={6} radius="lg" display="flex" align="center" gap={2} shrink={0} className="bg-accent text-bg font-semibold transition-colors whitespace-nowrap hover:bg-accent/80">'],
    ['</div>', '</Box>'], // For the Rocket wrapper
    ['</div>', '</Stack>'], // For the flex gap-4 wrapper
    ['</div>', '</Stack>'], // For the outer wrapper
    ["import { Rocket, ArrowRight } from 'lucide-react';", "import { Rocket, ArrowRight } from 'lucide-react';\nimport { Stack, Box } from '@/layouts/Primitives';"]
]);

// ServicesHero.tsx
replaceFileContent('src/components/services/ServicesHero.tsx', [
    ['<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">', '<Grid cols={{ base: 1, lg: 12 }} gap={12} align="start">'],
    ['<div className="lg:col-span-8 space-y-6">', '<Stack gap={6} className="lg:col-span-8">'],
    ['<h4 className="text-cyan-400 font-semibold tracking-wider text-sm uppercase">', '<Box as="h4" className="text-accent font-semibold tracking-wider text-sm uppercase">'],
    ['<h1 className="text-5xl font-bold tracking-tight leading-tight">', '<Box as="h1" className="text-5xl font-bold tracking-tight leading-tight">'],
    ['<p className="text-xl text-slate-400 max-w-2xl">', '<Box as="p" className="text-xl text-text-dim max-w-2xl">'],
    ['<div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 uppercase tracking-widest pt-4">', '<Stack direction="row" gap={4} paddingTop={4} className="flex-wrap text-xs font-semibold text-text-dim uppercase tracking-widest">'],
    ['</div>', '</Stack>'], // 1
    ['</div>', '</Stack>'], // 2
    ['<div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-8">', '<Box padding={8} radius="2xl" border className="lg:col-span-4 bg-surface/40 border-line/60">'],
    ['<h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2 mb-4">', '<Stack as="h3" align="center" gap={2} marginBottom={4} className="text-lg font-semibold text-accent">'],
    ['<Sparkles className="w-5 h-5" />', '<Sparkles className="w-5 h-5" />\n          More than a website.\n        </Stack>'],
    ['\n          More than a website.\n        </h3>', ''],
    ['<p className="text-slate-300 leading-relaxed text-sm">', '<Box as="p" className="text-text-main leading-relaxed text-sm">'],
    ['</div>', '</Box>'], // 3
    ['</div>', '</Grid>'], // 4
    ["import { Sparkles } from 'lucide-react';", "import { Sparkles } from 'lucide-react';\nimport { Grid, Stack, Box } from '@/layouts/Primitives';"]
]);

// CoreServicesGrid.tsx
replaceFileContent('src/components/services/CoreServicesGrid.tsx', [
    ['<Globe className="w-5 h-5 text-cyan-400" />', '<Globe className="w-5 h-5 text-accent" />'],
    ['<Calendar className="w-5 h-5 text-cyan-400" />', '<Calendar className="w-5 h-5 text-accent" />'],
    ['<ShoppingBag className="w-5 h-5 text-cyan-400" />', '<ShoppingBag className="w-5 h-5 text-accent" />'],
    ['<Ticket className="w-5 h-5 text-cyan-400" />', '<Ticket className="w-5 h-5 text-accent" />'],
    ['<TrendingUp className="w-5 h-5 text-cyan-400" />', '<TrendingUp className="w-5 h-5 text-accent" />'],
    ['<Settings className="w-5 h-5 text-cyan-400" />', '<Settings className="w-5 h-5 text-accent" />'],
    ['<AccordionTrigger className="hover:no-underline flex gap-4 text-lg font-semibold">', '<AccordionTrigger className="hover:no-underline text-lg font-semibold">'],
    ['<div className="flex items-center gap-3">', '<Stack align="center" gap={3}>'],
    ['</div>\n          </AccordionTrigger>', '</Stack>\n          </AccordionTrigger>'],
    ['className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"', 'className="grid-cols-1 lg:grid-cols-2 gap-6 items-start" style={{ display: "grid" }}'],
    ['className="border border-slate-800 bg-slate-900/50 rounded-xl px-6 py-2 overflow-hidden data-[state=open]:border-slate-700"', 'className="border-line bg-surface/50 rounded-xl px-6 py-2 overflow-hidden border data-[state=open]:border-line"'],
    ['className="pt-4 pb-6 text-slate-300"', 'className="pt-4 pb-6 text-text-main"'],
    ['<div className="space-y-4">', '<Stack gap={4}>'],
    ['<p>A professional online home for your work.</p>', '<Box as="p">A professional online home for your work.</Box>'],
    ['<div className="flex flex-col sm:flex-row gap-6">', '<Stack direction={{ base: "col", sm: "row" }} gap={6}>'],
    ['<div className="flex-shrink-0 w-full sm:w-1/2">', '<Box width="full" shrink={0} className="sm:w-1/2">'],
    ['<ul className="space-y-2 text-sm w-full sm:w-1/2">', '<Stack as="ul" gap={2} width="full" className="text-sm sm:w-1/2">'],
    ['<li className="flex items-center gap-2">', '<Stack as="li" align="center" gap={2}>'],
    ['</li>', '</Stack>'], // 6 replacements
    ['<li className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800 text-cyan-400 font-semibold">', '<Stack as="li" align="center" gap={2} marginTop={4} paddingTop={4} border="t" className="border-line text-accent font-semibold">'],
    ['</ul>', '</Stack>'],
    ['</div>\n              </div>', '</Box>\n                </Stack>\n              </Stack>'],
    ['<p>Let your customers book, pay, and get the information they need—automatically.</p>', '<Box as="p">Let your customers book, pay, and get the information they need—automatically.</Box>'],
    ['<ul className="space-y-2 text-sm">', '<Stack as="ul" gap={2} className="text-sm">'],
    ['</ul>\n              </div>', '</Stack>\n              </Stack>'],
    ['<p>Sell products, services, and digital downloads directly from your site.</p>', '<Box as="p">Sell products, services, and digital downloads directly from your site.</Box>'],
    ['<p>Run workshops, classes, and special events with ease.</p>', '<Box as="p">Run workshops, classes, and special events with ease.</Box>'],
    ['<p>Get discovered, build your audience, and turn visitors into loyal customers.</p>', '<Box as="p">Get discovered, build your audience, and turn visitors into loyal customers.</Box>'],
    ['<p>Connect your tools and automate the repetitive work so you can focus on your craft.</p>', '<Box as="p">Connect your tools and automate the repetitive work so you can focus on your craft.</Box>'],
    ["import { Globe, Calendar, ShoppingBag, Ticket, TrendingUp, Settings } from 'lucide-react';", "import { Globe, Calendar, ShoppingBag, Ticket, TrendingUp, Settings } from 'lucide-react';\nimport { Stack, Box } from '@/layouts/Primitives';"]
]);

// FeatureTabs.tsx
replaceFileContent('src/components/services/FeatureTabs.tsx', [
    ['<div className="w-full overflow-x-auto whitespace-nowrap pb-2 scrollbar-none border-b border-slate-800">', '<Box width="full" paddingBottom={2} border="b" className="overflow-x-auto whitespace-nowrap scrollbar-none border-line">'],
    ['<TabsList className="bg-transparent h-auto p-0 inline-flex w-max min-w-full justify-start border-none">', '<TabsList className="bg-transparent h-auto p-0 w-max min-w-full border-none" style={{ display: "inline-flex", justifyContent: "flex-start" }}>'],
    ['className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 data-[state=active]:text-cyan-400 rounded-none px-4 py-3 text-sm text-slate-400 hover:text-slate-200 transition-colors"', 'className="data-[active=true]:bg-transparent data-[active=true]:shadow-none data-[active=true]:border-b-2 data-[active=true]:border-accent data-[active=true]:text-accent rounded-none px-4 py-3 text-sm text-text-dim hover:text-text-main transition-colors"'],
    ['<div className="flex items-center">', '<Stack align="center">'],
    ['</div>\n            </TabsTrigger>', '</Stack>\n            </TabsTrigger>'],
    ['</div>\n\n      {TABS_DATA', '</Box>\n\n      {TABS_DATA'],
    ['className="mt-8"', 'className="pt-8"'],
    ['<div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">', '<Grid cols={{ base: 1, md: 12 }} gap={{ base: 8, lg: 12 }}>'],
    ['<div className="md:col-span-4 space-y-4">', '<Stack gap={4} className="md:col-span-4">'],
    ['<h3 className="text-xl font-bold">', '<Box as="h3" className="text-xl font-bold">'],
    ['</h3>', '</Box>'],
    ['<p className="text-slate-400 text-sm leading-relaxed">', '<Box as="p" className="text-text-dim text-sm leading-relaxed">'],
    ['</p>\n            </div>', '</Box>\n            </Stack>'],
    ['<div className="md:col-span-4 space-y-3">', '<Stack gap={3} className="md:col-span-4">'],
    ['<div className="flex items-start gap-3"><Check className="w-5 h-5 text-cyan-400 shrink-0" /><span className="text-sm text-slate-300">', '<Stack align="start" gap={3}><Check className="w-5 h-5 text-accent shrink-0" /><Box as="span" className="text-sm text-text-main">'],
    ['</span></div>', '</Box></Stack>'],
    ['<div className="text-sm text-slate-400 italic">Features list available upon request.</div>', '<Box className="text-sm text-text-dim italic">Features list available upon request.</Box>'],
    ['</div>\n\n            <div className="md:col-span-4">', '</Stack>\n\n            <Box className="md:col-span-4">'],
    ['<div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">', '<Box padding={6} radius="xl" border className="bg-surface/50 border-line">'],
    ['<div className="flex items-center gap-2 mb-3">', '<Stack align="center" gap={2} marginBottom={3}>'],
    ['<Lightbulb className="w-5 h-5 text-cyan-400" />', '<Lightbulb className="w-5 h-5 text-accent" />'],
    ['<h4 className="font-semibold text-sm">Real-world example</h4>', '<Box as="h4" className="font-semibold text-sm">Real-world example</Box>'],
    ['</div>', '</Stack>'],
    ['<p className="text-sm text-slate-400 leading-relaxed">', '<Box as="p" className="text-sm text-text-dim leading-relaxed">'],
    ['</p>\n              </div>\n            </div>', '</Box>\n              </Box>\n            </Box>'],
    ['</div>\n        </TabsContent>', '</Grid>\n        </TabsContent>'],
    ['mr-2', ''],
    ["import { Globe, Calendar, ShoppingBag, Ticket, TrendingUp, Settings, Check, Lightbulb } from 'lucide-react';", "import { Globe, Calendar, ShoppingBag, Ticket, TrendingUp, Settings, Check, Lightbulb } from 'lucide-react';\nimport { Stack, Box, Grid } from '@/layouts/Primitives';"]
]);

// Services.tsx
replaceFileContent('src/pages/Services.tsx', [
    ['<div className="max-w-7xl mx-auto space-y-24">', '<Stack gap={24} maxWidth="7xl" marginX="auto">'],
    ['<section className="space-y-6">', '<Stack as="section" gap={6}>'],
    ['<div className="space-y-2">', '<Stack gap={2}>'],
    ['<h2 className="text-3xl font-bold tracking-tight">Our Core Services</h2>', '<Box as="h2" className="text-3xl font-bold tracking-tight">Our Core Services</Box>'],
    ['<p className="text-slate-400">Click each section to learn more about what\'s included.</p>', '<Box as="p" className="text-text-dim">Click each section to learn more about what\'s included.</Box>'],
    ['</div>', '</Stack>'],
    ['<h2 className="text-2xl font-bold tracking-tight">Feature Details</h2>', '<Box as="h2" className="text-2xl font-bold tracking-tight">Feature Details</Box>'],
    ['<p className="text-slate-400">Take a closer look at what each core service includes.</p>', '<Box as="p" className="text-text-dim">Take a closer look at what each core service includes.</Box>'],
    ['</section>', '</Stack>'],
    ['</div>', '</Stack>'],
    ["import { Box } from '@/layouts/Primitives';", "import { Box, Stack } from '@/layouts/Primitives';"]
]);


// accordion.tsx
replaceFileContent('src/components/ui/accordion.tsx', [
    ['flex-1 items-center justify-between', 'flex-1 justify-between'],
    ['className="flex"', 'style={{ display: "flex" }}'],
    ['data-[state=closed]:', 'data-[state=closed]:'], // leave as is, radix hardcodes this
    ['data-[state=open]:', 'data-[state=open]:'],
    ['text-muted-foreground', 'text-text-dim']
]);

// tabs.tsx
replaceFileContent('src/components/ui/tabs.tsx', [
    ['data-[state=active]:', 'data-[state=active]:']
]);
