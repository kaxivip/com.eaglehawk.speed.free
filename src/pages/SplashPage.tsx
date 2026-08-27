import { useEffect } from "react"

interface SplashPageProps {
  onFinish: () => void
}

export function SplashPage({ onFinish }: SplashPageProps) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col items-center justify-start pt-[32%] relative overflow-hidden">
      {/* Ambient particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
          }}
        />
      ))}

      {/* Radial glow behind logo */}
      <div className="absolute w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />

      {/* Logo */}
      <div className="animate-fade-in relative z-10 flex flex-col items-center gap-7">
        <div className="w-28 h-28 rounded-[1.6rem] overflow-hidden glow-primary">
          <img
            src="./images/logo-app.png"
            alt="雄鹰加速器"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <h1 className="text-3xl font-bold text-gradient-cyan tracking-wider">
            雄鹰加速器
          </h1>
          <p className="text-base text-muted-foreground tracking-[0.3em]">
            一触即飞 畅游全球
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[11px] font-medium text-primary/70 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full tracking-wide">装机必备</span>
            <span className="text-[11px] font-medium text-accent/70 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full tracking-wide">跨境专用</span>
            <span className="text-[11px] font-medium text-foreground/40 bg-foreground/5 border border-foreground/10 px-3 py-1 rounded-full tracking-wide">海外常备</span>
          </div>
        </div>
      </div>

    </div>
  )
}
