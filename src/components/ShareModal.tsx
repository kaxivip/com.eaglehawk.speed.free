import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { X, Copy, Check, Users, Crown, Sparkles, ArrowRight } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = "https://ffish.cc/i/8k2m9x"
  const shareText = `我在用雄鹰加速器，永久免费！一键畅游全球，现在注册还有新人礼包🎁 ${shareUrl}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ocean-deep/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end">
        <div className="bg-ocean-gradient rounded-t-3xl border-t border-primary/20 max-h-[85%] overflow-auto">
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero section */}
          <div className="px-6 pt-2 pb-4">
            {/* Crown badge */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-status-warning/20 to-primary/20 flex items-center justify-center glow-primary">
                  <Crown className="w-10 h-10 text-status-warning" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-status-connected flex items-center justify-center animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-foreground text-center">
              邀请好友，时长翻倍
            </h2>
            <p className="text-sm text-muted-foreground text-center mt-1.5 leading-relaxed">
              好友做任务赚时长，你同步获得等量奖励
            </p>
          </div>

          {/* Rules cards */}
          <div className="px-6 pb-4 space-y-3">
            {/* Highlight rule card */}
            <Card className="overflow-hidden border-0 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-status-warning/8 via-primary/5 to-accent/8" />
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-md bg-status-warning/15 flex items-center justify-center">
                    <span className="text-xs font-bold text-status-warning">1:1</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">奖励1:1同步赠送</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  好友注册后 <span className="text-primary font-medium">30天内</span> 获取的所有加速权益，将
                  <span className="text-status-warning font-semibold"> 等额同步赠送</span> 给你！好友赚1小时，你得1小时，上不封顶！
                </p>
              </CardContent>
            </Card>

            {/* Steps */}
            <div className="space-y-2.5">
              {[
                {
                  step: 1,
                  title: "分享邀请链接给好友",
                  desc: "复制下方链接，发给微信/QQ好友",
                  icon: Users,
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
                {
                  step: 2,
                  title: "好友注册并下载客户端",
                  desc: "好友通过你的链接注册，自动建立关联",
                  icon: ArrowRight,
                  color: "text-accent",
                  bg: "bg-accent/10",
                },
                {
                  step: 3,
                  title: "好友赚时长，你同步得",
                  desc: "30天内好友获得的权益，1:1同步到你的账户",
                  icon: Crown,
                  color: "text-status-warning",
                  bg: "bg-status-warning/10",
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.step} className="flex items-start gap-3 px-1">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                        {item.step}
                      </span>
                      <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center`}>
                        <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Earning example */}
            <Card className="glass-card border-0">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-2">举个例子</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">好友看广告赚30分钟</span>
                    <span className="text-primary font-medium">你得 +30分钟</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">好友签到10分钟</span>
                    <span className="text-primary font-medium">你得 +10分钟</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">邀请3个好友，月均收益</span>
                    <span className="text-status-warning font-bold">+10小时+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Share link section */}
          <div className="px-6 pb-8 pt-2">
            {/* Link display */}
            <div className="glass-card rounded-xl p-4 mb-3">
              <p className="text-xs text-muted-foreground mb-2">你的专属邀请链接</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-ocean-deep/50 rounded-lg px-3 py-2.5 text-sm text-primary font-mono truncate">
                  {shareUrl}
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    copied
                      ? "bg-status-connected/15 text-status-connected"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              {/* Share text preview */}
              <p className="text-xs text-muted-foreground/60 mt-2 leading-relaxed line-clamp-2">
                {shareText}
              </p>
            </div>

            {/* Copy full text button */}
            <button
              onClick={handleCopy}
              className={`w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.98] ${
                copied
                  ? "bg-status-connected/15 text-status-connected border border-status-connected/20"
                  : "bg-gradient-to-r from-status-warning via-primary to-accent text-primary-foreground hover:opacity-90"
              }`}
            >
              {copied ? "已复制到剪贴板" : "复制邀请文案，分享给好友"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
