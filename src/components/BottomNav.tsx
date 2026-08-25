import { cn } from "@/lib/utils"

export type PageKey = "home" | "tasks" | "profile"

interface BottomNavProps {
  current: PageKey
  onNavigate: (page: PageKey) => void
}

// ── 统一 SVG 图标规范：24×24 viewBox，stroke 线条，圆角端点，无填充 ──

function IconRocket({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* 箭体（加宽：左右各扩1） */}
      <path d="M12 2c-1.5 2.5-4 6-4 10h8c0-4-2.5-7.5-4-10z" />
      {/* 左翼（更宽更实） */}
      <path d="M8 12l-3 4h5" />
      {/* 右翼 */}
      <path d="M16 12l3 4h-5" />
      {/* 喷口横线 */}
      <path d="M9 16h6" />
      {/* 尾焰 */}
      <path d="M10.5 16c0 2-1 3-1 3s1.2-.4 2.5-.4 2.5.4 2.5.4-1-1-1-3" />
      {/* 舷窗（稍大） */}
      <circle cx="12" cy="9" r="1.5" />
    </svg>
  )
}

function IconGift({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* 礼盒主体 */}
      <rect x="4" y="10" width="16" height="10" rx="1.5" />
      {/* 顶盖 */}
      <rect x="3" y="7" width="18" height="3" rx="1" />
      {/* 中间竖线 */}
      <line x1="12" y1="7" x2="12" y2="20" />
      {/* 左蝴蝶结 */}
      <path d="M12 7c0 0-1-4-3.5-3S7 7 12 7" />
      {/* 右蝴蝶结 */}
      <path d="M12 7c0 0 1-4 3.5-3S17 7 12 7" />
    </svg>
  )
}

function IconUser({ className, strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {/* 头 */}
      <circle cx="12" cy="8" r="3.5" />
      {/* 身体弧线 */}
      <path d="M4 20c.5-4 3.5-6.5 8-6.5s7.5 2.5 8 6.5" />
    </svg>
  )
}

const navItems: { key: PageKey; label: string; icon: React.ElementType }[] = [
  { key: "home",    label: "加速",    icon: IconRocket },
  { key: "tasks",   label: "免费会员", icon: IconGift },
  { key: "profile", label: "我的",    icon: IconUser },
]

export function BottomNav({ current, onNavigate }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40">
      <div className="glass-card border-t border-border/50 px-2 pb-6 pt-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = current === item.key
            const Icon = item.icon
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all duration-200",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-all duration-200",
                    isActive && "drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]"
                  )}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <span className={cn(
                  "text-[10px] font-medium",
                  isActive && "text-primary"
                )}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
