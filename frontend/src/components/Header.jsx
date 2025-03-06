import React, { useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`
        );
      }
    };

    // Resize Observer to detect height changes
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) resizeObserver.observe(headerRef.current);

    updateHeaderHeight(); // Initial height set

    return () => resizeObserver.disconnect(); // Cleanup observer
  }, []);
  return (
    <div ref={headerRef} className="border-b-2 border-dashed border-level-4">
      <div className="container mx-auto px-4 border-l-2 border-r-2 border-dashed border-level-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-extrabold text-level-5 cursor-pointer tracking-tight">
            <span className="bg-gradient-to-r from-level-4 to-level-5 text-transparent bg-clip-text">
              DIGI
            </span>
            <span className="text-level-5">MART</span>
          </div>
          <div>
            <ul className="flex items-center gap-6">
              <li>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                  <ShoppingCart className="w-6 h-6 text-level-4" />
                  <span className="absolute -top-1 -right-1 bg-level-5 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </button>
              </li>
              <li>
                <button className="px-4 py-2 bg-level-5 text-white rounded-lg transition-colors">
                  Sign Up / Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
