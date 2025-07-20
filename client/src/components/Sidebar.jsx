import React from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import {
  FileText,
  Hash,
  House,
  Image,
  SquarePen,
  Eraser,
  Scissors,
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
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const navigate = useNavigate();
  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute max-sm:left-0 max-sm:top-14 max-sm:h-screen max-sm:z-20 max-sm:translate-x-0 transition-all duration-300 ease-in-out top-14 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      }`}
    >
      <div className="my-7 w-full">
        <img
          src={user?.imageUrl}
          alt={user?.fullName}
          className="w-14 rounded-full mx-auto cursor-pointer"
        />
        <h1 className="text-center text-gray-600 mt-1">{user?.fullName}</h1>
        <div>
          {navItems.map(({ to, label, Icon }) => {
            return (
              <NavLink
                key={to}
                to={to}
                end={to === "/ai"}
                onClick={() => {
                  setSidebar(false);
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
    </div>
  );
};

export default Sidebar;
