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
  RefreshCw,
  Info,
  MonitorSmartphone,
  CheckCircle2,
  X,
} from "lucide-react"

interface SettingsPageProps {
  isLoggedIn: boolean
  onBack: () => void
  onShowAgreement: (type: "privacy" | "service") => void
  onAccountDelete: () => void
  onLogout: () => void
  onOpenOtherPlatforms: () => void
  onOpenAbout: () => void
}

export function SettingsPage({
  isLoggedIn,
  onBack,
  onShowAgreement,
  onAccountDelete,
  onLogout,
  onOpenOtherPlatforms,
  onOpenAbout,
}: SettingsPageProps) {
  const [notifyEnabled, setNotifyEnabled] = useState(true)
  const [showClearCache, setShowClearCache] = useState(false)
  const [cacheCleared, setCacheCleared] = useState(false)
  const [checkingVersion, setCheckingVersion] = useState(false)
  const [versionResult, setVersionResult] = useState<"latest" | "update" | null>(null)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [upgradeProgress, setUpgradeProgress] = useState(0)
  const [upgradeStep, setUpgradeStep] = useState<"download" | "install" | "done">("download")

  const handleClearCache = () => {
    setCacheCleared(true)
    setShowClearCache(false)
    setTimeout(() => setCacheCleared(false), 2000)
  }

  const handleCheckVersion = () => {
    if (checkingVersion || showUpgrade) return
    // If update available, show upgrade flow on second click
    if (versionResult === "update") {
      setShowUpgrade(true)
      setUpgradeProgress(0)
      setUpgradeStep("download")
      return
    }
    setCheckingVersion(true)
    setVersionResult(null)
    setTimeout(() => {
      setCheckingVersion(false)
      setVersionResult("update")
    }, 1500)
  }

  // Simulate upgrade progress
  const startUpgrade = () => {
    setUpgradeStep("download")
    setUpgradeProgress(0)
    const interval = setInterval(() => {
      setUpgradeProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUpgradeStep("install")
          setTimeout(() => {
            setUpgradeStep("done")
          }, 1500)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 300)
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
                            <Icon className={`w-4 h-4 ${item.color} ${item.id === "version" && checkingVersion ? "animate-spin" : ""}`} />
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

                          {/* Version check result */}
                          {item.id === "version" && checkingVersion && (
                            <span className="text-xs text-primary">检测中...</span>
                          )}
                          {item.id === "version" && versionResult === "update" && (
                            <span className="text-xs text-status-warning flex items-center gap-1">
                              有新版本
                            </span>
                          )}

                          {/* Arrow for action items */}
                          {item.type === "action" && item.id !== "cache" && item.id !== "version" && (
                            <ChevronRight className={`w-4 h-4 ${isDestructive ? "text-destructive/50" : "text-muted-foreground"}`} />
                          )}
                          {item.id === "cache" && !cacheCleared && (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                          {item.id === "version" && !checkingVersion && !versionResult && (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                          {item.id === "version" && versionResult === "update" && (
                            <ChevronRight className="w-4 h-4 text-status-warning" />
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

      {/* Upgrade dialog */}
      {showUpgrade && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[hsl(220,25%,12%)] rounded-2xl p-6 w-[300px] relative border border-white/10 animate-fade-in">
            {upgradeStep === "done" ? null : (
              <button
                onClick={() => { setShowUpgrade(false); setVersionResult(null); }}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            )}

            {upgradeStep === "download" && (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
                    <RefreshCw className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-foreground text-center mb-1">发现新版本</h3>
                <p className="text-sm text-primary text-center font-medium mb-1">v1.0.0 → v1.1.0</p>
                <p className="text-xs text-muted-foreground text-center mb-5 leading-relaxed">
                  优化加速线路，提升连接稳定性，新增更多节点。
                </p>
                {upgradeProgress > 0 ? (
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted-foreground">下载中...</span>
                      <span className="text-xs text-primary font-medium">{Math.min(100, Math.round(upgradeProgress))}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                        style={{ width: `${Math.min(100, upgradeProgress)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-5 mb-5" />
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => { setShowUpgrade(false); }}
                    className="flex-1 py-3 rounded-xl border border-border/50 text-sm font-medium text-foreground hover:bg-muted/20 transition-colors"
                  >
                    稍后
                  </button>
                  <button
                    onClick={startUpgrade}
                    disabled={upgradeProgress > 0}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60"
                  >
                    {upgradeProgress > 0 ? "下载中..." : "立即升级"}
                  </button>
                </div>
              </>
            )}

            {upgradeStep === "install" && (
              <div className="py-4">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-status-warning/15 flex items-center justify-center">
                    <RefreshCw className="w-7 h-7 text-status-warning animate-spin" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-foreground text-center mb-2">正在安装</h3>
                <p className="text-sm text-muted-foreground text-center">
                  正在安装新版本，请稍候...
                </p>
              </div>
            )}

            {upgradeStep === "done" && (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-status-connected/15 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-status-connected" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-foreground text-center mb-2">升级完成</h3>
                <p className="text-sm text-muted-foreground text-center mb-5">
                  已成功升级到 v1.1.0，请重启应用以完成更新。
                </p>
                <button
                  onClick={() => { setShowUpgrade(false); setVersionResult(null); }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  好的
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
