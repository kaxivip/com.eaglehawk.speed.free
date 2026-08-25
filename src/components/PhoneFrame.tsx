import { cn } from "@/lib/utils"
import { useEffect, useState, useCallback } from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { type TaskLayout } from "@/pages/TaskCenterPage"

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
  taskLayout?: TaskLayout
  onTaskLayoutChange?: (l: TaskLayout) => void
}

const TASK_LAYOUTS: { key: TaskLayout; label: string; desc: string }[] = [
  { key: "original",    label: "原版",   desc: "经典线性堆叠" },
  { key: "task-stream", label: "任务流", desc: "看广告置顶，转化优先" },
  { key: "account",     label: "账户",   desc: "资产感知，激发行动" },
  { key: "tabs",        label: "分区",   desc: "三栏标签，聚焦清晰" },
]

export function PhoneFrame({ children, className, taskLayout, onTaskLayoutChange }: PhoneFrameProps) {
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

  const showLayoutPanel = !!taskLayout && !!onTaskLayoutChange

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4 gap-6">
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

      {/* 布局切换面板（只在免费会员页显示） */}
      {showLayoutPanel && (
        <div className="flex flex-col gap-2 w-44">
          <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-1">
            免费会员页布局
          </p>
          {TASK_LAYOUTS.map((l) => (
            <button
              key={l.key}
              onClick={() => onTaskLayoutChange(l.key)}
              className={cn(
                "w-full text-left px-3.5 py-3 rounded-2xl border transition-all duration-200",
                taskLayout === l.key
                  ? "bg-gray-900 border-gray-700 shadow-md"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              )}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className={cn(
                  "text-sm font-semibold",
                  taskLayout === l.key ? "text-white" : "text-gray-800"
                )}>
                  {l.label}
                </span>
                {taskLayout === l.key && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </div>
              <p className={cn(
                "text-[11px] leading-tight",
                taskLayout === l.key ? "text-gray-400" : "text-gray-500"
              )}>
                {l.desc}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
