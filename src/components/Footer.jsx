import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2, PlusCircle, User, FolderOpen } from "lucide-react";

export default function Footer() {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: <Home size={26} />, label: "Home" },
    { to: "/analytics", icon: <BarChart2 size={26} />, label: "Stats" },
    { to: "/add", icon: <PlusCircle size={32} />, label: "Add" },
    { to: "/templates", icon: <FolderOpen size={26} />, label: "Templates" },
    { to: "/profile", icon: <User size={26} />, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] h-20 flex items-center justify-around z-30 md:hidden">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center gap-1 text-sm ${
            location.pathname === item.to
              ? "text-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
