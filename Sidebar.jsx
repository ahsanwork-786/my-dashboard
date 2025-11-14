import React, { useState } from "react";
import { HomeIcon, ChartBarIcon, CogIcon, UserIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`${open ? "w-64" : "w-16"} bg-gray-900 text-white min-h-screen p-4 transition-all duration-300`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {open && <h1 className="text-2xl font-bold">Dashboard</h1>}
        <button onClick={() => setOpen(!open)}>
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="flex items-center gap-2 hover:text-blue-400">
          <HomeIcon className="w-5 h-5" /> {open && "Home"}
        </Link>

        <Link to="/users" className="flex items-center gap-2 hover:text-blue-400">
          <UserIcon className="w-5 h-5" /> {open && "Users"}
        </Link>

        <Link to="/analytics" className="flex items-center gap-2 hover:text-blue-400">
          <ChartBarIcon className="w-5 h-5" /> {open && "Analytics"}
        </Link>

        <Link to="/settings" className="flex items-center gap-2 hover:text-blue-400">
          <CogIcon className="w-5 h-5" /> {open && "Settings"}
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
