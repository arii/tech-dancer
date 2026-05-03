export function LogoMark() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
      <defs>
        <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3EE"/>
          <stop offset="100%" stopColor="#A855F7"/>
        </linearGradient>
      </defs>
      <text x="2" y="34" fontSize="28" fontWeight="600" fill="#E6EDF3">B</text>
      <rect x="22" y="6" width="5" height="32" rx="2.5" transform="rotate(20 22 6)" fill="url(#grad2)"/>
    </svg>
  );
}

export function Logo() {
  return (
    <svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3EE"/>
          <stop offset="100%" stopColor="#A855F7"/>
        </linearGradient>
      </defs>

      {/* B */}
      <text x="0" y="42" fontFamily="Inter, sans-serif" fontSize="40" fontWeight="600" fill="#E6EDF3">B</text>

      {/* Slash */}
      <rect x="36" y="8" width="6" height="44" rx="3" transform="rotate(20 36 8)" fill="url(#grad)"/>

      {/* Text */}
      <text x="60" y="42" fontFamily="Inter, sans-serif" fontSize="28" fill="#E6EDF3">
        boom<tspan fill="#8B98A5">tick</tspan>
      </text>
    </svg>
  );
}
