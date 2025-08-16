import React, { useState, useEffect } from "react";
import { useUser, useClerk, Protect } from "@clerk/clerk-react";
import {
  FileText,
  Hash,
  House,
  Image as ImageIcon,
  SquarePen,
  Eraser,
  Scissors,
  LogOut,
  Users,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/ai",
    label: "Dashboard",
    Icon: House,
    badge: null,
  },
  {
    to: "/ai/prompt-generator",
    label: "Prompt Generator",
    Icon: Sparkles,
    badge: null,
  },
  {
    to: "/ai/write-article",
    label: "Write Article",
    Icon: SquarePen,
    badge: null,
  },
  {
    to: "/ai/blog-titles",
    label: "Blog Titles",
    Icon: Hash,
    badge: null,
  },
  {
    to: "/ai/generate-images",
    label: "Generate Images",
    Icon: ImageIcon,
    badge: null,
  },
  {
    to: "/ai/remove-background",
    label: "Remove Background",
    Icon: Eraser,
    badge: null,
  },
  {
    to: "/ai/remove-object",
    label: "Remove Object",
    Icon: Scissors,
    badge: null,
  },
  {
    to: "/ai/review-resume",
    label: "Review Resume",
    Icon: FileText,
    badge: "New",
  },
  {
    to: "/ai/community",
    label: "Community",
    Icon: Users,
    badge: null,
  },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth >= 640) {
        setSidebar(true);
      } else {
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebar]);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebar(!sidebar);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleNavigation = (to) => {
    navigate(to);
    if (isMobile) {
      setSidebar(false);
    }
  };

  const sidebarWidth = collapsed ? "w-20" : "w-64";
  const sidebarTranslate = sidebar ? "translate-x-0" : "-translate-x-full";
  const mobileClasses = isMobile
    ? `fixed inset-y-0 left-0 z-50 ${sidebarTranslate}`
    : "relative";

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 left-4 z-40 p-2 rounded-full bg-white shadow-lg sm:hidden"
      >
        {sidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`${mobileClasses} ${sidebarWidth} bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ease-in-out overflow-hidden`}
      >
        {/* Logo and Toggle */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } p-4 border-b border-gray-200`}
        >
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Studio
              </h1>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 hidden sm:block"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* User Profile */}
        <div
          onClick={() => openUserProfile()}
          className={`flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
            collapsed ? "justify-center" : "px-6"
          }`}
        >
          <div className="relative">
            <img
              src={user?.imageUrl}
              alt={user?.fullName}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {!collapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.fullName}
              </p>
              <div className="flex items-center">
                <Protect
                  plan="premium"
                  fallback={
                    <span className="text-xs text-gray-500">Free Plan</span>
                  }
                >
                  <div className="flex items-center">
                    <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-0.5 rounded-full">
                      PRO
                    </span>
                  </div>
                </Protect>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {navItems.map(({ to, label, Icon, badge }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/ai"}
                  onClick={() => handleNavigation(to)}
                  className={({ isActive }) =>
                    `flex items-center ${
                      collapsed ? "justify-center px-2" : "px-4"
                    } py-2.5 rounded-lg mx-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="relative">
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? "text-blue-600" : "text-gray-500"
                          }`}
                          strokeWidth={isActive ? 2 : 1.5}
                        />
                        {badge && !collapsed && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                            {badge}
                          </span>
                        )}
                      </div>
                      {!collapsed && <span className="ml-3">{label}</span>}
                      {badge && collapsed && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div
          className={`p-4 border-t border-gray-200 ${
            collapsed ? "text-center" : ""
          }`}
        >
          <button
            onClick={() => signOut()}
            className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors ${
              collapsed ? "justify-center" : "px-4"
            }`}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && (
              <span className="ml-3 text-sm font-medium">Sign Out</span>
            )}
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setSidebar(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
