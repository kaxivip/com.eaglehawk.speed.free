import { ChevronLeft, Mail, Megaphone, Users, Globe, Handshake } from "lucide-react"

interface BusinessCoopPageProps {
  onBack: () => void
}

const coopTypes = [
  {
    icon: Megaphone,
    color: "text-[#ff6b35]",
    bg: "bg-[#ff6b35]/10",
    title: "广告投放",
    desc: "开屏、激励视频、信息流等多种形式，精准触达海外互联网活跃用户群体。",
  },
  {
    icon: Globe,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "出海推广",
    desc: "雄鹰用户高度活跃于海外平台，是出海 App、跨境电商、海外游戏的优质推广渠道。",
  },
  {
    icon: Users,
    color: "text-[#34c759]",
    bg: "bg-[#34c759]/10",
    title: "资源置换",
    desc: "与工具类、内容类 App 互换资源，双向触达，共同扩大用户规模。",
  },
  {
    icon: Handshake,
    color: "text-[#af52de]",
    bg: "bg-[#af52de]/10",
    title: "品牌合作",
    desc: "应用内功能模块冠名、品牌植入等深度合作形式，长期曝光，建立品牌认知。",
  },
]

export function BusinessCoopPage({ onBack }: BusinessCoopPageProps) {
  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />

      {/* Status bar */}
      <div className="h-12 flex-shrink-0" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 px-5 pt-2 pb-4 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-xl font-bold text-foreground">商务合作</h2>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pb-8">

        {/* Intro */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          雄鹰加速器拥有大量活跃的海外互联网用户，如果您希望在此触达这一群体，欢迎与我们联系探讨合作可能。
        </p>

        {/* Coop types */}
        <div className="space-y-3 mb-8">
          {coopTypes.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="glass-card rounded-2xl border-0 p-4 flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact */}
        <div className="glass-card rounded-2xl border-0 p-5">
          <p className="text-sm font-semibold text-foreground mb-1">联系我们</p>
          <p className="text-xs text-muted-foreground mb-4">发送邮件说明您的合作意向，我们会尽快回复。</p>
          <a
            href="mailto:app@unitedcloud.net"
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-primary/10 hover:bg-primary/15 active:scale-[0.98] transition-all"
          >
            <Mail className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground">商务邮箱</p>
              <p className="text-[11px] text-primary/80 mt-0.5">app@unitedcloud.net</p>
            </div>
          </a>
        </div>

      </div>
    </div>
  )
}
