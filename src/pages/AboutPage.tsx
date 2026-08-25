import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeft,
  Zap,
  Globe,
  Shield,
  Users,
  Mail,
} from "lucide-react"

interface AboutPageProps {
  onBack: () => void
}

const features = [
  {
    icon: Zap,
    title: "极速加速",
    desc: "全球节点智能优选，毫秒级延迟",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Globe,
    title: "全球覆盖",
    desc: "覆盖亚太、欧美等主流地区",
    color: "text-status-connected",
    bg: "bg-status-connected/10",
  },
  {
    icon: Shield,
    title: "安全可靠",
    desc: "端到端加密，数据安全保障",
    color: "text-status-warning",
    bg: "bg-status-warning/10",
  },
  {
    icon: Users,
    title: "免费使用",
    desc: "完成任务赚积分，免费享会员",
    color: "text-accent",
    bg: "bg-accent/10",
  },
]

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/5 blur-[80px]" />
      <div className="h-12" />

      <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-foreground">关于雄鹰</h2>
      </div>

      <div className="relative z-10 flex-1 overflow-auto px-5 pt-6 pb-8">
        {/* Logo + branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-18 h-18 rounded-2xl overflow-hidden glow-primary mb-3">
            <img
              src="./images/fy-logo001.png"
              alt="雄鹰加速器"
              className="w-[72px] h-[72px] object-cover"
            />
          </div>
          <h1 className="text-xl font-black text-gradient-cyan mb-1">雄鹰加速器</h1>
          <p className="text-sm text-muted-foreground">让网络快人一步</p>
          <p className="text-xs text-muted-foreground/60 mt-1">版本 v1.0.0</p>
        </div>

        {/* Feature highlights */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground/70 font-medium mb-3 px-1">产品特色</p>
          <div className="space-y-3">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <Card key={f.title} className="glass-card border-0">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${f.color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{f.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground/70 font-medium mb-2 px-1">联系我们</p>
          <Card className="glass-card border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">客服邮箱</p>
                  <p className="text-xs text-primary font-mono">support@eaglehawk.info</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-1 pt-2">
          <p className="text-[10px] text-muted-foreground/50">© 2026 雄鹰加速器 版权所有</p>
          <p className="text-[10px] text-muted-foreground/40">京ICP备2026XXXXXX号-1</p>
        </div>
      </div>
    </div>
  )
}
