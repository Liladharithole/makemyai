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
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <nav className="w-full px-4 sm:px-8 min-h-14 flex items-center justify-between border-b border-gray-200 bg-white z-10">
        <div className="flex items-center">
          <h2
            className="text-[var(--color-primary)] font-semibold text-2xl cursor-pointer p-2"
            onClick={() => navigate("/")}
          >
            MakeMyAI
          </h2>
        </div>
        <div className="sm:hidden">
          {sidebar ? (
            <X
              onClick={() => setSidebar(false)}
              className="w-6 h-6 text-gray-600"
            />
          ) : (
            <Menu
              onClick={() => setSidebar(true)}
              className="w-6 h-6 text-gray-600"
            />
          )}
        </div>
      </nav>
      <div className="flex flex-1 w-full overflow-hidden">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <main className="flex-1 overflow-auto bg-[#F4F7FB] p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    openSignIn()
  );
};

export default Layout;
