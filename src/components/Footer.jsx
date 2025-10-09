import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} WorkoutSetTrack | Built by Sam 💪</p>
    </footer>
  );
}
