const CONFIG = {
  allowedColors: [
    'bg', 'surface', 'surface-alt', 'accent', 'accent-brand', 'accent-navy',
    'accent-purple', 'accent-magenta', 'brand-text-muted', 'brand-text-accent', 'brand-b-mark', 'brand-wordmark',
    'text-main', 'text-body', 'text-dim', 'line', 'white', 'black',
    'transparent', 'current', 'yellow-400', 'emerald-500', 'red-500',
    'amber-500', 'success', 'error', 'warning',
    'gradient-to-t', 'gradient-to-b', 'gradient-to-r'
  ],
  allowedTextUtils: ['left', 'right', 'center', 'justify', 'uppercase', 'lowercase', 'capitalize', 'normal-case', 'italic', 'not-italic', 'pretty', 'font-light'],
  allowedTextSizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
};

const cls = 'brand-text-muted';

console.log('Testing cls:', cls);
console.log('Matches initial check:', /\b(bg-|text-|fill-)\b/.test(cls));
console.log('Included in allowedColors:', CONFIG.allowedColors.includes(cls));

const colorMatch = cls.match(/\b(?:[a-z-]+:)?(bg|text|fill)-([a-z0-9/-]+)\b/);
console.log('colorMatch:', colorMatch);

if (colorMatch) {
  const prefix = colorMatch[1];
  const baseColor = colorMatch[2].split('/')[0];
  const fullToken = `${prefix}-${baseColor}`;
  console.log('prefix:', prefix, 'baseColor:', baseColor, 'fullToken:', fullToken);
  const isAllowed = CONFIG.allowedColors.includes(baseColor) ||
                    CONFIG.allowedColors.includes(fullToken) ||
                    CONFIG.allowedTextUtils.includes(baseColor) ||
                    CONFIG.allowedTextSizes.includes(baseColor);
  console.log('isAllowed:', isAllowed);
}
