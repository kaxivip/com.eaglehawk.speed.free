import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Check, Wifi, Signal } from "lucide-react"

export type LineId = "smart" | "japan" | "hongkong" | "korea" | "usa"

export interface LineOption {
  id: LineId
  name: string
  region: string
  ping: string
  tag: string
}

export const LINE_OPTIONS: LineOption[] = [
  { id: "smart", name: "智能优选", region: "自动匹配最优线路", ping: "< 50ms", tag: "推荐" },
  { id: "japan", name: "日本-东京", region: "亚洲 · 低延迟", ping: "~ 80ms", tag: "热门" },
  { id: "hongkong", name: "香港-九龙", region: "亚洲 · 极速", ping: "~ 30ms", tag: "" },
  { id: "korea", name: "韩国-首尔", region: "亚洲 · 稳定", ping: "~ 60ms", tag: "" },
  { id: "usa", name: "美国-洛杉矶", region: "北美 · 大带宽", ping: "~ 180ms", tag: "" },
]

interface LineSelectPageProps {
  currentLine: LineId
  onSelectLine: (line: LineId) => void
  onBack: () => void
}

export function LineSelectPage({ currentLine, onSelectLine, onBack }: LineSelectPageProps) {
  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />

      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-foreground">加速线路</h2>
      </div>

      {/* Line cards */}
      <div className="relative z-10 px-5 pt-6 space-y-3 flex-1 overflow-y-auto pb-8">
        {LINE_OPTIONS.map((line) => {
          const isActive = currentLine === line.id
          return (
            <Card
              key={line.id}
              className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                isActive
                  ? "glass-card border-primary/30 glow-primary"
                  : "glass-card border-0 hover:bg-muted/30"
              }`}
              onClick={() => onSelectLine(line.id)}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              )}
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center gap-3.5">
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    isActive ? "bg-primary/15" : "bg-muted/50"
                  }`}>
                    {line.id === "smart" ? (
                      <Wifi className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    ) : (
                      <Signal className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{line.name}</h3>
                      {line.tag && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          line.tag === "推荐"
                            ? "bg-primary/15 text-primary"
                            : "bg-accent/15 text-accent"
                        }`}>
                          {line.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{line.region}</p>
                  </div>

                  {/* Ping + Check */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-mono ${
                      isActive ? "text-primary" : "text-muted-foreground/60"
                    }`}>
                      {line.ping}
                    </span>
                    {isActive && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
