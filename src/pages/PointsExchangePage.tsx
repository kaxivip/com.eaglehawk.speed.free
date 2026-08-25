import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronDown, Clock, Coins, CheckCircle2, Lock, Crown } from "lucide-react"

interface PointsExchangePageProps {
  points: number
  memberMinutes: number
  onBack: () => void
  onExchange: (costPoints: number, minutes: number) => void
}

interface MembershipProduct {
  id: string
  duration: number
  durationLabel: string
  costPoints: number
  popular?: boolean
  badge?: string
  memberDayOnly?: boolean
  theme?: "crimson" | "violet"
}

const PRODUCTS: MembershipProduct[] = [
  { id: "30min", duration: 30, durationLabel: "30分钟", costPoints: 30 },
  { id: "1h", duration: 60, durationLabel: "1小时", costPoints: 60, popular: true },
  { id: "24h", duration: 1440, durationLabel: "24小时", costPoints: 1200 },
  { id: "7d", duration: 10080, durationLabel: "7天", costPoints: 7200 },
]

const MEMBER_DAY_PRODUCTS: MembershipProduct[] = [
  {
    id: "member-day-7d",
    duration: 10080,
    durationLabel: "7×24小时",
    costPoints: 1000,
    badge: "每月8/18/28开放",
    memberDayOnly: true,
    theme: "crimson",
  },
  {
    id: "member-day-24h",
    duration: 1440,
    durationLabel: "24小时",
    costPoints: 500,
    badge: "每月8/18/28开放",
    memberDayOnly: true,
    theme: "violet",
  },
]

function getIsMemberDay(): boolean {
  const day = new Date().getDate()
  return day === 8 || day === 18 || day === 28
}

function getNextMemberDay(): Date {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()

  const candidateDays = [8, 18, 28]
  let nextDate: Date | null = null

  // Check remaining member days in current month
  for (const d of candidateDays) {
    if (d > day) {
      nextDate = new Date(year, month, d, 0, 0, 0)
      break
    }
  }

  // If none left, use first member day of next month
  if (!nextDate) {
    nextDate = new Date(year, month + 1, 8, 0, 0, 0)
  }

  return nextDate
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

export function PointsExchangePage({ points, memberMinutes: _memberMinutes, onBack, onExchange }: PointsExchangePageProps) {
  const [exchanging, setExchanging] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [forceMemberDay, setForceMemberDay] = useState(false)
  const [forceEnoughPoints, setForceEnoughPoints] = useState(false)
  const isMemberDay = forceMemberDay || getIsMemberDay()
  const [memberDayExpanded, setMemberDayExpanded] = useState(isMemberDay)

  const handleExchange = (product: MembershipProduct) => {
    if (points < product.costPoints) return
    setExchanging(product.id)
    setTimeout(() => {
      onExchange(product.costPoints, product.duration)
      setExchanging(null)
      setSuccess(product.id)
      setTimeout(() => setSuccess(null), 2000)
    }, 600)
  }

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-status-warning/5 blur-[80px]" />

      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-bold text-foreground">积分兑换</h2>
        </div>
        {/* Debug toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setForceMemberDay((v) => !v)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium transition-all ${
              forceMemberDay
                ? "bg-status-warning/20 text-status-warning border border-status-warning/30"
                : "bg-muted/50 text-muted-foreground border border-border/50"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            会员日
          </button>
          <button
            onClick={() => setForceEnoughPoints((v) => !v)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium transition-all ${
              forceEnoughPoints
                ? "bg-status-connected/20 text-status-connected border border-status-connected/30"
                : "bg-muted/50 text-muted-foreground border border-border/50"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            积分足
          </button>
        </div>
      </div>

      {/* Points card */}
      <div className="relative z-10 px-5 pt-5">
        <Card className="overflow-hidden border-0 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-status-warning/10 via-ocean-mid to-primary/5" />
          <CardContent className="p-5 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-status-warning" />
                  <span className="text-sm text-muted-foreground">我的积分</span>
                </div>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {points}
                  <span className="text-sm font-normal text-muted-foreground ml-1.5">积分</span>
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-status-warning/10 flex items-center justify-center">
                <Coins className="w-7 h-7 text-status-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product list */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-5 pb-8 space-y-4">
        <MemberDaySection
          isMemberDay={isMemberDay}
          expanded={memberDayExpanded}
          onToggleExpand={() => setMemberDayExpanded((v) => !v)}
          points={points}
          forceEnoughPoints={forceEnoughPoints}
          exchanging={exchanging}
          success={success}
          onExchange={handleExchange}
        />

        <p className="text-xs text-muted-foreground/70 font-medium px-1 pt-2">常规兑换</p>

        {PRODUCTS.map((product) => (
          <RegularProductCard
            key={product.id}
            product={product}
            points={points}
            forceEnoughPoints={forceEnoughPoints}
            exchanging={exchanging}
            success={success}
            onExchange={handleExchange}
          />
        ))}

        {/* Tips */}
        <div className="mt-6 px-1">
          <p className="text-[10px] text-muted-foreground/50 leading-relaxed text-center">
            积分永不过期 &middot; 兑换后会员时长立即生效 &middot; 会员时长从兑换时刻开始计算 &middot; 会员日专享仅限每月8/18/28日兑换
          </p>
        </div>
      </div>
    </div>
  )
}

interface ProductCardProps {
  product: MembershipProduct
  points: number
  forceEnoughPoints?: boolean
  exchanging: string | null
  success: string | null
  onExchange: (product: MembershipProduct) => void
}

function RegularProductCard({ product, points, forceEnoughPoints, exchanging, success, onExchange }: ProductCardProps) {
  const canAfford = forceEnoughPoints || points >= product.costPoints
  const isExchanging = exchanging === product.id
  const isSuccess = success === product.id
  const isDisabled = !canAfford || isExchanging

  return (
    <Card
      className={`glass-card border-0 relative overflow-hidden transition-all duration-200 ${
        canAfford ? "hover:bg-muted/30 cursor-pointer" : "opacity-60"
      } ${isSuccess ? "border-status-connected/30" : ""}`}
      onClick={() => !isDisabled && onExchange(product)}
    >
      {product.popular && (
        <div className="absolute top-0 right-0 bg-status-warning/90 text-primary-foreground text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg">
          热门
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              canAfford ? "bg-primary/10" : "bg-muted/50"
            }`}>
              <Clock className={`w-5 h-5 ${canAfford ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{product.durationLabel}会员</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Coins className="w-3 h-3 text-status-warning" />
                <span className="text-xs font-medium text-status-warning">{product.costPoints} 积分</span>
              </div>
            </div>
          </div>

          <div>
            {isSuccess ? (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-status-connected/10 text-status-connected text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                兑换成功
              </div>
            ) : isExchanging ? (
              <div className="px-3.5 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium animate-pulse">
                兑换中...
              </div>
            ) : canAfford ? (
              <div className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
                兑换
              </div>
            ) : (
              <div className="px-3.5 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs">
                积分不足
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface MemberDayProductCardProps extends ProductCardProps {
  isMemberDay: boolean
}

function MemberDayProductCard({ product, points, forceEnoughPoints, isMemberDay, exchanging, success, onExchange }: MemberDayProductCardProps) {
  const canAfford = forceEnoughPoints || points >= product.costPoints
  const isExchanging = exchanging === product.id
  const isSuccess = success === product.id
  const isAvailable = isMemberDay && canAfford
  const isDisabled = !isAvailable || isExchanging

  const theme = product.theme === "violet"
    ? {
        bg: "bg-gradient-to-br from-violet-600/85 via-purple-500/80 to-fuchsia-500/85",
        border: "border-violet-400/50",
        iconBg: "bg-white/20",
        iconColor: "text-white",
        titleColor: "text-white",
        pointsColor: "text-violet-100",
        badgeBg: "bg-white/20",
        badgeText: "text-white",
        buttonBg: "bg-white",
        buttonText: "text-violet-600",
      }
    : {
        bg: "bg-gradient-to-br from-rose-600/85 via-red-500/80 to-orange-500/85",
        border: "border-rose-400/50",
        iconBg: "bg-white/20",
        iconColor: "text-white",
        titleColor: "text-white",
        pointsColor: "text-rose-100",
        badgeBg: "bg-white/20",
        badgeText: "text-white",
        buttonBg: "bg-white",
        buttonText: "text-rose-600",
      }

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-200 ${theme.bg} ${isAvailable ? "cursor-pointer active:scale-[0.98]" : "opacity-70"}`}
      onClick={() => !isDisabled && onExchange(product)}
    >
      <div className={`absolute inset-0 rounded-xl border ${theme.border}`} />
      {product.badge && (
        <div className={`absolute top-0 right-0 ${theme.badgeBg} ${theme.badgeText} text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg flex items-center gap-1`}>
          <Clock className="w-3 h-3" />
          {product.badge}
        </div>
      )}
      <CardContent className="p-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${theme.iconBg}`}>
              <Clock className={`w-5 h-5 ${theme.iconColor}`} />
            </div>
            <div>
              <p className={`text-sm font-bold ${theme.titleColor}`}>{product.durationLabel}会员</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Coins className="w-3 h-3 text-status-warning" />
                <span className={`text-xs font-bold ${theme.pointsColor}`}>{product.costPoints} 积分</span>
              </div>
            </div>
          </div>

          <div>
            {isSuccess ? (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                兑换成功
              </div>
            ) : isExchanging ? (
              <div className="px-3.5 py-1.5 rounded-lg bg-white/20 text-white text-xs font-medium animate-pulse">
                兑换中...
              </div>
            ) : isMemberDay ? (
              canAfford ? (
                <div className={`px-3.5 py-1.5 rounded-lg ${theme.buttonBg} ${theme.buttonText} text-xs font-bold shadow-[0_2px_12px_rgba(0,0,0,0.2)]`}>
                  兑换
                </div>
              ) : (
                <div className="px-3.5 py-1.5 rounded-lg bg-black/20 text-white/70 text-xs">
                  积分不足
                </div>
              )
            ) : (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/20 text-white/70 text-xs font-medium">
                <Lock className="w-3 h-3" />
                暂未开放
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface MemberDaySectionProps {
  isMemberDay: boolean
  expanded: boolean
  onToggleExpand: () => void
  points: number
  forceEnoughPoints?: boolean
  exchanging: string | null
  success: string | null
  onExchange: (product: MembershipProduct) => void
}

function MemberDaySection({
  isMemberDay,
  expanded,
  onToggleExpand,
  points,
  forceEnoughPoints,
  exchanging,
  success,
  onExchange,
}: MemberDaySectionProps) {
  const showExpanded = isMemberDay || expanded
  const effectivePoints = forceEnoughPoints ? Infinity : points
  const minMemberDayCost = Math.min(...MEMBER_DAY_PRODUCTS.map((p) => p.costPoints))
  const cheapestProduct = MEMBER_DAY_PRODUCTS.find((p) => p.costPoints === minMemberDayCost)!
  const pointsNeeded = Math.max(0, minMemberDayCost - effectivePoints)
  const showShortageHint = isMemberDay && pointsNeeded > 0

  if (!showExpanded) {
    return <MemberDayTeaser onExpand={onToggleExpand} />
  }

  return (
    <>
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-muted-foreground/70 font-medium">会员日专享</p>
        {!isMemberDay && (
          <button
            onClick={onToggleExpand}
            className="flex items-center gap-0.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
          >
            收起
            <ChevronDown className="w-3 h-3 rotate-180" />
          </button>
        )}
      </div>

      {showShortageHint && (
        <p className="text-[10px] text-status-warning px-1">
          会员日仅限今日，再做 {pointsNeeded} 积分即可兑换 {cheapestProduct.durationLabel}会员，别错过！
        </p>
      )}

      {MEMBER_DAY_PRODUCTS.map((product) => (
        <MemberDayProductCard
          key={product.id}
          product={product}
          points={points}
          forceEnoughPoints={forceEnoughPoints}
          isMemberDay={isMemberDay}
          exchanging={exchanging}
          success={success}
          onExchange={onExchange}
        />
      ))}
    </>
  )
}

function MemberDayTeaser({ onExpand }: { onExpand: () => void }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(getNextMemberDay()))

  useEffect(() => {
    const target = getNextMemberDay()
    setTimeLeft(getTimeLeft(target))
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      onClick={onExpand}
      className="relative overflow-hidden rounded-2xl cursor-pointer active:scale-[0.98] transition-all duration-200"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2d1800] via-[#1a0e00] to-[#2d1800]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(38_100%_50%/0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,hsl(45_100%_55%/0.10),transparent_50%)]" />
      <div className="absolute inset-0 rounded-2xl border border-status-warning/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-status-warning/60 to-transparent" />

      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-status-warning/25 to-status-warning/10 flex items-center justify-center flex-shrink-0">
              <Crown className="w-5.5 h-5.5 text-status-warning" />
            </div>
            <div>
              <p className="text-sm font-black text-status-warning tracking-wide">会员日专享</p>
              <p className="text-[10px] text-muted-foreground mt-1">每月8/18/28开放 · 超值积分兑换</p>
              <p className="text-[10px] text-status-warning mt-1.5 font-medium">
                距下次会员日还有 {timeLeft.days > 0 ? `${timeLeft.days}天 ` : ""}
                {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-status-warning to-[hsl(38_100%_55%)] text-white text-xs font-bold shadow-[0_2px_14px_hsl(45_100%_55%/0.35)]">
            查看权益
            <ChevronDown className="w-3 h-3 -rotate-90" />
          </div>
        </div>
      </div>
    </div>
  )
}
