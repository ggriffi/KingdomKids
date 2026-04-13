"use client";

import { useState } from "react";
import { missions } from "@/lib/data";

export default function MissionMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #c8a96e 0%, #b8936a 30%, #a07850 50%, #8b6340 70%, #c8a96e 100%)",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.5)",
        border: "4px solid #8b6340"
      }}>

      {/* Parchment texture overlay */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)"
        }} />

      {/* Map grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 75" preserveAspectRatio="none">
        {[10,20,30,40,50,60,70,80,90].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="75" stroke="#5c3d1e" strokeWidth="0.3" />
        ))}
        {[10,20,30,40,50,60].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#5c3d1e" strokeWidth="0.3" />
        ))}
      </svg>

      {/* SVG path lines connecting mission points */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d={missions.missionPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#5c3d1e"
          strokeWidth="0.8"
          strokeDasharray="2,1.5"
          opacity="0.5"
        />
      </svg>

      {/* Animal decorations */}
      {/* Elephant — bottom left */}
      <div className="absolute bottom-4 left-4 text-5xl select-none animate-float" style={{ animationDelay: "0s" }}>🐘</div>
      {/* Giraffe — top center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-5xl select-none animate-float" style={{ animationDelay: "0.7s" }}>🦒</div>
      {/* Tiger — top right */}
      <div className="absolute top-4 right-6 text-4xl select-none animate-float" style={{ animationDelay: "1.4s" }}>🐯</div>
      {/* Hippo — bottom right */}
      <div className="absolute bottom-4 right-4 text-5xl select-none animate-float" style={{ animationDelay: "2.1s" }}>🦛</div>
      {/* Butterfly center */}
      <div className="absolute top-8 left-[40%] text-2xl select-none animate-sway">🦋</div>

      {/* Mission point dots */}
      {missions.missionPoints.map((point) => (
        <div key={point.id}>
          <button
            className="absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer transition-all duration-200 hover:scale-125 z-10"
            style={{
              left:       `calc(${point.x}% - 12px)`,
              top:        `calc(${point.y}% - 12px)`,
              background: point.color,
              boxShadow:  "0 2px 8px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={() => setHovered(point.id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={point.label}
          />
          {/* Tooltip */}
          {hovered === point.id && (
            <div
              className="absolute z-20 panel-parchment px-3 py-2 text-xs font-bold pointer-events-none"
              style={{
                left:      `calc(${point.x}% + 12px)`,
                top:       `calc(${point.y}% - 24px)`,
                minWidth:  "120px",
                color:     "#3d2008",
              }}
            >
              <div className="font-bold text-sm">{point.label}</div>
              <div className="text-[10px] font-normal text-[#8b5e3c]">{point.bibleRef}</div>
              <div className="text-[10px] text-[#5c3d1e] mt-0.5">{point.shortDesc}</div>
            </div>
          )}

          {/* Label below dot */}
          <div
            className="absolute text-[8px] font-bold text-white text-center pointer-events-none"
            style={{
              left:      `calc(${point.x}% - 30px)`,
              top:       `calc(${point.y}% + 14px)`,
              width:     "60px",
              textShadow: "0 1px 3px rgba(0,0,0,0.8)",
            }}
          >
            {point.label}
          </div>
        </div>
      ))}

      {/* Compass rose */}
      <div className="absolute top-3 left-3 w-10 h-10 opacity-60">
        <svg viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#5c3d1e" strokeWidth="1" fill="rgba(255,255,255,0.3)" />
          <text x="20" y="8"  textAnchor="middle" fontSize="6" fill="#5c3d1e" fontWeight="bold">N</text>
          <text x="20" y="36" textAnchor="middle" fontSize="6" fill="#5c3d1e" fontWeight="bold">S</text>
          <text x="6"  y="23" textAnchor="middle" fontSize="6" fill="#5c3d1e" fontWeight="bold">W</text>
          <text x="34" y="23" textAnchor="middle" fontSize="6" fill="#5c3d1e" fontWeight="bold">E</text>
          <path d="M20,4 L22,20 L20,22 L18,20Z" fill="#d94f2b" />
          <path d="M20,36 L22,20 L20,18 L18,20Z" fill="#5c3d1e" />
        </svg>
      </div>
    </div>
  );
}
