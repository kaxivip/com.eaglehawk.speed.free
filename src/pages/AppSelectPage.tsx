import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Check, ChevronLeft } from "lucide-react"
import { MOCK_APPS, type AppIconData } from "@/lib/appData"

interface AppSelectPageProps {
  selectedApps: string[]
  onToggleApp: (appId: string) => void
  onBack: () => void
}

const mockApps: AppIconData[] = MOCK_APPS

export function AppSelectPage({ selectedApps, onToggleApp, onBack }: AppSelectPageProps) {
  const [search, setSearch] = useState("")

  const filteredApps = mockApps.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.category.includes(search)
  )

  const categories = [...new Set(filteredApps.map((a) => a.category))]

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-foreground">选择加速应用</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            已选 {selectedApps.length} 个应用
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative z-10 px-5 pt-4">
        <div className="glass-card rounded-xl px-4 py-3 flex items-center gap-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索应用"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
          />
        </div>
      </div>

      {/* Quick select */}
      <div className="relative z-10 px-5 pt-3 flex gap-2">
        <button
          onClick={() => mockApps.forEach((a) => { if (!selectedApps.includes(a.id)) onToggleApp(a.id) })}
          className="px-3 py-1.5 rounded-lg text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          全选
        </button>
        <button
          onClick={() => selectedApps.forEach((id) => onToggleApp(id))}
          className="px-3 py-1.5 rounded-lg text-xs bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
        >
          清空
        </button>
      </div>

      {/* App list */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-4 pb-8 space-y-5">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
              {category}
            </h3>
            <div className="space-y-2">
              {filteredApps
                .filter((a) => a.category === category)
                .map((app) => {
                  const isSelected = selectedApps.includes(app.id)
                  return (
                    <Card
                      key={app.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "glass-card border-primary/20"
                          : "glass-card border-0 hover:bg-muted/30"
                      }`}
                      onClick={() => onToggleApp(app.id)}
                    >
                      <CardContent className="p-3.5 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${app.color} flex items-center justify-center text-base`}>
                          {app.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{app.name}</p>
                          <p className="text-xs text-muted-foreground">{app.category}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-muted-foreground/30"
                        }`}>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom action */}
      <div className="absolute bottom-0 left-0 right-0 p-5 pb-8 glass-card border-t border-border/50">
        <button
          onClick={onBack}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
        >
          确认选择 ({selectedApps.length})
        </button>
      </div>
    </div>
  )
}
