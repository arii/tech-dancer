# 1. Fix React imports
sed -i 's/import React from '"'"'react'"'"';//g' src/features/contact/components/ContactFormView.tsx
sed -i "s/import React, { useId } from 'react';/import { useId, cloneElement, ReactElement } from 'react';/" src/features/contact/components/FormField.tsx
sed -i "s/children: React.ReactElement;/children: ReactElement;/" src/features/contact/components/FormField.tsx
sed -i "s/React.cloneElement/cloneElement/" src/features/contact/components/FormField.tsx
sed -i "s/import React, { useState } from 'react';/import { useState } from 'react';/" src/pages/Contact.tsx
sed -i "s/import { UseFormRegister/import { BaseSyntheticEvent } from 'react';\nimport { UseFormRegister/" src/features/contact/components/ContactFormView.tsx
sed -i "s/onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;/onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;/" src/features/contact/components/ContactFormView.tsx

# 2. Package.json audit script
sed -i '/"audit:fix": "node scripts\/ai-debugger.mjs",/d' package.json

# 3. Motion cleanup
sed -i "s/arielTransition/springTransition/g" src/styles/motion.ts
sed -i "s/arielEase/easeOutExpo/g" src/styles/motion.ts
sed -i "s/arielTransition/springTransition/g" src/components/Navigation.tsx

# 4. Remove audit artifacts
rm -f TODO_ANTIPATTERNS.md antipattern-report.txt
sed -i '/# AI Debugger/,+4d' .gitignore

# 5. Fix useSearchHighlight indirection
sed -i "s/import { useSearchHighlight } from '@\/hooks\/useSearchHighlight';/import { getHighlightedParts, escapeRegExp } from '@\/lib\/utils';/" src/components/GlobalSearch.tsx

cat << 'INNER_EOF' > patch_global_search.py
import re

with open('src/components/GlobalSearch.tsx', 'r') as f:
    content = f.read()

# Replace the hook call
hook_pattern = r'  const \{ highlight \} = useSearchHighlight\(query\);'
replacement = '''  const searchRegex = useMemo(() => {
    if (!query) return null;
    return new RegExp(`(${escapeRegExp(query)})`, 'gi');
  }, [query]);

  const highlight = useCallback((text: string) => {
    const parts = getHighlightedParts(text, query, searchRegex);
    if (parts.length <= 1) return text;

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <Box as="span" key={i} radius="sm" paddingX={0.5} className="text-accent bg-accent/10">{part}</Box>
        : part
    );
  }, [searchRegex, query]);'''

content = content.replace(hook_pattern, replacement)

with open('src/components/GlobalSearch.tsx', 'w') as f:
    f.write(content)
INNER_EOF

python3 patch_global_search.py && rm patch_global_search.py
rm -f src/hooks/useSearchHighlight.tsx

# 6. Fix useImage indirection
cat << 'INNER_EOF' > patch_img2.py
import re

with open('src/components/ui/ContentCard.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { useImage } from '@/hooks/useImage';", "")
content = content.replace("  const { imgError, handleImgError } = useImage();\n", "")
content = content.replace("onError={handleImgError}", "onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = 'none'; }}")

with open('src/components/ui/ContentCard.tsx', 'w') as f:
    f.write(content)

with open('src/layouts/ContentDetail.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { useImage } from '@/hooks/useImage';", "")
content = content.replace("  const { imgError, handleImgError } = useImage();\n", "")
content = content.replace("onError={handleImgError}", "onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.display = 'none'; }}")

with open('src/layouts/ContentDetail.tsx', 'w') as f:
    f.write(content)

INNER_EOF

python3 patch_img2.py && rm patch_img2.py
rm -f src/hooks/useImage.ts
