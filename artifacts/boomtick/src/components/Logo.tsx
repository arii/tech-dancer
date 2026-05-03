const Logo = () => {
  return (
    <svg viewBox="0 0 160 180" fill="none" className="h-10 w-auto" aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00CFFF" />
          <stop offset="100%" stopColor="#8B2FFF" />
        </linearGradient>
      </defs>
      <rect width="160" height="180" rx="20" fill="#0D0E1C" />
      <text
        x="14"
        y="116"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="104"
        fill="white"
      >
        B
      </text>
      <line x1="96" y1="22" x2="138" y2="122" stroke="url(#logo-g)" strokeWidth="13" strokeLinecap="round" />
      <text
        x="80"
        y="160"
        fontFamily="Arial, Helvetica Neue, Arial, sans-serif"
        fontWeight="700"
        fontSize="26"
        fill="white"
        textAnchor="middle"
        letterSpacing="-0.5"
      >
        <tspan fill="white">boom</tspan>
        <tspan fill="#00CFFF">tick</tspan>
      </text>
    </svg>
  );
};

export default Logo;
