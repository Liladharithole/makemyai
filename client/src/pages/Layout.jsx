import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useUser, useClerk } from "@clerk/clerk-react";

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return user ? (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <h2
          className="text-[var(--color-primary)] font-semibold text-2xl cursor-pointer p-2"
          onClick={() => navigate("/")}
        >
          MakeMyAI
        </h2>
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        )}
      </nav>
      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-[#F4F7FB]">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    openSignIn()
  );
};

export default Layout;
