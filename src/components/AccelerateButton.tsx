import { cn } from "@/lib/utils"
import { Zap, Square } from "lucide-react"

interface AccelerateButtonProps {
  isConnected: boolean
  isConnecting: boolean
  onToggle: () => void
  hideButton?: boolean
  unconnectedStyle?: "default" | "eagle" | "rocket"
}

/* Gauge tick data: 21 marks along a 160° arc (from -170° to -10°) */
const TICKS = (() => {
  const cx = 114, cy = 200, ro = 95, ri = 87
  return Array.from({ length: 21 }, (_, i) => {
    const angle = (-170 + i * 8) * Math.PI / 180
    return {
      ox: +(cx + ro * Math.cos(angle)).toFixed(1),
      oy: +(cy + ro * Math.sin(angle)).toFixed(1),
      ix: +(cx + ri * Math.cos(angle)).toFixed(1),
      iy: +(cy + ri * Math.sin(angle)).toFixed(1),
      major: i % 5 === 0,
      center: i === 10,
    }
  })
})()

export function AccelerateButton({ isConnected, isConnecting, onToggle, hideButton, unconnectedStyle = "default" }: AccelerateButtonProps) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Rocket + Gauge area */}
      <div
        onClick={onToggle}
        className={cn(
          "relative cursor-pointer transition-transform duration-300",
          "hover:scale-[1.04] active:scale-[0.96]"
        )}
      >
        {/* Background radial glow */}
        <div
          className={cn(
            "absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-[60px] transition-all duration-700",
            isConnected
              ? "bg-status-connected/20 scale-110"
              : isConnecting
              ? "bg-primary/20 animate-pulse"
              : "bg-primary/8"
          )}
        />
        {/* Secondary inner glow */}
        <div
          className={cn(
            "absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full blur-[40px] transition-all duration-500",
            isConnected ? "bg-primary/15" : "bg-primary/5"
          )}
        />

        <div className="relative w-[280px] h-[245px] z-10">
          <svg viewBox="0 60 228 200" className="w-[280px] h-[245px] absolute inset-0" shapeRendering="geometricPrecision">
            <defs>
              <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(215 20% 75%)" />
                <stop offset="35%" stopColor="hsl(0 0% 95%)" />
                <stop offset="65%" stopColor="hsl(0 0% 97%)" />
                <stop offset="100%" stopColor="hsl(215 20% 78%)" />
              </linearGradient>
              <linearGradient id="noseCone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(38 95% 62%)" />
                <stop offset="100%" stopColor="hsl(30 85% 42%)" />
              </linearGradient>
              <linearGradient id="finGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(38 92% 55%)" />
                <stop offset="100%" stopColor="hsl(25 80% 38%)" />
              </linearGradient>
              <linearGradient id="flameOuter" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(38 92% 55% / 0.8)" />
                <stop offset="100%" stopColor="hsl(38 92% 55% / 0)" />
              </linearGradient>
              <linearGradient id="flameInner" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0 0% 100% / 0.95)" />
                <stop offset="40%" stopColor="hsl(45 95% 72% / 0.9)" />
                <stop offset="100%" stopColor="hsl(38 92% 55% / 0)" />
              </linearGradient>
              <filter id="arcGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Gauge arc & ticks - hidden only in eagle idle style */}
            {!(unconnectedStyle === "eagle" && !isConnected && !isConnecting) && (
              <>
                <path d="M 26 200 A 100 100 0 0 1 202 200" fill="none" stroke={isConnected ? "hsl(38 92% 55% / 0.4)" : "hsl(215 15% 55% / 0.12)"} strokeWidth="1.2" strokeLinecap="round" filter={isConnected ? "url(#arcGlow)" : undefined} />
                <path d="M 40 200 A 86 86 0 0 1 188 200" fill="none" stroke={isConnected ? "hsl(38 92% 55% / 0.15)" : "hsl(215 15% 55% / 0.06)"} strokeWidth="0.6" strokeDasharray="2 4" />

                {/* Tick marks */}
                {TICKS.map((t, i) => (
                  <line key={i} x1={t.ix} y1={t.iy} x2={t.ox} y2={t.oy}
                    stroke={isConnected
                      ? t.center ? "hsl(38 95% 62% / 0.9)" : t.major ? "hsl(38 92% 55% / 0.6)" : "hsl(38 92% 55% / 0.35)"
                      : t.center ? "hsl(215 15% 70% / 0.5)" : t.major ? "hsl(215 15% 55% / 0.3)" : "hsl(215 15% 55% / 0.18)"
                    }
                    strokeWidth={t.center ? "1.5" : t.major ? "1.2" : "0.7"} strokeLinecap="round" />
                ))}
              </>
            )}

            {/* Speed lines */}
            {isConnected && (
              <g className="animate-speed-lines" opacity="0.3">
                <line x1="82" y1="130" x2="82" y2="150" stroke="hsl(38 95% 60%)" strokeWidth="1" strokeLinecap="round" />
                <line x1="75" y1="140" x2="75" y2="155" stroke="hsl(38 95% 60%)" strokeWidth="1" strokeLinecap="round" />
                <line x1="146" y1="130" x2="146" y2="150" stroke="hsl(38 95% 60%)" strokeWidth="1" strokeLinecap="round" />
                <line x1="153" y1="140" x2="153" y2="155" stroke="hsl(38 95% 60%)" strokeWidth="1" strokeLinecap="round" />
              </g>
            )}

            {/* Rocket */}
            <g className={cn("transition-transform duration-500", isConnected && "animate-rocket-launch")}>
              {isConnected && (
                <g className="animate-flame-flicker">
                  <ellipse cx="114" cy="225" rx="12" ry="35" fill="url(#flameOuter)" />
                  <ellipse cx="114" cy="220" rx="8" ry="28" fill="hsl(40 95% 62% / 0.75)" />
                  <ellipse cx="114" cy="215" rx="5" ry="22" fill="url(#flameInner)" />
                  <ellipse cx="106" cy="210" rx="4" ry="16" fill="hsl(30 90% 52% / 0.45)" transform="rotate(-8 106 210)" />
                  <ellipse cx="122" cy="210" rx="4" ry="16" fill="hsl(30 90% 52% / 0.45)" transform="rotate(8 122 210)" />
                </g>
              )}
              {!isConnected && !isConnecting && unconnectedStyle === "default" && (
                <g opacity="0.25">
                  <line x1="114" y1="196" x2="114" y2="215" stroke="hsl(38 92% 55%)" strokeWidth="2" strokeLinecap="round" />
                  <line x1="108" y1="198" x2="108" y2="210" stroke="hsl(38 92% 55%)" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="120" y1="198" x2="120" y2="210" stroke="hsl(38 92% 55%)" strokeWidth="1.2" strokeLinecap="round" />
                </g>
              )}
              {!isConnected && !isConnecting && unconnectedStyle !== "default" ? (
                <image
                  href={unconnectedStyle === "eagle" ? "./images/logo-eagle-style.png" : "./images/rocket-style.webp"}
                  x="14"
                  y="38"
                  width="200"
                  height="200"
                  opacity={unconnectedStyle === "eagle" ? "0.7" : "1"}
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
                <>
                  <path d="M 98 178 L 84 200 L 100 192 Z" fill="url(#finGrad)" />
                  <path d="M 130 178 L 144 200 L 128 192 Z" fill="url(#finGrad)" />
                  <path d="M 110 190 L 114 202 L 118 190 Z" fill="hsl(215 15% 45%)" />
                  <path d="M 114 80 C 130 98 134 130 132 175 L 128 192 L 100 192 L 96 175 C 94 130 98 98 114 80 Z" fill="url(#rocketBody)" stroke="hsl(35 80% 48% / 0.3)" strokeWidth="0.5" />
                  <path d="M 110 100 C 112 96 116 96 118 100 L 118 185 L 110 185 Z" fill="hsl(0 0% 100% / 0.1)" />
                  <path d="M 114 80 C 121 90 124 100 123 108 L 105 108 C 104 100 107 90 114 80 Z" fill="url(#noseCone)" />
                  <ellipse cx="113" cy="88" rx="2" ry="4" fill="hsl(0 0% 100% / 0.3)" />
                  <circle cx="114" cy="138" r="11" fill="hsl(28 55% 22%)" stroke="hsl(38 92% 55% / 0.5)" strokeWidth="1.5" />
                  <circle cx="114" cy="138" r="8" fill="hsl(40 92% 58% / 0.6)" />
                  <circle cx="114" cy="138" r="5" fill="hsl(45 95% 65% / 0.4)" />
                  <ellipse cx="111" cy="135" rx="3" ry="2.5" fill="hsl(0 0% 100% / 0.45)" />
                  <rect x="100" y="160" width="28" height="2" rx="1" fill="hsl(38 92% 55% / 0.2)" />
                  <rect x="102" y="166" width="24" height="1.5" rx="0.75" fill="hsl(38 92% 55% / 0.12)" />
                  <path d="M 104 190 L 100 196 L 128 196 L 124 190" fill="hsl(215 15% 35%)" />
                  <path d="M 107 192 L 105 196 L 123 196 L 121 192" fill="hsl(215 15% 25%)" />
                </>
              )}
            </g>

            {/* Connecting spinner */}
            {isConnecting && (
              <circle cx="114" cy="170" r="88" fill="none" stroke="hsl(38 92% 55% / 0.35)" strokeWidth="2" strokeDasharray="14 10" className="animate-spin-slow" style={{ transformOrigin: "114px 170px" }} />
            )}
          </svg>
        </div>
      </div>

      {/* Large accelerate button */}
      {!hideButton && (
        <button
          onClick={onToggle}
          className={cn(
            "w-[85%] max-w-[360px] h-[55px] rounded-2xl flex items-center justify-center gap-2.5 mt-2",
            "text-lg font-normal tracking-wide transition-all duration-300 active:scale-[0.96]",
            isConnected
              ? "bg-emerald-500 text-white"
              : isConnecting
              ? "bg-primary/70 text-primary-foreground"
              : "bg-primary text-primary-foreground"
          )}
        >
                    {isConnected ? <Square className="w-5 h-5" fill="currentColor" /> : <Zap className="w-5 h-5" fill="currentColor" />}
          <span>
            {isConnected ? "停止加速" : isConnecting ? "连接中..." : "立即提速"}
          </span>
        </button>
      )}
    </div>
  )
}
