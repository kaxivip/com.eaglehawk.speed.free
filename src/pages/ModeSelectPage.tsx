import { Card, CardContent } from "@/components/ui/card"
import { Globe, Smartphone, Check, Info, ChevronLeft, Plus } from "lucide-react"
import { APP_ICONS } from "@/lib/appData"

interface ModeSelectPageProps {
  currentMode: "global" | "app"
  selectedApps: string[]
  onSelectMode: (mode: "global" | "app") => void
  onOpenAppSelect: () => void
  onBack: () => void
}

export function ModeSelectPage({ currentMode, selectedApps, onSelectMode, onOpenAppSelect, onBack }: ModeSelectPageProps) {
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
        <h2 className="text-lg font-bold text-foreground">加速模式</h2>
      </div>

      {/* Mode cards */}
      <div className="relative z-10 px-5 pt-8 space-y-5">
        {/* Global mode */}
        <Card
          className={`cursor-pointer transition-all duration-300 overflow-hidden ${
            currentMode === "global"
              ? "glass-card border-primary/30 glow-primary"
              : "glass-card border-0 hover:bg-muted/30"
          }`}
          onClick={() => onSelectMode("global")}
        >
          {currentMode === "global" && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          )}
          <CardContent className="p-5 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  currentMode === "global" ? "bg-primary/15" : "bg-muted/50"
                }`}>
                  <Globe className={`w-6 h-6 ${currentMode === "global" ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">全局加速</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    手机所有流量通过服务器中转，所有应用均受加速保护
                  </p>
                </div>
              </div>
              {currentMode === "global" && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["全应用覆盖", "隐私保护", "一键开启"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* App mode */}
        <Card
          className={`cursor-pointer transition-all duration-300 overflow-hidden ${
            currentMode === "app"
              ? "glass-card border-accent/30 glow-primary"
              : "glass-card border-0 hover:bg-muted/30"
          }`}
          onClick={() => onSelectMode("app")}
        >
          {currentMode === "app" && (
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          )}
          <CardContent className="p-5 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  currentMode === "app" ? "bg-accent/15" : "bg-muted/50"
                }`}>
                  <Smartphone className={`w-6 h-6 ${currentMode === "app" ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">应用加速</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    仅加速选中的应用，其他应用流量不受影响，更省流量
                  </p>
                </div>
              </div>
              {currentMode === "app" && (
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["按需加速", "节省流量", "灵活选择"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs bg-accent/10 text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* App select button + selected list */}
            {currentMode === "app" && (
              <div className="mt-4 space-y-3">
                {selectedApps.length > 0 && (
                  <div>
                    <p className="text-[10px] text-muted-foreground/60 mb-2">已选择加速的应用</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedApps.map((id) => {
                        const app = APP_ICONS[id]
                        if (!app) return null
                        return (
                          <div key={id} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${app.color}`}>
                            <span className="text-sm">{app.icon}</span>
                            <span className="text-xs text-foreground/80">{app.name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenAppSelect()
                  }}
                  className="w-full py-2.5 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {selectedApps.length > 0 ? `管理加速应用（${selectedApps.length}）` : "选择需要加速的应用"}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info notice */}
        <div className="flex items-start gap-2 px-1 pt-2">
          <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            应用模式需要获取手机内安装应用列表权限，仅用于本地筛选加速应用，不会上传任何数据。
          </p>
        </div>
      </div>
    </div>
  )
}
