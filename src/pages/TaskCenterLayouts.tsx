/**
 * TaskCenter 备选布局：A 任务流 / B 账户总览 / C 分区标签
 * 所有布局共享同一套 SharedProps，业务逻辑在 TaskCenterPage 中
 */
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  PlayCircle, UserPlus, Crown, Coins, Gift,
  ChevronRight, CheckCircle2, ArrowRight, Zap,
  History, Play, Trophy, MessageCircle, Copy,
  Sparkles, Timer, TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { type TaskItem } from "@/pages/TaskCenterPage"

export interface SharedProps {
  points: number
  memberMinutes: number
  isMember: boolean
  adWatchedCount: number
  isWatchingAd: boolean
  adDone: boolean
  adTodayEarned: number
  AD_MAX: number
  AD_REWARD: number
  tasks: TaskItem[]
  showCopyToast: boolean
  showConfirmDialog: boolean
  onToggleMember?: () => void
  onOpenShare: () => void
  onOpenOtherBenefits: () => void
  onOpenPointsExchange: () => void
  onOpenPointsHistory: () => void
  handleWatchAd: () => void
  handleTask: (id: string) => void
  handleCopyQQGroup: () => void
  setShowConfirmDialog: (v: boolean) => void
}

// ── 公共小组件 ────────────────────────────────────────────────────────

function AdProgress({ adWatchedCount, AD_MAX }: { adWatchedCount: number; AD_MAX: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: AD_MAX }).map((_, i) => (
        <div key={i} className={cn(
          "flex-1 h-1.5 rounded-full transition-all",
          i < adWatchedCount ? "bg-status-warning" : "bg-foreground/10"
        )} />
      ))}
    </div>
  )
}

function CopyToast({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="px-5 py-3 rounded-xl bg-black/80 text-white text-sm shadow-xl animate-fade-in">
        群号已复制，请打开QQ搜索添加交流群
      </div>
    </div>
  )
}

function ConfirmDialog({ show, onConfirm, onClose }: { show: boolean; onConfirm: () => void; onClose: () => void }) {
  if (!show) return null
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="mx-6 w-full max-w-[300px] rounded-2xl bg-[hsl(210_30%_12%)] border border-white/10 shadow-2xl animate-fade-in">
        <div className="p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-3">
            <Crown className="w-6 h-6 text-violet-400" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">限量福利</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            看广告，请在积分大于400时激活此任务入口^_^
          </p>
        </div>
        <div className="flex border-t border-white/10">
          <button onClick={onClose} className="flex-1 py-3 text-sm text-muted-foreground hover:bg-white/5 transition-colors">取消</button>
          <button onClick={onConfirm} className="flex-1 py-3 text-sm font-semibold text-violet-400 hover:bg-violet-500/10 transition-colors border-l border-white/10">确认</button>
        </div>
      </div>
    </div>
  )
}

// =====================================================================
// Layout A - 任务流（运营转化型）
// 核心策略：看广告 CTA 最顶部，进页面即开始赚分；积分/会员作为进度反馈
// =====================================================================
export function LayoutTaskStream(p: SharedProps) {
  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
      <div className="h-12" />

      {/* Header：简洁，今日进度数字放右侧 */}
      <div className="relative z-10 px-5 pt-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">免费会员</h2>
          <p className="text-[11px] text-muted-foreground/70">真免费！无惧欺诈受骗</p>
        </div>
        <div className="flex items-center gap-3">
          {/* 积分徽章 */}
          <button onClick={p.onOpenPointsHistory} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card active:scale-95 transition-transform">
            <Coins className="w-3.5 h-3.5 text-status-warning" />
            <span className="text-xs font-bold text-foreground">{p.points}</span>
          </button>
          {/* 会员徽章 */}
          <button onClick={p.onOpenPointsExchange} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card active:scale-95 transition-transform">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-foreground">{p.memberMinutes}m</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-auto px-5 pt-4 pb-28 space-y-3">

        {/* ① 看广告：最顶最大，立即行动 */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-status-warning/20 via-[hsl(210_40%_10%)] to-status-warning/10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-status-warning/50 to-transparent" />
          <div className="p-4 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center",
                  p.adDone ? "bg-status-connected/20" : "bg-status-warning/20"
                )}>
                  {p.adDone ? <Trophy className="w-5 h-5 text-status-connected" /> : <PlayCircle className="w-5 h-5 text-status-warning" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">看广告赚积分</p>
                  <p className="text-[11px] text-foreground/60">今日 {p.adWatchedCount}/{p.AD_MAX} 次 · 已赚 {p.adTodayEarned}</p>
                </div>
              </div>
              <button
                onClick={p.handleWatchAd}
                disabled={p.adDone || p.isWatchingAd}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-bold flex-shrink-0 transition-all active:scale-95",
                  p.adDone ? "bg-status-connected/15 text-status-connected"
                    : p.isWatchingAd ? "bg-primary/20 text-primary animate-pulse"
                    : "bg-gradient-to-r from-status-warning to-[hsl(38_100%_55%)] text-white shadow-[0_2px_18px_hsl(45_100%_55%/0.35)]"
                )}
              >
                {p.adDone ? "已完成" : p.isWatchingAd ? "播放中…" : `+${p.AD_REWARD}积分`}
              </button>
            </div>
            <AdProgress adWatchedCount={p.adWatchedCount} AD_MAX={p.AD_MAX} />
            <p className="text-[10px] text-foreground/50 mt-1.5 text-right">
              {p.adDone ? "今日已满，明天继续"
                : `还可赚 ${(p.AD_MAX - p.adWatchedCount) * p.AD_REWARD} 积分`}
            </p>
          </div>
        </div>

        {/* ② 兑换入口：横排两个 */}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={p.onOpenPointsExchange} className="glass-card rounded-2xl p-3.5 flex items-center gap-2.5 active:scale-[0.97] transition-transform">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Gift className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs font-semibold text-foreground">兑换会员</p>
              <p className="text-[10px] text-muted-foreground truncate">积分 → 加速时长</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto flex-shrink-0" />
          </button>
          <button onClick={p.onOpenPointsHistory} className="glass-card rounded-2xl p-3.5 flex items-center gap-2.5 active:scale-[0.97] transition-transform">
            <div className="w-8 h-8 rounded-lg bg-status-warning/15 flex items-center justify-center flex-shrink-0">
              <History className="w-4 h-4 text-status-warning" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs font-semibold text-foreground">积分明细</p>
              <p className="text-[10px] text-muted-foreground truncate">收支记录</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto flex-shrink-0" />
          </button>
        </div>

        {/* ③ 任务列表 */}
        <div className="space-y-2.5">
          <p className="text-[11px] text-muted-foreground font-medium tracking-wider uppercase px-1">更多任务</p>
          {p.tasks.map((task) => {
            const Icon = task.icon
            const isOther = task.id === "other"
            return (
              <div key={task.id}
                onClick={() => !task.completed && p.handleTask(task.id)}
                className={cn(
                  "relative rounded-xl overflow-hidden transition-all",
                  task.completed ? "opacity-60" : "cursor-pointer active:scale-[0.98]"
                )}
              >
                <div className={cn("absolute inset-0",
                  isOther ? "bg-gradient-to-r from-violet-500/70 via-purple-400/60 to-fuchsia-500/70"
                    : "bg-gradient-to-r from-pink-500/50 via-orange-400/40 to-amber-400/50"
                )} />
                <div className={cn("absolute inset-0 border rounded-xl",
                  isOther ? "border-violet-400/70" : "border-pink-400/50"
                )} />
                <div className="p-3.5 flex items-center gap-3 relative z-10">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                    <Icon className={cn("w-4.5 h-4.5", isOther ? "text-violet-300" : "text-pink-400")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">{task.title}</p>
                    <p className="text-[10px] text-foreground/60 truncate">{task.description}</p>
                  </div>
                  <span className={cn("text-xs font-bold mr-1", isOther ? "text-fuchsia-300" : "text-amber-400")}>
                    +{task.reward}分
                  </span>
                  {task.completed
                    ? <CheckCircle2 className="w-4.5 h-4.5 text-status-connected" />
                    : <ChevronRight className="w-4 h-4 text-foreground/50" />}
                </div>
              </div>
            )
          })}
        </div>

        {/* ④ QQ 群 */}
        <div onClick={p.handleCopyQQGroup}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer active:scale-[0.98] transition-all relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#12B7F5]/50 via-cyan-400/40 to-blue-500/50" />
          <div className="absolute inset-0 border border-[#12B7F5]/55 rounded-xl" />
          <div className="w-8 h-8 rounded-lg bg-[#12B7F5]/40 flex items-center justify-center flex-shrink-0 relative z-10">
            <MessageCircle className="w-4 h-4 text-[#12B7F5]" />
          </div>
          <div className="flex-1 min-w-0 relative z-10">
            <p className="text-xs font-medium text-foreground">免费加速QQ交流群</p>
            <p className="text-[10px] text-foreground/60">群号：593635448</p>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#12B7F5] relative z-10 font-medium flex-shrink-0">
            <Copy className="w-3.5 h-3.5" />复制
          </div>
        </div>
      </div>

      <CopyToast show={p.showCopyToast} />
      <ConfirmDialog show={p.showConfirmDialog}
        onConfirm={() => { p.setShowConfirmDialog(false); p.onOpenOtherBenefits() }}
        onClose={() => p.setShowConfirmDialog(false)}
      />
    </div>
  )
}

// =====================================================================
// Layout B - 账户总览（资产感知型）
// 核心策略：顶部大卡片强调"你的资产"，激发用户对余额不足的行动欲
// =====================================================================
export function LayoutAccount(p: SharedProps) {
  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-primary/5 blur-[80px]" />
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">免费会员</h2>
          <p className="text-[11px] text-muted-foreground/70">真免费！无惧欺诈受骗</p>
        </div>
        <button onClick={p.onOpenPointsHistory}
          className="flex items-center gap-1 text-[11px] text-primary active:scale-95 transition-transform"
        >
          <History className="w-3.5 h-3.5" />明细
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-auto px-5 pt-4 pb-28 space-y-4">

        {/* 大资产卡：积分+会员时长并排，视觉强调余额 */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-[hsl(220_35%_10%)] to-accent/10" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="p-5 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-status-warning" />
                  <span className="text-[10px] text-muted-foreground">我的积分</span>
                </div>
                <p className="text-3xl font-bold text-foreground leading-none">{p.points}</p>
                <button onClick={p.onOpenPointsExchange}
                  className="flex items-center gap-1 text-[10px] text-primary mt-1 active:scale-95 transition-transform"
                >
                  <Gift className="w-3 h-3" />兑换会员 <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 border-l border-border/50 pl-4">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] text-muted-foreground">加速会员</span>
                </div>
                <div>
                  <span className="text-3xl font-bold text-foreground leading-none">{p.memberMinutes}</span>
                  <span className="text-xs text-muted-foreground ml-1">分钟</span>
                </div>
                <p className="text-[10px] text-red-400 mt-1">{p.isMember ? "后到期" : "请兑会员"}</p>
              </div>
            </div>

            {/* 进度提示：今日可赚多少分 */}
            {!p.adDone && (
              <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-status-warning" />
                  <span className="text-[11px] text-muted-foreground">今日还可赚</span>
                  <span className="text-[11px] font-bold text-status-warning">
                    {(p.AD_MAX - p.adWatchedCount) * p.AD_REWARD} 积分
                  </span>
                </div>
                <button onClick={p.handleWatchAd} disabled={p.isWatchingAd}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-status-warning/15 text-status-warning text-[11px] font-semibold active:scale-95 transition-all"
                >
                  <Play className="w-3 h-3" />
                  {p.isWatchingAd ? "播放中…" : "立即赚"}
                </button>
              </div>
            )}
            {p.adDone && (
              <div className="mt-4 pt-3 border-t border-border/30 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-status-connected" />
                <span className="text-[11px] text-status-connected font-semibold">今日广告任务已全部完成！明天继续</span>
              </div>
            )}
          </div>
        </div>

        {/* 赚积分方式：大进度条广告卡 */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-status-warning/12 via-[hsl(210_40%_10%)] to-transparent" />
          <div className="p-4 relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4.5 h-4.5 text-status-warning" />
                <p className="text-sm font-bold text-foreground">看广告赚积分</p>
                <span className="text-[10px] bg-status-warning/15 text-status-warning px-1.5 py-0.5 rounded-full font-semibold">
                  {p.adWatchedCount}/{p.AD_MAX} 次
                </span>
              </div>
              <button onClick={p.handleWatchAd} disabled={p.adDone || p.isWatchingAd}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95",
                  p.adDone ? "bg-status-connected/15 text-status-connected"
                    : p.isWatchingAd ? "bg-primary/20 text-primary animate-pulse"
                    : "bg-gradient-to-r from-status-warning to-[hsl(38_100%_55%)] text-white shadow-[0_2px_16px_hsl(45_100%_55%/0.3)]"
                )}
              >
                {p.adDone ? <><CheckCircle2 className="w-3.5 h-3.5" />完成</>
                  : p.isWatchingAd ? <><Play className="w-3.5 h-3.5 animate-pulse" />播放中</>
                  : <><Play className="w-3.5 h-3.5" />观看</>}
              </button>
            </div>
            <AdProgress adWatchedCount={p.adWatchedCount} AD_MAX={p.AD_MAX} />
          </div>
        </div>

        {/* 任务卡：竖列 */}
        <div className="space-y-2">
          <p className="text-[11px] text-muted-foreground font-medium tracking-wider uppercase px-1">赚积分任务</p>
          {p.tasks.map((task) => {
            const Icon = task.icon
            const isOther = task.id === "other"
            return (
              <div key={task.id}
                onClick={() => !task.completed && p.handleTask(task.id)}
                className={cn("relative rounded-xl overflow-hidden transition-all",
                  task.completed ? "opacity-60" : "cursor-pointer active:scale-[0.98]"
                )}
              >
                <div className={cn("absolute inset-0", isOther
                  ? "bg-gradient-to-r from-violet-500/70 via-purple-400/60 to-fuchsia-500/70"
                  : "bg-gradient-to-r from-pink-500/50 via-orange-400/40 to-amber-400/50"
                )} />
                <div className={cn("absolute inset-0 border rounded-xl",
                  isOther ? "border-violet-400/70" : "border-pink-400/50"
                )} />
                <div className="p-3.5 flex items-center gap-3 relative z-10">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon className={cn("w-4.5 h-4.5", isOther ? "text-violet-300" : "text-pink-400")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">{task.title}</p>
                    <p className="text-[10px] text-foreground/60 truncate">{task.description}</p>
                  </div>
                  <span className={cn("text-xs font-bold mr-1", isOther ? "text-fuchsia-300" : "text-amber-400")}>
                    +{task.reward}分
                  </span>
                  {task.completed
                    ? <CheckCircle2 className="w-4.5 h-4.5 text-status-connected" />
                    : <ChevronRight className="w-4 h-4 text-foreground/50" />}
                </div>
              </div>
            )
          })}
        </div>

        {/* QQ 群 */}
        <div onClick={p.handleCopyQQGroup}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer active:scale-[0.98] transition-all relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#12B7F5]/50 via-cyan-400/40 to-blue-500/50" />
          <div className="absolute inset-0 border border-[#12B7F5]/55 rounded-xl" />
          <div className="w-8 h-8 rounded-lg bg-[#12B7F5]/40 flex items-center justify-center flex-shrink-0 relative z-10">
            <MessageCircle className="w-4 h-4 text-[#12B7F5]" />
          </div>
          <div className="flex-1 min-w-0 relative z-10">
            <p className="text-xs font-medium text-foreground">免费加速QQ交流群</p>
            <p className="text-[10px] text-foreground/60">群号：593635448</p>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#12B7F5] relative z-10 font-medium flex-shrink-0">
            <Copy className="w-3.5 h-3.5" />复制
          </div>
        </div>
      </div>

      <CopyToast show={p.showCopyToast} />
      <ConfirmDialog show={p.showConfirmDialog}
        onConfirm={() => { p.setShowConfirmDialog(false); p.onOpenOtherBenefits() }}
        onClose={() => p.setShowConfirmDialog(false)}
      />
    </div>
  )
}

// =====================================================================
// Layout C - 分区标签（高频回访型）
// 核心策略：顶部标签切换「赚积分/兑会员/社区」，每个 Tab 专注一件事
// =====================================================================
export function LayoutTabs(p: SharedProps) {
  const [tab, setTab] = useState<"earn" | "exchange" | "community">("earn")

  const tabs = [
    { key: "earn" as const,     label: "赚积分",  icon: Sparkles },
    { key: "exchange" as const, label: "兑会员",  icon: Timer },
    { key: "community" as const,label: "社区",    icon: MessageCircle },
  ]

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
      <div className="h-12" />

      {/* Header + 积分/会员徽章 */}
      <div className="relative z-10 px-5 pt-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">免费会员</h2>
          <p className="text-[11px] text-muted-foreground/70">真免费！无惧欺诈受骗</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full glass-card">
            <Coins className="w-3 h-3 text-status-warning" />
            <span className="text-[11px] font-bold text-foreground">{p.points}</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full glass-card">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-[11px] font-bold text-foreground">{p.memberMinutes}m</span>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="relative z-10 px-5 pt-4">
        <div className="flex items-center p-1 rounded-xl glass-card gap-0.5">
          {tabs.map((t) => {
            const Icon = t.icon
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all",
                  tab === t.key
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_2px_10px_hsl(38_92%_55%/0.25)]"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab 内容 */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-4 pb-28">

        {/* ── 赚积分 Tab ── */}
        {tab === "earn" && (
          <div className="space-y-3">
            {/* 广告卡 */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-status-warning/18 via-[hsl(210_40%_10%)] to-status-warning/8" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-status-warning/50 to-transparent" />
              <div className="p-4 relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center",
                      p.adDone ? "bg-status-connected/20" : "bg-status-warning/20"
                    )}>
                      {p.adDone ? <Trophy className="w-5 h-5 text-status-connected" /> : <PlayCircle className="w-5 h-5 text-status-warning" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">看广告赚积分</p>
                      <p className="text-[11px] text-foreground/60">
                        {p.adWatchedCount}/{p.AD_MAX} 次 · 今日已赚 {p.adTodayEarned}
                        {!p.adDone && ` · 还可赚 `}
                        {!p.adDone && <span className="text-status-warning font-bold">{(p.AD_MAX - p.adWatchedCount) * p.AD_REWARD}</span>}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] bg-status-warning/15 text-status-warning px-2 py-0.5 rounded-full font-bold">+{p.AD_REWARD}/次</span>
                </div>
                <AdProgress adWatchedCount={p.adWatchedCount} AD_MAX={p.AD_MAX} />
                <button onClick={p.handleWatchAd} disabled={p.adDone || p.isWatchingAd}
                  className={cn(
                    "mt-3 w-full h-11 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]",
                    p.adDone ? "bg-status-connected/15 text-status-connected"
                      : p.isWatchingAd ? "bg-primary/20 text-primary animate-pulse"
                      : "bg-gradient-to-r from-status-warning to-[hsl(38_100%_55%)] text-white shadow-[0_4px_20px_hsl(45_100%_55%/0.35)]"
                  )}
                >
                  {p.adDone ? <><CheckCircle2 className="w-4 h-4" />今日已完成</>
                    : p.isWatchingAd ? <><Play className="w-4 h-4 animate-pulse" />广告播放中…</>
                    : <><Play className="w-4 h-4" />点击观看广告</>}
                </button>
              </div>
            </div>

            {/* 任务列表 */}
            <div className="space-y-2">
              {p.tasks.map((task) => {
                const Icon = task.icon
                const isOther = task.id === "other"
                return (
                  <div key={task.id}
                    onClick={() => !task.completed && p.handleTask(task.id)}
                    className={cn("relative rounded-xl overflow-hidden transition-all",
                      task.completed ? "opacity-60" : "cursor-pointer active:scale-[0.98]"
                    )}
                  >
                    <div className={cn("absolute inset-0", isOther
                      ? "bg-gradient-to-r from-violet-500/70 via-purple-400/60 to-fuchsia-500/70"
                      : "bg-gradient-to-r from-pink-500/50 via-orange-400/40 to-amber-400/50"
                    )} />
                    <div className={cn("absolute inset-0 border rounded-xl",
                      isOther ? "border-violet-400/70" : "border-pink-400/50"
                    )} />
                    <div className="p-3.5 flex items-center gap-3 relative z-10">
                      <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                        <Icon className={cn("w-4.5 h-4.5", isOther ? "text-violet-300" : "text-pink-400")} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground">{task.title}</p>
                        <p className="text-[10px] text-foreground/60 truncate">{task.description}</p>
                      </div>
                      <span className={cn("text-xs font-bold mr-1", isOther ? "text-fuchsia-300" : "text-amber-400")}>
                        +{task.reward}分
                      </span>
                      {task.completed
                        ? <CheckCircle2 className="w-4.5 h-4.5 text-status-connected" />
                        : <ChevronRight className="w-4 h-4 text-foreground/50" />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── 兑会员 Tab ── */}
        {tab === "exchange" && (
          <div className="space-y-4">
            {/* 当前余额 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card rounded-2xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-status-warning" />
                  <span className="text-xs text-muted-foreground">积分余额</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{p.points}</p>
                <button onClick={p.onOpenPointsHistory}
                  className="flex items-center gap-1 text-[10px] text-primary active:scale-95 transition-transform"
                >
                  <History className="w-3 h-3" />查看明细
                </button>
              </div>
              <div className="glass-card rounded-2xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">会员时长</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-foreground">{p.memberMinutes}</span>
                  <span className="text-xs text-muted-foreground ml-1">分钟</span>
                </div>
                <p className="text-[10px] text-red-400">{p.isMember ? "后到期" : "请兑会员"}</p>
              </div>
            </div>

            {/* 兑换按钮 */}
            <button onClick={p.onOpenPointsExchange}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-base flex items-center justify-center gap-2 shadow-[0_4px_24px_hsl(38_92%_55%/0.35)] active:scale-[0.98] transition-all"
            >
              <Gift className="w-5 h-5" />
              立即兑换会员时长
            </button>

            {/* 兑换说明 */}
            <div className="glass-card rounded-2xl p-4 space-y-2.5">
              <p className="text-xs font-semibold text-foreground">兑换说明</p>
              {[
                ["积分来源", "看广告、邀请好友、完成任务"],
                ["兑换比例", "积分可按比例兑换加速时长"],
                ["有效期", "兑换后的会员时长永久有效"],
                ["会员日", "每月8/18/28日可享超值兑换"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start gap-2">
                  <span className="text-[10px] text-muted-foreground w-14 flex-shrink-0 pt-0.5">{k}</span>
                  <span className="text-[10px] text-foreground/80 flex-1">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 社区 Tab ── */}
        {tab === "community" && (
          <div className="space-y-3">
            {/* QQ 群卡片：大版 */}
            <div onClick={p.handleCopyQQGroup}
              className="relative rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#12B7F5]/40 via-cyan-400/20 to-blue-500/30" />
              <div className="absolute inset-0 border border-[#12B7F5]/50 rounded-2xl" />
              <div className="p-5 relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#12B7F5]/25 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-[#12B7F5]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">免费加速QQ交流群</p>
                  <p className="text-xs text-foreground/60 mt-0.5">与其他用户交流经验，获取最新福利</p>
                  <p className="text-xs text-[#12B7F5] mt-1.5 font-semibold">群号：593635448</p>
                </div>
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <Copy className="w-4.5 h-4.5 text-[#12B7F5]" />
                  <span className="text-[10px] text-[#12B7F5]">复制群号</span>
                </div>
              </div>
            </div>

            {/* 邀请好友 */}
            <div onClick={p.onOpenShare}
              className="relative rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/50 via-orange-400/40 to-amber-400/50" />
              <div className="absolute inset-0 border border-pink-400/50 rounded-2xl" />
              <div className="p-4 relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-5 h-5 text-pink-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">邀请好友得积分</p>
                  <p className="text-xs text-foreground/60 mt-0.5">邀好友 1:1 得积分，无上限</p>
                </div>
                <span className="text-sm font-bold text-amber-400 flex-shrink-0">+100分</span>
                <ChevronRight className="w-4 h-4 text-foreground/50 flex-shrink-0" />
              </div>
            </div>

            {/* 占位提示 */}
            <div className="glass-card rounded-2xl p-5 text-center">
              <p className="text-xs text-muted-foreground/60">更多社区功能即将上线，敬请期待</p>
            </div>
          </div>
        )}
      </div>

      <CopyToast show={p.showCopyToast} />
      <ConfirmDialog show={p.showConfirmDialog}
        onConfirm={() => { p.setShowConfirmDialog(false); p.onOpenOtherBenefits() }}
        onClose={() => p.setShowConfirmDialog(false)}
      />
    </div>
  )
}
