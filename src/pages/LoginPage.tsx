import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Shield, Smartphone } from "lucide-react"

interface LoginPageProps {
  onLogin: (inviteCode?: string) => void
  onBack: () => void
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [loginType, setLoginType] = useState<"quick" | "sms">("quick")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [showAgreement, setShowAgreement] = useState<"privacy" | "service" | null>(null)
  const [inviteCode, setInviteCode] = useState("")
  const [showInviteInput, setShowInviteInput] = useState(false)

  const handleSendCode = () => {
    if (countdown > 0 || phone.length < 11) return
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const canLogin = agreed && (
    loginType === "quick" || (loginType === "sms" && phone.length === 11 && code.length === 6)
  )

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-primary/5 blur-[100px]" />

      {/* Header */}
      <div className="relative z-10 pt-14 px-6">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-6 pt-6 flex flex-col animate-fade-in">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden glow-primary mb-4">
            <img src="./images/fy-logo001.png" alt="雄鹰加速器" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-bold text-foreground">欢迎登录</h2>
        </div>

        {/* Login type tabs */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-xl mb-6">
          <button
            onClick={() => setLoginType("quick")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              loginType === "quick"
                ? "bg-ocean-surface text-primary-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            一键登录
          </button>
          <button
            onClick={() => setLoginType("sms")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              loginType === "sms"
                ? "bg-ocean-surface text-primary-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            短信登录
          </button>
        </div>

        {/* Quick login */}
        {loginType === "quick" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="glass-card rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground font-medium">本机号码一键登录</p>
                <p className="text-xs text-muted-foreground mt-0.5">186****8888</p>
              </div>
              <Shield className="w-4 h-4 text-status-connected" />
            </div>
          </div>
        )}

        {/* SMS login */}
        {loginType === "sms" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="glass-card rounded-xl px-4 py-3.5 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">+86</span>
              <div className="w-px h-5 bg-border" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                placeholder="请输入手机号"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                maxLength={11}
              />
            </div>
            <div className="glass-card rounded-xl px-4 py-3.5 flex items-center gap-3">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="请输入验证码"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                maxLength={6}
              />
              <button
                onClick={handleSendCode}
                disabled={countdown > 0 || phone.length < 11}
                className="text-sm text-primary whitespace-nowrap disabled:text-muted-foreground disabled:opacity-50"
              >
                {countdown > 0 ? `${countdown}s` : "获取验证码"}
              </button>
            </div>
          </div>
        )}

        {/* Invitation code */}
        <div className="mt-5 animate-fade-in">
          {!showInviteInput ? (
            <button
              onClick={() => setShowInviteInput(true)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-primary transition-colors"
            >
              <span className="text-status-warning">🎁</span>
              <span>有邀请码？首次注册送10倍积分</span>
              <ChevronLeft className="w-3 h-3 rotate-[-90deg]" />
            </button>
          ) : (
            <div className="space-y-2">
              <div className="glass-card rounded-xl px-4 py-3.5 flex items-center gap-3">
                <span className="text-status-warning text-sm">🎁</span>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.trim())}
                  placeholder="请输入邀请码（首次注册送10倍积分）"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                  maxLength={20}
                />
                {inviteCode && (
                  <button
                    onClick={() => setInviteCode("")}
                    className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground/50 px-1">
                首次登录注册，输入邀请码即送10倍积分
              </p>
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Agreement */}
        <div className="flex items-start gap-2 mb-4">
          <button
            onClick={() => setAgreed(!agreed)}
            className={`w-4 h-4 mt-0.5 rounded-[4px] border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
              agreed
                ? "bg-primary border-primary"
                : "border-muted-foreground/40"
            }`}
          >
            {agreed && (
              <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <p className="text-xs text-muted-foreground leading-relaxed">
            我已阅读并同意
            <button onClick={() => setShowAgreement("privacy")} className="text-primary hover:underline">《隐私协议》</button>
            和
            <button onClick={() => setShowAgreement("service")} className="text-primary hover:underline">《服务协议》</button>
          </p>
        </div>

        {/* Login button */}
        <Button
          onClick={() => onLogin(inviteCode.trim() || undefined)}
          disabled={!canLogin}
          variant="ocean"
          size="lg"
          className="w-full rounded-xl mb-5"
        >
          {loginType === "quick" ? "本机号码一键登录" : "登录"}
        </Button>

      </div>

        {/* Agreement modal */}
      {showAgreement && (
        <div className="absolute inset-0 z-50 bg-background/95 flex flex-col animate-fade-in">
          <div className="pt-14 px-6">
            <button onClick={() => setShowAgreement(null)} className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="px-6 pt-4 flex-1 overflow-auto">
            <h3 className="text-lg font-bold mb-4">
              {showAgreement === "privacy" ? "隐私协议" : "服务协议"}
            </h3>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                更新日期：2026年1月1日
              </p>
              <p>
                雄鹰加速器（以下简称"本应用"）非常重视用户隐私保护。本协议适用于本应用提供的所有服务。
              </p>
              <p className="font-medium text-foreground">一、信息收集</p>
              <p>
                1. 我们会收集您的手机号码用于账号注册和登录验证。</p>
              <p>
                2. 应用模式下，我们需要获取您手机内安装应用列表的权限，以便您选择需要加速的应用。该信息仅在本地使用，不会上传至服务器。</p>
              <p>
                3. 全局加速模式下，所有网络流量将通过加密通道中转，我们不会记录或存储您的浏览内容。</p>
              <p className="font-medium text-foreground">二、信息使用</p>
              <p>
                收集的信息仅用于：提供加速服务、改善用户体验、发送服务通知。我们不会将您的个人信息出售或分享给第三方。</p>
              <p className="font-medium text-foreground">三、信息安全</p>
              <p>
                我们采用行业标准的加密技术保护您的数据安全。所有传输数据均经过AES-256加密。</p>
              <p className="font-medium text-foreground">四、用户权利</p>
              <p>
                您有权随时查看、修改或删除您的个人信息。如需注销账号，请联系客服处理。</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
