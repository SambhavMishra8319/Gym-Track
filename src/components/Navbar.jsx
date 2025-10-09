import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkStyle = {
    marginRight: "1.5rem",
    color: "#222",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.3s ease",
  };

  const activeStyle = {
    color: "#0056b3", // blue accent for active link
    borderBottom: "2px solid #0056b3",
    paddingBottom: "4px",
  };

  const buttonStyle = {
    background: "#0056b3",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background 0.3s ease, transform 0.2s ease",
  };

  const handleHover = (e, enter) => {
    e.target.style.background = enter ? "#003d80" : "#0056b3";
    e.target.style.transform = enter ? "scale(1.05)" : "scale(1)";
  };

  return (
    <nav
      style={{
        padding: "1rem 2rem",
        background: "#ffffff",
        color: "#222",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: "0",
        zIndex: "10",
        gap: "1.5rem",
        opacity:1,
      }}
    >
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
      >
        Home
      </NavLink>

      <NavLink
        to="/stats"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
      >
        Stats
      </NavLink>

      {/* NEW: Button to view all workout days */}
      {/* <NavLink to="/days">
        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          🗓️ All Days
        </button>
      </NavLink> */}

      {/* Optional Reset Button */}
      {/* 
      <button
        onClick={() => {
          if (window.confirm("Are you sure you want to delete ALL workout data?")) {
            localStorage.clear();
            window.location.reload();
          }
        }}
        style={{
          background: "#e63946",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          marginLeft: "auto",
          transition: "background 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.background = "#d62828")}
        onMouseOut={(e) => (e.target.style.background = "#e63946")}
      >
        🧹 Reset All Data
      </button> 
      */}
    </nav>
  );
}
