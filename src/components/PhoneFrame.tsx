import { cn } from "@/lib/utils"
import { useEffect, useState, useCallback } from "react"
import { Maximize2, Minimize2 } from "lucide-react"

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const check = () => {
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isTouchDevice && isSmallScreen)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  if (isMobile) {
    return (
      <div className="w-full h-[100dvh] overflow-hidden bg-background relative">
        {children}
        {!isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="fixed bottom-20 right-4 z-[998] w-11 h-11 rounded-full bg-primary shadow-lg shadow-black/30 flex items-center justify-center active:scale-90 transition-transform"
          >
            <Maximize2 className="w-5 h-5 text-white" />
          </button>
        )}
        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="fixed bottom-20 right-4 z-[9999] w-11 h-11 rounded-full bg-white/10 backdrop-blur flex items-center justify-center active:scale-90 transition-transform"
          >
            <Minimize2 className="w-5 h-5 text-white/60" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      {/* 手机框 */}
      <div
        className={cn(
          "relative w-[390px] h-[844px] rounded-[3rem] overflow-hidden flex-shrink-0",
          "border-[3px] border-gray-200",
          "shadow-[0_4px_60px_rgba(0,0,0,0.08)]",
          className
        )}
      >
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[34px] bg-background rounded-b-[1.2rem] z-50">
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[60px] h-[6px] bg-muted rounded-full" />
        </div>
        {/* Phone content */}
        <div className="w-full h-full overflow-hidden bg-background">
          {children}
        </div>
      </div>
    </div>
  )
}
