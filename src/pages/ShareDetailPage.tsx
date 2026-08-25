import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Users, Calendar, TrendingUp } from "lucide-react"

interface ShareDetailPageProps {
  onBack: () => void
}

interface ShareRecord {
  id: number
  uid: string
  registerTime: string
}

const MOCK_SHARE_RECORDS: ShareRecord[] = [
  { id: 1, uid: "10086501", registerTime: "2026/08/10 14:22" },
  { id: 2, uid: "10086478", registerTime: "2026/08/08 09:15" },
  { id: 3, uid: "10086423", registerTime: "2026/08/05 20:47" },
  { id: 4, uid: "10086390", registerTime: "2026/07/29 11:30" },
  { id: 5, uid: "10086355", registerTime: "2026/07/22 16:08" },
  { id: 6, uid: "10086301", registerTime: "2026/07/15 08:53" },
]

const CUTOFF_DATE = "2026年8月14日"

export function ShareDetailPage({ onBack }: ShareDetailPageProps) {
  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />

      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-foreground">分享明细</h2>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-5 pb-8">

        {/* Summary card */}
        <Card className="overflow-hidden border-0 relative mb-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-ocean-mid to-accent/5" />
          <CardContent className="p-5 relative z-10">
            {/* Cutoff date label */}
            <div className="flex items-center gap-1.5 mb-4">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">
                统计截止至 <span className="text-foreground font-medium">{CUTOFF_DATE}</span>
              </span>
            </div>

            {/* Summary stats */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Users className="w-5.5 h-5.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">累计分享注册</p>
                  <p className="text-2xl font-bold text-foreground leading-tight">
                    {MOCK_SHARE_RECORDS.length}
                    <span className="text-xs font-normal text-muted-foreground ml-1">人</span>
                  </p>
                </div>
              </div>
              <div className="h-10 w-px bg-border/30" />
              <div className="flex items-center gap-3 flex-1">
                <div className="w-11 h-11 rounded-xl bg-status-connected/15 flex items-center justify-center">
                  <TrendingUp className="w-5.5 h-5.5 text-status-connected" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">贡献积分</p>
                  <p className="text-2xl font-bold text-foreground leading-tight">
                    {MOCK_SHARE_RECORDS.length * 100}
                    <span className="text-xs font-normal text-muted-foreground ml-1">分</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Records list */}
        <p className="text-xs font-semibold text-muted-foreground/70 mb-3 px-1">分享记录</p>
        <Card className="glass-card border-0 overflow-hidden">
          <CardContent className="p-0">
            {MOCK_SHARE_RECORDS.length > 0 ? (
              MOCK_SHARE_RECORDS.map((record, index) => (
                <div key={record.id}>
                  <div className="flex items-center justify-between px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted/30 flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">{record.id}</span>
                      </div>
                      <div>
                        <p className="text-sm text-foreground">UID: {record.uid}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {record.registerTime}
                    </span>
                  </div>
                  {index < MOCK_SHARE_RECORDS.length - 1 && (
                    <div className="ml-[52px] mr-4 border-b border-white/8" />
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center py-16">
                <Users className="w-10 h-10 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">暂无分享记录</p>
                <p className="text-xs text-muted-foreground/60 mt-1">分享邀请链接给好友试试</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
