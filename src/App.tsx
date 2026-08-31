import { useState, useCallback, useEffect, useRef } from "react"
import { PhoneFrame } from "@/components/PhoneFrame"
import { BottomNav, type PageKey } from "@/components/BottomNav"
import { SplashPage } from "@/pages/SplashPage"
import { AdPage } from "@/pages/AdPage"
import { LoginPage } from "@/pages/LoginPage"
import { HomePage } from "@/pages/HomePage"
import { ModeSelectPage } from "@/pages/ModeSelectPage"
import { LineSelectPage, type LineId } from "@/pages/LineSelectPage"
import { AppSelectPage } from "@/pages/AppSelectPage"
import { TaskCenterPage } from "@/pages/TaskCenterPage"
import { ProfilePage } from "@/pages/ProfilePage"
import { AgreementPage } from "@/pages/AgreementPage"
import { SettingsPage } from "@/pages/SettingsPage"
import { AccountDeletePage } from "@/pages/AccountDeletePage"
import { SharePage } from "@/pages/SharePage"
import { ShareDetailPage } from "@/pages/ShareDetailPage"
import { OtherBenefitsPage } from "@/pages/OtherBenefitsPage"
import { TaskSubmitPage } from "@/pages/TaskSubmitPage"
import { PointsExchangePage } from "@/pages/PointsExchangePage"
import { PointsHistoryPage, type PointsRecord } from "@/pages/PointsHistoryPage"
import { OtherPlatformsPage } from "@/pages/OtherPlatformsPage"
import { AboutPage } from "@/pages/AboutPage"
import { HelpCenterPage } from "@/pages/HelpCenterPage"
import { BusinessCoopPage } from "@/pages/BusinessCoopPage"
import { AddToHomeScreenPrompt } from "@/components/AddToHomeScreenPrompt"

type AppStage = "splash" | "ad" | "privacy" | "main" | "app-select" | "agreement" | "settings" | "account-delete" | "mode-select" | "line-select" | "share" | "share-detail" | "other-benefits" | "task-submit" | "points-exchange" | "points-history" | "other-platforms" | "about" | "help-center" | "business-coop"

export default function App() {
  const hasAgreed = false // DEV: always show privacy modal
  const [stage, setStage] = useState<AppStage>("splash")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState<PageKey>("home")
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [currentMode, setCurrentMode] = useState<"global" | "app">("global")
  const [currentLine, setCurrentLine] = useState<LineId>("smart")
  const [selectedApps, setSelectedApps] = useState<string[]>(["youtube", "telegram", "chatgpt"])
  const [memberMinutes, setMemberMinutes] = useState(45) // DEV: 0=非会员, >0=会员
  const [points, setPoints] = useState(120)
  const [agreementType, setAgreementType] = useState<"privacy" | "service">("privacy")
  const [agreementReturnTo, setAgreementReturnTo] = useState<AppStage>("main")
  const [submitTaskId, setSubmitTaskId] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [hasClaimedInviteReward, setHasClaimedInviteReward] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 积分流水记录（mock 50条）
  const [pointsHistory, setPointsHistory] = useState<PointsRecord[]>(() => {
    const types: { title: string; amount: number; type: "earn" | "spend" }[] = [
      { title: "每日签到", amount: 10, type: "earn" },
      { title: "观看激励广告", amount: 30, type: "earn" },
      { title: "邀请好友奖励", amount: 60, type: "earn" },
      { title: "完成任务奖励", amount: 50, type: "earn" },
      { title: "兑换1小时会员", amount: 100, type: "spend" },
      { title: "兑换30分钟会员", amount: 50, type: "spend" },
      { title: "每日签到", amount: 10, type: "earn" },
      { title: "观看激励广告", amount: 30, type: "earn" },
      { title: "分享好友奖励", amount: 60, type: "earn" },
      { title: "兑换2小时会员", amount: 200, type: "spend" },
    ]
    const now = Date.now()
    return Array.from({ length: 50 }, (_, i) => {
      const t = types[i % types.length]
      const d = new Date(now - i * 3600000 * (3 + Math.random() * 5))
      const mm = String(d.getMonth() + 1).padStart(2, "0")
      const dd = String(d.getDate()).padStart(2, "0")
      const hh = String(d.getHours()).padStart(2, "0")
      const mi = String(d.getMinutes()).padStart(2, "0")
      return {
        id: 50 - i,
        type: t.type,
        title: t.title,
        amount: t.amount,
        time: `${mm}/${dd} ${hh}:${mi}`,
      }
    })
  })

  const addPointsRecord = useCallback((title: string, amount: number, type: "earn" | "spend") => {
    const now = new Date()
    const mm = String(now.getMonth() + 1).padStart(2, "0")
    const dd = String(now.getDate()).padStart(2, "0")
    const hh = String(now.getHours()).padStart(2, "0")
    const mi = String(now.getMinutes()).padStart(2, "0")
    setPointsHistory((prev) => [{
      id: Date.now(),
      type,
      title,
      amount,
      time: `${mm}/${dd} ${hh}:${mi}`,
    }, ...prev])
  }, [])

  // Timer: countdown based on memberMinutes
  useEffect(() => {
    if (isConnected) {
      setRemainingSeconds(memberMinutes * 60)
      timerRef.current = setInterval(() => {
        setRemainingSeconds((s) => {
          if (s <= 1) {
            // Time's up - auto disconnect
            if (timerRef.current) clearInterval(timerRef.current)
            setIsConnected(false)
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setRemainingSeconds(0)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isConnected])

  const formatTimer = (secs: number) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0")
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0")
    const s = String(secs % 60).padStart(2, "0")
    return `${h}:${m}:${s}`
  }

  const handleRefreshRemaining = useCallback(() => {
    // Re-sync remaining time from current memberMinutes
    setRemainingSeconds(memberMinutes * 60)
  }, [memberMinutes])

  const handleLogin = useCallback((inviteCode?: string) => {
    setIsLoggedIn(true)
    setShowLoginModal(false)
    if (inviteCode && inviteCode.trim().length >= 4 && !hasClaimedInviteReward) {
      setHasClaimedInviteReward(true)
      setPoints((prev) => prev + 100)
      addPointsRecord("邀请码奖励", 100, "earn")
    }
    setStage("main")
  }, [hasClaimedInviteReward, addPointsRecord])

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false)
    setIsConnected(false)
    setIsConnecting(false)
    setStage("main")
  }, [])

  const handleToggleConnect = useCallback(() => {
    if (isConnecting) return
    if (isConnected) {
      setIsConnected(false)
    } else {
      setIsConnecting(true)
      setTimeout(() => {
        setIsConnecting(false)
        setIsConnected(true)
      }, 2000)
    }
  }, [isConnected, isConnecting])

  const handleToggleApp = useCallback((appId: string) => {
    setSelectedApps((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    )
  }, [])

  const handleEarnPoints = useCallback((pts: number, title?: string) => {
    setPoints((prev) => prev + pts)
    addPointsRecord(title ?? "积分获取", pts, "earn")
  }, [addPointsRecord])

  const handleExchangeMember = useCallback((costPoints: number, minutes: number) => {
    setPoints((prev) => prev - costPoints)
    setMemberMinutes((prev) => prev + minutes)
    addPointsRecord(`兑换${minutes >= 60 ? `${Math.floor(minutes / 60)}小时` : `${minutes}分钟`}会员`, costPoints, "spend")
  }, [addPointsRecord])

  // DEV: toggle member status for preview
  const handleToggleMember = useCallback(() => {
    setMemberMinutes((prev) => (prev > 0 ? 0 : 45))
  }, [])

  const handleShowAgreement = useCallback((type: "privacy" | "service", returnTo: AppStage = "main") => {
    setAgreementType(type)
    setAgreementReturnTo(returnTo)
    setStage("agreement")
  }, [])

  const handleOpenSettings = useCallback(() => {
    setStage("settings")
  }, [])

  const handleOpenShare = useCallback(() => {
    setStage("share")
  }, [])

  const handleOpenModeSelect = useCallback(() => {
    setStage("mode-select")
  }, [])

  const handleOpenLineSelect = useCallback(() => {
    setStage("line-select")
  }, [])

  const handleOpenOtherBenefits = useCallback(() => {
    setStage("other-benefits")
  }, [])

  const handleSubmitTask = useCallback((taskId: number) => {
    setSubmitTaskId(taskId)
    setStage("task-submit")
  }, [])

  const handleOpenPointsExchange = useCallback(() => {
    setStage("points-exchange")
  }, [])

  const handleOpenPointsHistory = useCallback(() => {
    setStage("points-history")
  }, [])

  const handleAccountDelete = useCallback(() => {
    setIsLoggedIn(false)
    setIsConnected(false)
    setIsConnecting(false)
    setStage("main")
  }, [])

  const renderContent = () => {
    switch (stage) {
      case "splash":
        return (
          <SplashPage
            onFinish={() => {
              setStage("ad")
            }}
          />
        )

      case "ad":
        return (
          <AdPage
            onFinish={() => {
              if (hasAgreed) {
                setStage("main")
              } else {
                setStage("privacy")
              }
            }}
          />
        )

      case "privacy":
        return (
          <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
            {/* Top ambient glow - 呼应品牌金色 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[240px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute top-10 right-6 w-20 h-20 rounded-full bg-accent/10 blur-2xl pointer-events-none" />
      
            {/* Header - Logo + Title */}
            <div className="relative z-10 flex flex-col items-center gap-3 pt-[22%] pb-6">
              <div className="w-20 h-20 rounded-[22px] overflow-hidden shadow-[0_8px_30px_hsl(38_92%_55%/0.15)] ring-1 ring-primary/20">
                <img src="./images/logo-app.png" alt="logo" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground tracking-wide">隐私政策与用户协议</h2>
                <p className="text-xs text-muted-foreground mt-1.5">首次使用雄鹰加速器，请阅读并同意以下内容</p>
              </div>
            </div>
      
            {/* Scrollable content area */}
            <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-4">
              <div className="bg-card/70 backdrop-blur-md rounded-2xl border border-border/40 p-5 space-y-3 text-[13px] text-muted-foreground leading-relaxed">
                <p>雄鹰加速器遵守相关法律法规，致力保护用户隐私。我们仅收集提供服务所必需的最少信息。</p>
                <p>
                  <span className="text-foreground font-medium">信息收集：</span>
                  注册登录时收集手机号用于身份验证；加速连接时收集设备型号用于点播最优节点；不收集您的浏览内容和通讯数据。
                </p>
                <p>
                  <span className="text-foreground font-medium">第三方共享：</span>
                  我们不会向第三方出售您的个人信息。仅在法律要求或经您授权时共享必要信息。
                </p>
                <p>
                  <span className="text-foreground font-medium">广告服务：</span>
                  App 内展示的激励广告不会追踪您的个人属性，仅用于奖励发放。
                </p>
                <p className="pt-1.5 border-t border-border/30">
                  继续使用即表示您同意{" "}
                  <span
                    className="text-primary font-medium cursor-pointer"
                    onClick={() => {
                      setStage("agreement");
                      setAgreementType("privacy");
                      setAgreementReturnTo("privacy");
                    }}
                  >
                    《隐私政策》
                  </span>{" "}和{" "}
                  <span
                    className="text-primary font-medium cursor-pointer"
                    onClick={() => {
                      setStage("agreement");
                      setAgreementType("service");
                      setAgreementReturnTo("privacy");
                    }}
                  >
                    《用户协议》
                  </span>
                  。
                </p>
              </div>
            </div>
      
            {/* Bottom fixed actions */}
            <div className="absolute bottom-[150px] left-0 right-0 z-10 px-6 flex flex-col items-center gap-6">
              <button
                onClick={() => {
                  localStorage.setItem("privacy_agreed", "1");
                  setStage("main");
                }}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95 active:scale-[0.98] transition-all"
              >
                同意并继续
              </button>
              <button
                onClick={() => {
                  setStage("splash");
                }}
                className="text-xs text-muted-foreground/60 hover:text-muted-foreground active:scale-[0.98] transition-all"
              >
                不同意
              </button>
            </div>
          </div>
        )

      case "app-select":
        return (
          <AppSelectPage
            selectedApps={selectedApps}
            onToggleApp={handleToggleApp}
            onBack={() => setStage("mode-select")}
          />
        )

      case "agreement":
        return (
          <AgreementPage
            type={agreementType}
            onBack={() => setStage(agreementReturnTo)}
          />
        )

      case "settings":
        return (
          <SettingsPage
            isLoggedIn={isLoggedIn}
            onBack={() => setStage("main")}
            onShowAgreement={(type) => handleShowAgreement(type, "settings")}
            onAccountDelete={() => setStage("account-delete")}
            onLogout={handleLogout}
          />
        )

      case "mode-select":
        return (
          <ModeSelectPage
            currentMode={currentMode}
            selectedApps={selectedApps}
            onSelectMode={setCurrentMode}
            onOpenAppSelect={() => setStage("app-select")}
            onBack={() => setStage("main")}
          />
        )

      case "line-select":
        return (
          <LineSelectPage
            currentLine={currentLine}
            onSelectLine={setCurrentLine}
            onBack={() => setStage("main")}
          />
        )

      case "share":
        return (
          <SharePage
            onBack={() => setStage("main")}
            onOpenShareDetail={() => setStage("share-detail")}
          />
        )

      case "share-detail":
        return (
          <ShareDetailPage
            onBack={() => setStage("share")}
          />
        )

      case "other-benefits":
        return (
          <OtherBenefitsPage
            onBack={() => setStage("main")}
            onSubmitTask={handleSubmitTask}
            onClaimReward={(_taskId: number, reward: number) => handleEarnPoints(reward, "福利任务奖励")}
          />
        )

      case "task-submit":
        return (
          <TaskSubmitPage
            taskId={submitTaskId}
            onBack={() => setStage("other-benefits")}
            onSubmitSuccess={() => setStage("other-benefits")}
          />
        )

      case "points-exchange":
        return (
          <PointsExchangePage
            points={points}
            memberMinutes={memberMinutes}
            onBack={() => setStage("main")}
            onExchange={handleExchangeMember}
          />
        )

      case "points-history":
        return (
          <PointsHistoryPage
            records={pointsHistory}
            currentPoints={points}
            onBack={() => setStage("main")}
          />
        )

      case "account-delete":
        return (
          <AccountDeletePage
            onBack={() => setStage("settings")}
            onConfirmDelete={handleAccountDelete}
          />
        )

      case "other-platforms":
        return (
          <OtherPlatformsPage
            onBack={() => setStage("settings")}
          />
        )

      case "about":
        return (
          <AboutPage
            onBack={() => setStage("settings")}
          />
        )

      case "help-center":
        return (
          <HelpCenterPage
            onBack={() => setStage("settings")}
          />
        )

      case "business-coop":
        return (
          <BusinessCoopPage
            onBack={() => setStage("main")}
          />
        )

      case "main":
        return (
          <div className="w-full h-full relative">
            <div className="w-full h-full">
              {currentPage === "home" && (
                <HomePage
                  isConnected={isConnected}
                  isConnecting={isConnecting}
                  currentMode={currentMode}
                  currentLine={currentLine}
                  selectedApps={selectedApps}
                  remainingSeconds={remainingSeconds}
                  formatTimer={formatTimer}
                  onToggleConnect={handleToggleConnect}
                  onRefreshRemaining={handleRefreshRemaining}
                  onNavigate={setCurrentPage}
                  onOpenModeSelect={handleOpenModeSelect}
                  onOpenLineSelect={handleOpenLineSelect}
                  onOpenShare={handleOpenShare}
                />
              )}
              {currentPage === "tasks" && (
                <TaskCenterPage
                  points={points}
                  memberMinutes={memberMinutes}
                  onToggleMember={handleToggleMember}
                  onEarnPoints={handleEarnPoints}
                  onOpenShare={handleOpenShare}
                  onOpenOtherBenefits={handleOpenOtherBenefits}
                  onOpenPointsExchange={handleOpenPointsExchange}
                  onOpenPointsHistory={handleOpenPointsHistory}
                />
              )}
              {currentPage === "profile" && (
                <ProfilePage
                  isLoggedIn={isLoggedIn}
                  points={points}
                  memberMinutes={memberMinutes}
                  onLogin={() => setShowLoginModal(true)}
                  onNavigate={setCurrentPage}
                  onOpenSettings={handleOpenSettings}
                  onOpenShare={handleOpenShare}
                  onOpenHelp={() => setStage("help-center")}
                  onOpenBusinessCoop={() => setStage("business-coop")}
                  onOpenAbout={() => setStage("about")}
                />
              )}
            </div>

            <BottomNav current={currentPage} onNavigate={setCurrentPage} />
          </div>
        )
    }
  }

  const animateClass = stage === "main" ? "" : "animate-slide-in-right"

  return (
    <PhoneFrame>
      <div key={stage} className={`w-full h-full ${animateClass}`}>
        {renderContent()}
      </div>
      {showLoginModal && (
        <LoginPage onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
      )}
      <AddToHomeScreenPrompt />
    </PhoneFrame>
  )
}
