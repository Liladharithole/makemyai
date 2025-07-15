import React from "react";
import { useUser, useClerk } from "@clerk/clerk-react";


const navItems = [
    {
        to: "/ai", 
        label: "Dashboard",
        icon: "Dashboard",
    }
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
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
      </div>
    </div>
  );
};

export default Sidebar;
