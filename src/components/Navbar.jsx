import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", num: "01" },
  { to: "/about", label: "About", num: "02" },
  { to: "/projects", label: "Projects", num: "03" },
  { to: "/contact", label: "Contact", num: "04" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between">
      {/* Logo */}
      <span
        className="text-white font-display text-2xl tracking-widest"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        ZOB<span style={{ color: "#2DD4BF" }}>.</span>
      </span>

      {/* Links */}
      <ul className="flex items-center gap-10">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-1.5 text-sm tracking-widest uppercase transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/80"
                }`
              }
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {({ isActive }) => (
                <>
                  <span style={{ color: "#2DD4BF", fontSize: "10px" }}>
                    /
                  </span>
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      className="ml-1 inline-block w-1 h-1 rounded-full"
                      style={{ backgroundColor: "#2DD4BF" }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
