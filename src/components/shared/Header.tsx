import { Link, useLocation } from "react-router-dom";
import { shareIcons, routeList } from "@/data/navbarData";
import { AsciiGlitchText } from "@/components/ascii";

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      {/* Main header content */}
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo / Site name */}
        <div className="flex items-center gap-6">
          <Link to="/" className="group">
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)] font-mono text-sm">[</span>
              <AsciiGlitchText
                text="VIRAJ"
                className="text-white font-mono text-sm tracking-widest"
                intensity={0.02}
              />
              <span className="text-[var(--accent)] font-mono text-sm">]</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
            {routeList.map(({ href, label }) => (
              <Link
                key={label}
                to={href}
                className={`
                  px-3 py-1.5 transition-all duration-200 underline-grow
                  hover:text-[var(--accent)] hover:bg-white/5 hover-glitch
                  ${location.pathname === href ? "text-[var(--accent)] bg-white/5" : "text-white/60"}
                `}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side - Social links */}
        <div className="flex items-center gap-2">
          {/* Social icons */}
          <div className="flex items-center gap-1">
            {shareIcons.map((shareIcon, index) => (
              <Link
                key={index}
                to={shareIcon.link}
                target="_blank"
                className="
                  p-2 font-mono text-white/60
                  hover:text-[var(--accent)] hover:bg-white/5
                  transition-all duration-200
                  border border-transparent hover:border-white/10
                  hover-pop hover-glow-pulse
                "
                aria-label={`Social link ${index + 1}`}
              >
                {shareIcon.icon}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 font-mono text-[var(--accent)] text-xs">
            [=]
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
