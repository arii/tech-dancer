# 1. src/pages/Resources.tsx fixes
sed -i 's/ml-2/ml-2/g' src/pages/Resources.tsx # Wait, this doesn't fix it. I need to replace ml-2 with Box margin.
sed -i 's/className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/className="w-4 h-4 group-hover:translate-x-1 transition-transform"/g' src/pages/Resources.tsx
# But wait, Button is a Stack internally maybe? Or if we want ml-2 we can wrap ArrowRight in Box:
# <Box marginLeft={2} as="span"><ArrowRight ... /></Box>
