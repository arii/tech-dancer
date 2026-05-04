import fs from 'fs';

// src/features/profile/useProfile.ts
let p = fs.readFileSync('src/features/profile/useProfile.ts', 'utf8');
p = p.replace(', LucideIcon ', ' ');
fs.writeFileSync('src/features/profile/useProfile.ts', p);

// src/features/dashboard/Dashboard.tsx
let d = fs.readFileSync('src/features/dashboard/Dashboard.tsx', 'utf8');
d = d.replace("import Equalizer from '@/components/ui/Equalizer';\n", '');
d = d.replace("const { recentPosts, upcomingEvents, homeHeroLinks, tagColors } = useHome();", "const { recentPosts, upcomingEvents, homeHeroLinks } = useHome();");
fs.writeFileSync('src/features/dashboard/Dashboard.tsx', d);

// src/components/Navigation.tsx
let n = fs.readFileSync('src/components/Navigation.tsx', 'utf8');
n = n.replace("import { Search } from 'lucide-react';\n", '');
n = n.replace("import { Box } from '@/layouts/Primitives';\n", '');
n = n.replace("const { open: openSearch } = useGlobalSearch();\n", '');
n = n.replace("import { useGlobalSearch } from '@/hooks/useGlobalSearch';\n", '');
fs.writeFileSync('src/components/Navigation.tsx', n);
