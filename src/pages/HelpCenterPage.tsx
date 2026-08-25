import { useState } from "react"
import { ChevronLeft, ChevronDown, ChevronUp, Zap, Crown } from "lucide-react"

interface HelpCenterPageProps {
  onBack: () => void
}

interface FaqItem {
  q: string
  a: string
}

const FAQ_SPEED: FaqItem[] = [
  {
    q: "雄鹰加速器支持哪些平台？",
    a: "目前支持 Android、iOS、Windows、macOS 客户端，网页端可通过 PWA 添加到主屏幕使用。",
  },
  {
    q: "连接后速度慢或延迟高怎么办？",
    a: "建议尝试切换线路：点击主页「线路」卡片，选择延迟更低的节点。推荐使用「智能优选」模式，系统会自动匹配最优节点。",
  },
  {
    q: "如何切换加速模式？",
    a: "在主页点击「加速模式」卡片，可切换「全局模式」和「应用模式」。全局模式加速所有流量；应用模式仅加速您选择的指定应用。",
  },
  {
    q: "加速连接后断开了怎么办？",
    a: "网络切换（如 Wi-Fi 切换至移动数据）会导致连接中断，重新点击「立即提速」即可重新连接。如频繁断线，请切换至其他线路重试。",
  },
  {
    q: "支持哪些加速线路？",
    a: "目前提供「智能优选」「香港」「日本」「美国」「新加坡」等多条线路。智能优选会自动选择延迟最低的节点，推荐优先使用。",
  },
  {
    q: "加速期间流量是否有限制？",
    a: "雄鹰加速器不限制加速流量，您可以放心使用。会员时长用完后加速功能将暂停，通过免费会员页积分兑换可继续使用。",
  },
  {
    q: "为什么有些应用加速效果不明显？",
    a: "部分应用本身有访问限制或服务器在国内，加速效果有限。雄鹰主要针对访问海外服务进行加速，如 YouTube、Telegram、ChatGPT 等。",
  },
  {
    q: "如何选择加速应用（应用模式下）？",
    a: "切换至「应用模式」后，点击「选择应用」，勾选需要加速的应用即可。未勾选的应用将走正常网络，不消耗加速时长。",
  },
]

const FAQ_POINTS: FaqItem[] = [
  {
    q: "积分有什么用？",
    a: "积分可在「免费会员」页兑换加速时长，100积分兑换1小时加速。积分越多，可免费使用加速的时间越长。",
  },
  {
    q: "如何获得积分？",
    a: "目前可通过以下方式获得积分：①每日观看激励广告（每次50积分，每天最多8次）；②邀请好友注册（双方各得100积分）；③完成任务中心指定任务。",
  },
  {
    q: "每天最多可以看几次广告？",
    a: "每位用户每天最多可观看 8 次激励广告，每次获得 50 积分，每日最高可得 400 积分。次日零点后重置，可再次观看。",
  },
  {
    q: "邀请好友怎么获得奖励？",
    a: "分享您的专属邀请码给好友，好友下载雄鹰并注册登录后，在「免费会员 → 领取邀请奖励」中输入您的邀请码，双方各获得 100 积分。",
  },
  {
    q: "邀请奖励只能领取一次吗？",
    a: "作为被邀请人，每个账号只能领取一次邀请奖励（100积分）。但作为邀请人，每成功邀请一位新用户，就可以获得一次奖励，不限次数。",
  },
  {
    q: "积分可以转让或提现吗？",
    a: "积分仅限本账号内使用，不可转让给他人，也不支持提现。积分只能用于兑换雄鹰加速时长。",
  },
  {
    q: "积分会过期吗？",
    a: "目前积分不设有效期，长期有效。如后续政策调整，将提前通知用户。",
  },
  {
    q: "会员时长和积分如何共存消耗？",
    a: "加速时优先消耗付费会员时长，付费时长用完后自动切换消耗积分兑换的时长。积分兑换时长与付费时长可叠加。",
  },
  {
    q: "积分兑换的会员时长如何查看？",
    a: "在「免费会员」页可查看当前积分余额和加速时长，在「积分明细」中可查看所有积分收支记录。",
  },
]

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className="rounded-xl overflow-hidden border border-border/30"
          >
            <button
              className="w-full flex items-start justify-between gap-3 px-4 py-3.5 text-left bg-foreground/3 hover:bg-foreground/5 transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="text-sm font-medium text-foreground leading-snug flex-1">
                {item.q}
              </span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              )}
            </button>
            {isOpen && (
              <div className="px-4 py-3 bg-foreground/[0.02] border-t border-border/20">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function HelpCenterPage({ onBack }: HelpCenterPageProps) {
  const [activeTab, setActiveTab] = useState<"speed" | "points">("speed")

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
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
        <h2 className="text-lg font-bold text-foreground">帮助中心</h2>
      </div>

      {/* Tab bar */}
      <div className="relative z-10 px-5 pt-4 pb-2">
        <div className="flex gap-2 p-1 rounded-xl bg-foreground/5 border border-border/20">
          <button
            onClick={() => setActiveTab("speed")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "speed"
                ? "bg-primary text-primary-foreground shadow-[0_2px_12px_hsl(190_100%_50%/0.3)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            加速问题
          </button>
          <button
            onClick={() => setActiveTab("points")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "points"
                ? "bg-primary text-primary-foreground shadow-[0_2px_12px_hsl(190_100%_50%/0.3)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            积分会员
          </button>
        </div>
      </div>

      {/* FAQ list */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-2 pb-8">
        {activeTab === "speed" ? (
          <FaqAccordion items={FAQ_SPEED} />
        ) : (
          <FaqAccordion items={FAQ_POINTS} />
        )}

        {/* Footer tip */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground/60">
            没找到答案？联系客服
          </p>
          <p className="text-xs text-primary mt-1">support@eaglehawk.info</p>
        </div>
      </div>
    </div>
  )
}
