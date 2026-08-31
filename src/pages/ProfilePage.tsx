import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  Settings,
  HelpCircle,
  MessageCircle,
  Handshake,
  User,
  Gift,
  Sparkles,
  RefreshCw,
  Info,
  CheckCircle2,
  X,
} from "lucide-react"
import type { PageKey } from "@/components/BottomNav"

interface ProfilePageProps {
  isLoggedIn: boolean
  points: number
  memberMinutes: number
  onLogin: () => void
  onNavigate: (page: PageKey) => void
  onOpenSettings: () => void
  onOpenShare: () => void
  onOpenHelp: () => void
  onOpenBusinessCoop: () => void
  onOpenAbout: () => void
}

export function ProfilePage({ isLoggedIn, onLogin, onOpenSettings, onOpenShare, onOpenHelp, onOpenBusinessCoop, onOpenAbout }: ProfilePageProps) {
  const [checkingVersion, setCheckingVersion] = useState(false)
  const [versionResult, setVersionResult] = useState<"latest" | "update" | null>(null)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [upgradeProgress, setUpgradeProgress] = useState(0)
  const [upgradeStep, setUpgradeStep] = useState<"download" | "install" | "done">("download")

  const handleCheckVersion = () => {
    if (checkingVersion || showUpgrade) return
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

  const startUpgrade = () => {
    setUpgradeStep("download")
    setUpgradeProgress(0)
    const interval = setInterval(() => {
      setUpgradeProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUpgradeStep("install")
          setTimeout(() => setUpgradeStep("done"), 1500)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 300)
  }

  const otherItems = [
    {
      icon: MessageCircle,
      label: "问题反馈",
      color: "text-secondary-foreground",
      bg: "bg-secondary",
      action: () => {},
    },
    {
      icon: Handshake,
      label: "商务合作",
      color: "text-[#ff6b35]",
      bg: "bg-[#ff6b35]/10",
      badge: "广告主",
      badgeColor: "text-[#ff6b35] bg-[#ff6b35]/10",
      action: onOpenBusinessCoop,
    },
    {
      icon: RefreshCw,
      label: "新版本检测",
      color: "text-primary",
      bg: "bg-primary/10",
      action: handleCheckVersion,
      isVersion: true,
    },
    {
      icon: Info,
      label: "关于雄鹰",
      color: "text-accent",
      bg: "bg-accent/10",
      action: onOpenAbout,
    },
    {
      icon: Settings,
      label: "设置",
      color: "text-muted-foreground",
      bg: "bg-muted",
      action: onOpenSettings,
    },
  ]

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />

      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2">
        <h2 className="text-xl font-bold text-foreground">我的</h2>
      </div>

      <div className="relative z-10 flex-1 overflow-auto px-5 pt-4 pb-28 space-y-4">

        {/* User card */}
        <Card className="overflow-hidden border-0 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-ocean-mid to-accent/5" />
          <CardContent className="p-4 relative z-10">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden">
                  <img src="./images/logo-app.png" alt="logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">186****8888</p>
                  <p className="text-xs text-primary/70 mt-0.5 font-mono">UID: 10086428</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 cursor-pointer" onClick={onLogin}>
                <div className="w-12 h-12 rounded-2xl bg-muted/30 flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-foreground">未登录</p>
                  <p className="text-xs text-muted-foreground mt-0.5">登录后享更多权益</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── 重点卡片：分享好友 + 帮助中心（横排，内部横向布局） ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* 分享好友 */}
          <button onClick={onOpenShare} className="relative rounded-2xl overflow-hidden active:scale-[0.97] transition-transform">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-ocean-surface/55 to-accent/65" />
            <div className="absolute inset-0 border border-primary/40 rounded-2xl" />
            <div className="p-3.5 relative z-10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Gift className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-sm font-bold text-white">分享好友</p>
                <p className="text-[10px] text-white/70 mt-0.5">邀请送会员</p>
              </div>
              <Sparkles className="absolute top-2 right-2 w-3 h-3 text-white/30" />
            </div>
          </button>

          {/* 帮助中心 */}
          <button onClick={onOpenHelp} className="relative rounded-2xl overflow-hidden active:scale-[0.97] transition-transform">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/60 via-cyan-500/45 to-emerald-500/55" />
            <div className="absolute inset-0 border border-teal-400/35 rounded-2xl" />
            <div className="p-3.5 relative z-10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-sm font-bold text-white">帮助中心</p>
                <p className="text-[10px] text-white/70 mt-0.5">常见问题解答</p>
              </div>
            </div>
          </button>
        </div>

        {/* ── 其余菜单 ── */}
        <Card className="glass-card border-0 overflow-hidden">
          <CardContent className="p-0">
            {otherItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={item.label}>
                  <button
                    onClick={item.action}
                    className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-muted/20 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${item.color} ${'isVersion' in item && item.isVersion && checkingVersion ? "animate-spin" : ""}`} />
                    </div>
                    <span className="flex-1 text-left text-sm text-foreground">{item.label}</span>
                    {/* Version check state */}
                    {'isVersion' in item && item.isVersion && checkingVersion && (
                      <span className="text-xs text-primary">检测中...</span>
                    )}
                    {'isVersion' in item && item.isVersion && versionResult === "update" && (
                      <span className="text-xs text-status-warning">有新版本</span>
                    )}
                    {item.badge && !('isVersion' in item) && (
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${'badgeColor' in item && item.badgeColor ? item.badgeColor : 'text-primary bg-primary/10'}`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  {index < otherItems.length - 1 && (
                    <div className="ml-[62px] mr-4 border-b border-white/8" />
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>

      </div>

      {/* ── Upgrade dialog ── */}
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
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${Math.min(100, upgradeProgress)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-5 mb-5" />
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowUpgrade(false)}
                    className="flex-1 py-3 rounded-xl border border-border/50 text-sm font-medium text-foreground hover:bg-muted/20 transition-colors"
                  >
                    稍后
                  </button>
                  <button
                    onClick={startUpgrade}
                    disabled={upgradeProgress > 0}
                    className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60"
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
                <p className="text-sm text-muted-foreground text-center">正在安装新版本，请稍候...</p>
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
                  className="w-full py-3 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all"
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
