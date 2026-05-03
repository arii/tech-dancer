import { Link } from "react-router-dom";

export const Logo = ({ className = "h-8" }: { className?: string }) => {
  return (
    <Link to="/" aria-label="Go to home" className={`inline-flex items-center ${className}`}>
      <svg 
        viewBox="0 0 340 110" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto" 
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="logo-kinetic-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00CFFF" />
            <stop offset="100%" stopColor="#8B2FFF" />
          </linearGradient>
        </defs>

        <rect width="340" height="110" rx="18" fill="#0D0E1C" />

        <text
          x="16"
          y="72"
          fontFamily="Arial Black, Arial, sans-serif"
          fontWeight="900"
          fontSize="60"
          fill="white"
        >
          B
        </text>

        <rect 
          x="88" 
          y="10" 
          width="18" 
          height="90" 
          rx="9"
          transform="rotate(15 97 55)"
          fill="url(#logo-kinetic-gradient)" 
        />

        <text
          x="148"
          y="69"
          fontFamily="Arial, Helvetica Neue, Arial, sans-serif"
          fontWeight="700"
          fontSize="36"
          fill="white"
          letterSpacing="-0.5"
        >
          <tspan>boom</tspan>
          <tspan fill="#00CFFF">tick</tspan>
        </text>
      </svg>
    </Link>
  );
};

export default Logo;
