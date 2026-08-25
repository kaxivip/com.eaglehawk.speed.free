import { useState, useMemo } from "react"
import { ChevronLeft, ArrowUpCircle, ArrowDownCircle, ChevronDown, ChevronUp, Coins } from "lucide-react"

export interface PointsRecord {
  id: number
  type: "earn" | "spend"
  title: string
  amount: number
  time: string
}

interface PointsHistoryPageProps {
  records: PointsRecord[]
  currentPoints: number
  onBack: () => void
}

export function PointsHistoryPage({ records, currentPoints: _currentPoints, onBack }: PointsHistoryPageProps) {
  const [activeTab, setActiveTab] = useState<"earn" | "spend">("earn")
  const [summaryExpanded, setSummaryExpanded] = useState(false)

  const earnRecords = records.filter(r => r.type === "earn").slice(0, 50)
  const spendRecords = records.filter(r => r.type === "spend").slice(0, 50)
  const activeRecords = activeTab === "earn" ? earnRecords : spendRecords

  // Compute earn summary grouped by title
  const earnSummary = useMemo(() => {
    const groups = earnRecords.reduce<Record<string, number>>((acc, r) => {
      acc[r.title] = (acc[r.title] || 0) + r.amount
      return acc
    }, {})
    const items = Object.entries(groups)
      .map(([title, total]) => ({ title, total }))
      .sort((a, b) => b.total - a.total)
    const grandTotal = items.reduce((sum, i) => sum + i.total, 0)
    return { items, grandTotal }
  }, [earnRecords])

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-status-warning/5 blur-[80px]" />

      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-foreground">积分明细</h2>
      </div>

      {/* Tabs */}
      <div className="relative z-10 px-5 pt-5">
        <div className="flex rounded-xl bg-muted/30 p-1">
          <button
            onClick={() => setActiveTab("earn")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "earn"
                ? "bg-status-connected/15 text-status-connected shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            获取
          </button>
          <button
            onClick={() => setActiveTab("spend")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "spend"
                ? "bg-status-disconnected/15 text-status-disconnected shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            消耗
          </button>
        </div>
      </div>

      {/* Record list */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-3 pb-8 space-y-2">

        {/* Earn summary card */}
        {activeTab === "earn" && earnSummary.items.length > 0 && (
          <div className="rounded-2xl overflow-hidden mb-3">
            {/* Collapsed header - always visible */}
            <button
              onClick={() => setSummaryExpanded((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-status-connected/10 via-status-connected/5 to-transparent border border-status-connected/15 rounded-2xl transition-all hover:border-status-connected/25"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-status-connected/15 flex items-center justify-center">
                  <Coins className="w-3.5 h-3.5 text-status-connected" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground">截止 2026/08/16</p>
                  <p className="text-sm font-bold text-foreground">
                    共获取 <span className="text-status-connected">{earnSummary.grandTotal}</span> 积分
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {summaryExpanded ? "收起" : "查看明细"}
                {summaryExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </div>
            </button>

            {/* Expanded details */}
            {summaryExpanded && (
              <div className="mt-2 rounded-xl bg-muted/20 border border-border/20 px-4 py-3 space-y-2.5 animate-fade-in">
                {earnSummary.items.map((item, index) => (
                  <div key={item.title} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded bg-muted/50 flex items-center justify-center text-[9px] font-bold text-muted-foreground">
                        {index + 1}
                      </span>
                      <span className="text-xs text-foreground/80">{item.title}</span>
                    </div>
                    <span className="text-xs font-semibold text-status-connected">+{item.total}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <p className="text-sm text-muted-foreground">
              {activeTab === "earn" ? "暂无获取记录" : "暂无消耗记录"}
            </p>
          </div>
        ) : (
          activeRecords.map((record) => (
            <div
              key={record.id}
              className="glass-card rounded-xl px-4 py-3 flex items-center gap-3"
            >
              {/* Icon */}
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                record.type === "earn" ? "bg-status-connected/10" : "bg-status-disconnected/10"
              }`}>
                {record.type === "earn" ? (
                  <ArrowUpCircle className="w-4.5 h-4.5 text-status-connected" />
                ) : (
                  <ArrowDownCircle className="w-4.5 h-4.5 text-status-disconnected" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{record.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{record.time}</p>
              </div>

              {/* Amount */}
              <span className={`text-sm font-bold flex-shrink-0 ${
                record.type === "earn" ? "text-status-connected" : "text-status-disconnected"
              }`}>
                {record.type === "earn" ? "+" : "-"}{record.amount}
              </span>
            </div>
          ))
        )}

        {/* Bottom hint */}
        {activeRecords.length > 0 && (
          <p className="text-center text-[10px] text-muted-foreground/40 pt-2 pb-4">
            仅显示最近 {activeRecords.length} 条记录
          </p>
        )}
      </div>
    </div>
  )
}
