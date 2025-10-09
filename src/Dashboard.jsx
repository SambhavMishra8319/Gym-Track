import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const CATEGORIES = [
  { name: "Chest Day", slug: "chest-day" },
  { name: "Leg Day", slug: "leg-day" },
  { name: "Back Day", slug: "back-day" },
  { name: "Biceps Day", slug: "biceps-day" },
  { name: "Triceps Day", slug: "triceps-day" },
  { name: "Shoulder Day", slug: "shoulder-day" },
  { name: "Abs Day", slug: "abs-day" },
];

function timeAgo(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 60) return `${sec}s ago`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  const days = Math.floor(sec / 86400);
  return `${days}d ago`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [lastUpdatedMap, setLastUpdatedMap] = useState({});

  // read last-updated keys from localStorage: "category_last_updated:<slug>"
  const refreshLastUpdated = () => {
    const map = {};
    CATEGORIES.forEach((c) => {
      const key = `category_last_updated:${c.slug}`;
      const val = localStorage.getItem(key);
      map[c.slug] = val ? { iso: val, text: timeAgo(val) } : null;
    });
    setLastUpdatedMap(map);
  };

  useEffect(() => {
    refreshLastUpdated();
    // If other tabs change localStorage, update
    const onStorage = (e) => {
      if (e.key && e.key.startsWith("category_last_updated:")) refreshLastUpdated();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="dashboard-root">
      <header className="dash-header">
        <div>
          <h1 className="dash-title">🏋️ Workout SetTrack</h1>
          <p className="dash-sub">Click a day to view or add exercises</p>
        </div>
      </header>

      <main>
        <div className="cards-grid">
          {CATEGORIES.map((cat) => {
            const info = lastUpdatedMap[cat.slug];
            const fullDate = info ? new Date(info.iso).toLocaleString() : null;
            return (
              <button
                key={cat.slug}
                className="day-card"
                onClick={() => navigate(`/category/${cat.slug}`)}
                aria-label={cat.name}
                title={fullDate ? `Last updated: ${fullDate}` : "No updates yet"}
              >
                <div className="card-main">
                  <div className="card-name">{cat.name}</div>
                </div>

                {/* this area is hidden until hover (CSS shows on :hover) */}
                <div className="card-meta">
                  {info ? (
                    <span className="last-updated">Last: {info.text}</span>
                  ) : (
                    <span className="no-updates">No updates</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
