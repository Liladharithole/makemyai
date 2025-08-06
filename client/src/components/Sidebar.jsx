import React from "react";
import { useUser, useClerk, Protect } from "@clerk/clerk-react";
import {
  FileText,
  Hash,
  House,
  Image,
  SquarePen,
  Eraser,
  Scissors,
  LogOut,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
// NavLink is used to navigate to different routes
const navItems = [
  {
    to: "/ai",
    label: "Dashboard",
    Icon: House,
  },
  {
    to: "/ai/write-article",
    label: "Write Article",
    Icon: SquarePen,
  },
  {
    to: "/ai/blog-titles",
    label: "Blog Titles",
    Icon: Hash,
  },
  {
    to: "/ai/generate-images",
    label: "Generate Images",
    Icon: Image,
  },
  {
    to: "/ai/remove-background",
    label: "Remove Background",
    Icon: Eraser,
  },
  {
    to: "/ai/remove-object",
    label: "Remove Object",
    Icon: Scissors,
  },
  {
    to: "/ai/review-resume",
    label: "Review Resume",
    Icon: FileText,
  },
  {
    to: "/ai/community",
    label: "Community",
    Icon: Users,
  },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const navigate = useNavigate();
  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center h-full absolute sm:relative transition-all duration-300 ease-in-out z-20 ${
        sidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      }`}
    >
      <div className="my-7 w-full">
        <img
          src={user?.imageUrl}
          alt={user?.fullName}
          className="w-14 p-2  rounded-full mx-auto cursor-pointer"
        />
        <h1 className="text-center text-gray-600 mt-1 mb-4">
          {user?.fullName}
        </h1>
        <div className="px-6 mt-5 text-sm text-gray-600 font-medium flex flex-col gap-2">
          {navItems.map(({ to, label, Icon }) => {
            return (
              <NavLink
                key={to}
                to={to}
                end={to === "/ai"}
                onClick={() => {
                  setSidebar(false);
                  navigate(to);
                }}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 flex item-center gap-3 rounded hover:bg-gray-100 ${
                    isActive
                      ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white"
                      : ""
                  }`
                }
              >
                {({ isActive }) => {
                  return (
                    <>
                      <Icon
                        className={`${
                          isActive ? "text-white" : "text-gray-600"
                        }`}
                      />
                      <p
                        className={`${
                          isActive ? "text-white" : "text-gray-600"
                        }`}
                      >
                        {label}
                      </p>
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div
          onClick={() => openUserProfile()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={user?.imageUrl}
            alt={user?.fullName}
            className="w-8 rounded-full"
          />
          <div>
            <h1 className="text-sm font-medium text-gray-600">
              {user?.fullName}
            </h1>
            <p className="text-xs text-gray-500 cursor-pointer">
              <Protect plan="premium" fallback="Free">
                <span className="text-xs m-1">Premium</span>
              </Protect>
              <span className="text-xs m-1">Plan</span>
            </p>
          </div>
        </div>
        <div>
          <LogOut
            onClick={() => signOut()}
            className="w-4.5 text-gray-400 hover:text-gray-700 transition-all duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
