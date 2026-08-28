import { useState } from "react"
import { AccelerateButton } from "@/components/AccelerateButton"
import { Card } from "@/components/ui/card"
import {
  Globe, Smartphone, ChevronRight, Share2, Signal, Zap, Pause, RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { type LineId, LINE_OPTIONS } from "@/pages/LineSelectPage"

type HomePageAction = "tasks" | "profile"

interface HomePageProps {
  isConnected: boolean
  isConnecting: boolean
  currentMode: "global" | "app"
  currentLine: LineId
  selectedApps: string[]
  remainingSeconds: number
  formatTimer: (secs: number) => string
  onToggleConnect: () => void
  onRefreshRemaining: () => void
  onNavigate: (page: HomePageAction) => void
  onOpenModeSelect: () => void
  onOpenLineSelect: () => void
  onOpenShare: () => void
}

// =====================================================================
// Sub-components
// =====================================================================

function HeaderBar({ onOpenShare }: { onOpenShare: () => void }) {
  return (
    <div className="relative z-10 px-5 flex items-center justify-between">
      <span className="text-base font-bold text-gradient-cyan">雄鹰加速器</span>
      <button
        onClick={onOpenShare}
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/15 to-accent/15 border border-dashed border-primary/30 hover:border-primary/50 transition-all duration-200 active:scale-95"
      >
        <Share2 className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-semibold text-primary">送会员</span>
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-status-connected animate-pulse" />
      </button>
    </div>
  )
}

function StatusPill({
  isConnected, isConnecting, remainingSeconds, formatTimer, onRefresh,
}: {
  isConnected: boolean; isConnecting: boolean
  remainingSeconds: number; formatTimer: (s: number) => string; onRefresh: () => void
}) {
  return (
    <div
      onClick={isConnected ? onRefresh : undefined}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-2xl",
        isConnected
          ? "bg-status-connected/10 cursor-pointer active:scale-[0.97] transition-transform"
          : isConnecting
          ? "bg-primary/10"
          : "bg-white/5"
      )}
    >
      <div className={cn(
        "w-2 h-2 rounded-full",
        isConnected ? "bg-status-connected animate-pulse"
          : isConnecting ? "bg-primary animate-pulse" : "bg-primary"
      )} />
      <span className={cn(
        "text-sm font-normal",
        isConnected ? "text-status-connected" : "text-primary"
      )}>
        {isConnected ? `加速中 ${formatTimer(remainingSeconds)}` : isConnecting ? "连接中..." : "准备就绪"}
      </span>
      {isConnected && <RefreshCw className="w-3 h-3 text-status-connected/70" />}
    </div>
  )
}

function AdBanner() {
  return (
    <Card className="glass-card border-0 overflow-hidden">
      <div className="p-4 flex items-center justify-center min-h-[80px] border border-dashed border-muted-foreground/20 rounded-xl mx-3 my-3">
        <span className="text-xs text-muted-foreground/50">广告位预留</span>
      </div>
    </Card>
  )
}

// =====================================================================
// HomePage - 拇指黄金区布局
// =====================================================================
export function HomePage(p: HomePageProps) {
  const [showRefreshToast, setShowRefreshToast] = useState(false)

  const handleRefresh = () => {
    p.onRefreshRemaining()
    setShowRefreshToast(true)
    setTimeout(() => setShowRefreshToast(false), 3000)
  }

  const lineName = LINE_OPTIONS.find((l) => l.id === p.currentLine)?.name ?? "智能优选"

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-primary/5 blur-[80px]" />

      <div className="h-12" />
      <HeaderBar onOpenShare={p.onOpenShare} />

      {/* ---- 已连接态 ---- */}
      {p.isConnected ? (
        <>
          {/* 火箭 + 计时器 + 停止按钮：整体垂直居中 */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-12 px-5">
            <AccelerateButton
              isConnected={p.isConnected}
              isConnecting={p.isConnecting}
              onToggle={p.onToggleConnect}
              hideButton
            />
            <div
              onClick={handleRefresh}
              className="flex flex-col items-center gap-2 cursor-pointer active:scale-[0.97] transition-transform"
            >
              <p className="text-[11px] text-muted-foreground tracking-widest uppercase">剩余加速时长</p>
              <p className="text-5xl font-bold text-gradient-cyan tracking-wider tabular-nums">
                {p.formatTimer(p.remainingSeconds)}
              </p>
              <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />点击刷新时长
              </p>
            </div>
            <button
              onClick={p.onToggleConnect}
              className="w-full h-[55px] rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center gap-2.5 text-base font-semibold shadow-[0_4px_30px_hsl(150_80%_50%/0.3)] active:scale-[0.97] transition-all"
            >
              <Pause className="w-5 h-5" fill="currentColor" />
              <span>停止加速</span>
            </button>
          </div>
          <div className="pb-24" />
        </>
      ) : (
        <>
          {/* ---- 未连接 / 连接中态 ---- */}

          {/* 状态 pill：固定在 Header 下方 */}
          <div className="relative z-10 flex justify-center mt-4">
            <StatusPill
              isConnected={p.isConnected}
              isConnecting={p.isConnecting}
              remainingSeconds={p.remainingSeconds}
              formatTimer={p.formatTimer}
              onRefresh={handleRefresh}
            />
          </div>

          {/* 火箭 */}
          <div className="relative z-10 flex justify-center mt-8 scale-90 origin-top">
            <AccelerateButton
              isConnected={p.isConnected}
              isConnecting={p.isConnecting}
              onToggle={p.onToggleConnect}
              hideButton
              unconnectedStyle="eagle"
            />
          </div>

          {/* 拇指黄金区：模式/线路 + CTA + 广告 */}
          <div className="relative z-10 flex flex-col mt-[63px] px-5 pb-24 gap-3">
            <div className="flex gap-2">
              <button
                onClick={p.onOpenModeSelect}
                className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 backdrop-blur-xl active:scale-[0.97] transition-transform"
              >
                <div className={cn(
                  "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0",
                  p.currentMode === "global" ? "bg-primary/15" : "bg-accent/15"
                )}>
                  {p.currentMode === "global"
                    ? <Globe className="w-3.5 h-3.5 text-primary" />
                    : <Smartphone className="w-3.5 h-3.5 text-accent" />}
                </div>
                <span className="text-xs text-foreground font-medium truncate flex-1 text-left">
                  {p.currentMode === "global" ? "全局加速" : `应用(${p.selectedApps.length})`}
                </span>
                <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              </button>
              <button
                onClick={p.onOpenLineSelect}
                className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 backdrop-blur-xl active:scale-[0.97] transition-transform"
              >
                <div className="w-6 h-6 rounded-md bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Signal className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs text-foreground font-medium truncate flex-1 text-left">{lineName}</span>
                <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              </button>
            </div>

            <button
              onClick={p.onToggleConnect}
              className={cn(
                "w-full h-[60px] rounded-2xl flex items-center justify-center gap-3",
                "text-lg font-normal tracking-wide transition-all duration-300 active:scale-[0.97]",
                p.isConnecting
                  ? "bg-gradient-to-r from-primary/70 to-accent/70 text-primary-foreground"
                  : "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_6px_36px_hsl(38_92%_55%/0.4)]"
              )}
            >
              <Zap className="w-5 h-5" fill="currentColor" />
              <span>{p.isConnecting ? "连接中..." : "立即提速"}</span>
            </button>

            <div className="mt-4">
              <AdBanner />
            </div>
          </div>
        </>
      )}

      {/* Refresh toast */}
      {showRefreshToast && (
        <div className="absolute inset-x-0 top-16 z-50 flex justify-center pointer-events-none">
          <div className="px-4 py-2.5 rounded-xl bg-black/80 text-white text-xs shadow-xl animate-fade-in max-w-[280px] text-center leading-relaxed">
            加速计时已更新 ^_^<br />
            <span className="text-white/70">看广告兑加速时长，刷新可延长加速时间</span>
          </div>
        </div>
      )}
    </div>
  )
}
