export default function JungleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {/* Deep gradient sky → canopy */}
      <div className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0a1f10 0%, #0e2d14 20%, #14401c 60%, #1a5225 100%)"
        }} />

      {/* Layered jungle silhouette — back layer */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 opacity-30"
        style={{
          background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 400'%3E%3Cpath fill='%230a2e0f' d='M0,400V250c30-40,60,20,90-10s60-80,90-40 60,60,90,20 60-60,90-20 60,70,90,10 60-50,90-30 60,40,90,0 60-60,90-30 60,50,90,10 60-40,90,20 60,60,90,30V400z'/%3E%3C/svg%3E\") center bottom / cover no-repeat"
        }} />

      {/* Large tropical leaves — top left */}
      <svg className="absolute -top-8 -left-8 w-64 h-64 opacity-40" viewBox="0 0 200 200">
        <ellipse cx="40" cy="100" rx="35" ry="90" fill="#1a5225" transform="rotate(-30 40 100)" />
        <ellipse cx="70" cy="80" rx="30" ry="80" fill="#22633a" transform="rotate(-15 70 80)" />
        <ellipse cx="20" cy="120" rx="25" ry="70" fill="#153d1c" transform="rotate(-45 20 120)" />
      </svg>

      {/* Large tropical leaves — top right */}
      <svg className="absolute -top-8 -right-8 w-64 h-64 opacity-40" viewBox="0 0 200 200">
        <ellipse cx="160" cy="100" rx="35" ry="90" fill="#1a5225" transform="rotate(30 160 100)" />
        <ellipse cx="130" cy="80" rx="30" ry="80" fill="#22633a" transform="rotate(15 130 80)" />
        <ellipse cx="180" cy="120" rx="25" ry="70" fill="#153d1c" transform="rotate(45 180 120)" />
      </svg>

      {/* Scattered light dots (fireflies / stars) */}
      {[
        [10, 15], [25, 8], [45, 20], [65, 5], [80, 18],
        [15, 35], [55, 30], [75, 12], [90, 25], [35, 10],
      ].map(([x, y], i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-yellow-200 opacity-50 animate-pulse"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.3}s` }}
        />
      ))}

      {/* Vine left */}
      <svg className="absolute left-0 top-0 h-full w-16 opacity-20" preserveAspectRatio="none" viewBox="0 0 50 400">
        <path d="M25,0 Q10,50 30,100 Q5,150 25,200 Q10,250 30,300 Q5,350 25,400"
          fill="none" stroke="#2d6a35" strokeWidth="3" />
        <ellipse cx="15" cy="80" rx="12" ry="6" fill="#2d6a35" transform="rotate(-20 15 80)" />
        <ellipse cx="30" cy="170" rx="12" ry="6" fill="#2d6a35" transform="rotate(20 30 170)" />
        <ellipse cx="15" cy="270" rx="12" ry="6" fill="#2d6a35" transform="rotate(-20 15 270)" />
      </svg>

      {/* Vine right */}
      <svg className="absolute right-0 top-0 h-full w-16 opacity-20" preserveAspectRatio="none" viewBox="0 0 50 400">
        <path d="M25,0 Q40,50 20,100 Q45,150 25,200 Q40,250 20,300 Q45,350 25,400"
          fill="none" stroke="#2d6a35" strokeWidth="3" />
        <ellipse cx="35" cy="80" rx="12" ry="6" fill="#2d6a35" transform="rotate(20 35 80)" />
        <ellipse cx="20" cy="170" rx="12" ry="6" fill="#2d6a35" transform="rotate(-20 20 170)" />
        <ellipse cx="35" cy="270" rx="12" ry="6" fill="#2d6a35" transform="rotate(20 35 270)" />
      </svg>
    </div>
  );
}
