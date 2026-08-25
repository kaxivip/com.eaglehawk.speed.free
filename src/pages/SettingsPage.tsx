import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  ChevronLeft,
  Shield,
  FileText,
  UserX,
  LogOut,
  Bell,
  HardDrive,
  CheckCircle2,
  X,
} from "lucide-react"

interface SettingsPageProps {
  isLoggedIn: boolean
  onBack: () => void
  onShowAgreement: (type: "privacy" | "service") => void
  onAccountDelete: () => void
  onLogout: () => void
}

export function SettingsPage({
  isLoggedIn,
  onBack,
  onShowAgreement,
  onAccountDelete,
  onLogout,
}: SettingsPageProps) {
  const [notifyEnabled, setNotifyEnabled] = useState(true)
  const [showClearCache, setShowClearCache] = useState(false)
  const [cacheCleared, setCacheCleared] = useState(false)

  const handleClearCache = () => {
    setCacheCleared(true)
    setShowClearCache(false)
    setTimeout(() => setCacheCleared(false), 2000)
  }

  const menuSections = [
    {
      title: "通知与存储",
      items: [
        {
          id: "notify",
          icon: Bell,
          label: "消息通知",
          color: "text-status-warning",
          bg: "bg-status-warning/10",
          type: "toggle" as const,
        },
        {
          id: "cache",
          icon: HardDrive,
          label: "清除缓存",
          color: "text-ocean-surface",
          bg: "bg-ocean-surface/10",
          type: "action" as const,
          action: () => setShowClearCache(true),
        },
      ],
    },
    {
      title: "法律与协议",
      items: [
        {
          id: "privacy",
          icon: Shield,
          label: "隐私协议",
          color: "text-status-connected",
          bg: "bg-status-connected/10",
          type: "action" as const,
          action: () => onShowAgreement("privacy"),
        },
        {
          id: "service",
          icon: FileText,
          label: "服务协议",
          color: "text-ocean-surface",
          bg: "bg-ocean-surface/10",
          type: "action" as const,
          action: () => onShowAgreement("service"),
        },
      ],
    },

    {
      title: "账号",
      items: isLoggedIn
        ? [
            {
              id: "delete",
              icon: UserX,
              label: "注销账号",
              color: "text-destructive",
              bg: "bg-destructive/10",
              type: "action" as const,
              action: onAccountDelete,
            },
            {
              id: "logout",
              icon: LogOut,
              label: "退出登录",
              color: "text-muted-foreground",
              bg: "bg-muted",
              type: "action" as const,
              action: onLogout,
            },
          ]
        : [],
    },
  ]

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />

      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-foreground">设置</h2>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-5 pb-8">
        {menuSections.map((section) => {
          if (section.items.length === 0) return null
          return (
            <div key={section.title} className="mb-4">
              <p className="text-xs text-muted-foreground/70 font-medium mb-2 px-1">
                {section.title}
              </p>
              <Card className="glass-card border-0 overflow-hidden">
                <CardContent className="p-0">
                  {section.items.map((item, index) => {
                    const Icon = item.icon
                    const isDestructive = item.id === "delete"
                    const isLast = index === section.items.length - 1

                    return (
                      <div key={item.id}>
                        <button
                          onClick={item.type === "toggle" ? undefined : item.action}
                          className="w-full flex items-center gap-3.5 px-4 py-4 hover:bg-muted/20 transition-colors"
                        >
                          <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <span className={`flex-1 text-left text-sm ${isDestructive ? "text-destructive" : "text-foreground"}`}>
                            {item.label}
                          </span>

                          {/* Toggle switch for notification */}
                          {item.type === "toggle" && item.id === "notify" && (
                            <div
                              onClick={(e) => { e.stopPropagation(); setNotifyEnabled(!notifyEnabled) }}
                              className={`w-11 h-6 rounded-full transition-colors duration-200 relative cursor-pointer ${
                                notifyEnabled ? "bg-primary" : "bg-muted"
                              }`}
                            >
                              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                                notifyEnabled ? "translate-x-[22px]" : "translate-x-0.5"
                              }`} />
                            </div>
                          )}

                          {/* Cache cleared indicator */}
                          {item.id === "cache" && cacheCleared && (
                            <span className="text-xs text-status-connected flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              已清除
                            </span>
                          )}

                          {/* Arrow for action items */}
                          {item.type === "action" && item.id !== "cache" && (
                            <ChevronRight className={`w-4 h-4 ${isDestructive ? "text-destructive/50" : "text-muted-foreground"}`} />
                          )}
                          {item.id === "cache" && !cacheCleared && (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                        {!isLast && (
                          <div className="ml-[62px] mr-4 border-b border-white/8" />
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          )
        })}

        {/* ICP 备案号 */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-muted-foreground/40">沪ICP备2021006153号</p>
          <p className="text-[10px] text-muted-foreground/30 mt-1">v1.0.0/100-HUAWEI</p>
        </div>

      </div>

      {/* Clear cache confirmation dialog */}
      {showClearCache && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[hsl(220,25%,12%)] rounded-2xl p-6 w-[280px] relative border border-white/10 animate-fade-in">
            <button
              onClick={() => setShowClearCache(false)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-ocean-surface/15 flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-ocean-surface" />
              </div>
            </div>
            <h3 className="text-base font-bold text-foreground text-center mb-2">清除缓存</h3>
            <p className="text-sm text-muted-foreground text-center mb-5 leading-relaxed">
              确定要清除应用缓存数据吗？清除后不会影响账号信息。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearCache(false)}
                className="flex-1 py-3 rounded-xl border border-border/50 text-sm font-medium text-foreground hover:bg-muted/20 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleClearCache}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all"
              >
                确认清除
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
