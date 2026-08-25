import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeft,
  Clock,
  CheckCircle2,
  Upload,
  Gift,
  Star,
} from "lucide-react"

type TaskStatus = "pending" | "submitted" | "approved" | "rejected" | "claimed"

interface BenefitTask {
  id: number
  name: string
  description: string
  requirements: string[]
  quantity: number
  completed: number
  expiry: string
  reward: number
  status: TaskStatus
  rewardLabel: string
  rejectReason?: string
  submittedAt?: string
  reviewedAt?: string
  claimedAt?: string
}

interface OtherBenefitsPageProps {
  onBack: () => void
  onSubmitTask: (taskId: number) => void
  onClaimReward?: (taskId: number, reward: number) => void
}

export function OtherBenefitsPage({ onBack, onSubmitTask }: OtherBenefitsPageProps) {
  const [activeTab, setActiveTab] = useState<"todo" | "done">("todo")

  const [tasks] = useState<BenefitTask[]>([
    {
      id: 1,
      name: "vivo应用商店好评",
      description: "在vivo应用商店搜索「雄鹰加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      quantity: 1,
      completed: 0,
      expiry: "7月31日 23:59",
      reward: 1440,
      status: "pending",
      rewardLabel: "1000分",
    },
    {
      id: 2,
      name: "OPPO应用商店好评",
      description: "在OPPO应用商店搜索「雄鹰加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      quantity: 1,
      completed: 0,
      expiry: "7月31日 23:59",
      reward: 1440,
      status: "pending",
      rewardLabel: "1000分",
    },
    {
      id: 3,
      name: "华为应用市场好评",
      description: "在华为应用市场搜索「雄鹰加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      quantity: 1,
      completed: 0,
      expiry: "7月31日 23:59",
      reward: 1440,
      status: "pending",
      rewardLabel: "1000分",
    },
    {
      id: 4,
      name: "小米应用商店好评",
      description: "在小米应用商店搜索「雄鹰加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      quantity: 1,
      completed: 0,
      expiry: "7月31日 23:59",
      reward: 1440,
      status: "pending",
      rewardLabel: "1000分",
    },
    // --- 已完成列表示例数据 ---
    {
      id: 5,
      name: "vivo应用商店好评",
      description: "",
      requirements: [],
      quantity: 1,
      completed: 1,
      expiry: "6月30日 23:59",
      reward: 1440,
      status: "claimed",
      rewardLabel: "1000分",
      submittedAt: "06/28 14:22",
      reviewedAt: "06/29 10:05",
      claimedAt: "06/29 18:30",
    },
    {
      id: 7,
      name: "华为应用市场好评",
      description: "",
      requirements: [],
      quantity: 1,
      completed: 0,
      expiry: "6月28日 23:59",
      reward: 1440,
      status: "rejected",
      rewardLabel: "1000分",
      submittedAt: "06/26 20:10",
      reviewedAt: "06/27 11:30",
      rejectReason: "录屏内容不清晰，无法确认好评操作。请重新录制后提交。",
    },
  ])

  const todoTasks = tasks.filter((t) => t.status === "pending" || t.status === "submitted")
  const doneTasks = tasks.filter((t) => t.status === "approved" || t.status === "claimed" || t.status === "rejected")

  /* const statusConfig: Record<TaskStatus, { label: string; color: string; icon: React.ElementType }> = {
    pending: { label: "待提交", color: "text-muted-foreground", icon: Clock },
    submitted: { label: "审核中", color: "text-primary", icon: AlertCircle },
    approved: { label: "待领取", color: "text-status-warning", icon: HandCoins },
    rejected: { label: "未通过", color: "text-destructive", icon: AlertCircle },
    claimed: { label: "已领取", color: "text-status-connected", icon: CheckCircle2 },
  } */

  const isDone = activeTab === "done"

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-status-warning/5 blur-[80px]" />

      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-foreground">限量福利</h2>
      </div>

      {/* Tabs - centered */}
      <div className="relative z-10 pt-4 flex justify-center gap-2">
        <button
          onClick={() => setActiveTab("todo")}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "todo"
              ? "bg-primary/15 text-primary border border-primary/20"
              : "bg-muted/30 text-muted-foreground border border-transparent"
          }`}
        >
          进行中
          {todoTasks.length > 0 && (
            <span className="ml-0.5 w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">
              {todoTasks.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("done")}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "done"
              ? "bg-primary/15 text-primary border border-primary/20"
              : "bg-muted/30 text-muted-foreground border border-transparent"
          }`}
        >
          已完成
          {doneTasks.length > 0 && (
            <span className="ml-0.5 w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">
              {doneTasks.length}
            </span>
          )}
        </button>
      </div>

      {/* Task list */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-5 pb-10 space-y-5">
        {activeTab === "todo" && todoTasks.length === 0 && (
          <div className="flex flex-col items-center pt-16">
            <CheckCircle2 className="w-12 h-12 text-status-connected/30 mb-4" />
            <p className="text-sm text-muted-foreground">暂无进行中的任务</p>
          </div>
        )}

        {activeTab === "done" && doneTasks.length === 0 && (
          <div className="flex flex-col items-center pt-16">
            <Clock className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-sm text-muted-foreground">暂无已完成的任务</p>
          </div>
        )}

        {(isDone ? doneTasks : todoTasks).map((task) => {
          return (
            <Card key={task.id} className="glass-card border-0 overflow-hidden">
              <CardContent className="p-5">
                {/* Task header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/15">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Star className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">ID:{task.id}-{task.name}</p>
                  </div>
                </div>

                {/* === 进行中 Tab: show full info === */}
                {!isDone && (
                  <>
                    {/* Task description */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3.5">
                      {task.description}
                    </p>

                    {/* Requirements (only for pending) */}
                    {task.status === "pending" && task.requirements.length > 0 && (
                      <div className="mb-3.5 px-3 py-2.5 rounded-lg bg-ocean-deep/20 border border-border/20">
                        <p className="text-[10px] font-medium text-muted-foreground/70 mb-1.5">任务要求：</p>
                        {task.requirements.map((req, i) => (
                          <p key={i} className="text-[11px] text-muted-foreground leading-relaxed mb-1 last:mb-0">&bull; {req}</p>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* === 已完成 Tab: show time info === */}
                {isDone && (
                  <div className="space-y-2 mb-4">
                    {task.submittedAt && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>提审时间：{task.submittedAt}</span>
                      </div>
                    )}
                    {task.reviewedAt && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span>审核时间：{task.reviewedAt}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Rejected reason (both tabs) */}
                {task.status === "rejected" && task.rejectReason && (
                  <div className="mb-3.5 px-3 py-2.5 rounded-lg bg-destructive/5 border border-destructive/15">
                    <p className="text-[11px] text-destructive/80 leading-relaxed">{task.rejectReason}</p>
                  </div>
                )}

                {/* Divider before reward & action */}
                <div className="border-t border-white/15 mb-3" />

                {/* Reward & action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Gift className={`w-4 h-4 ${task.status === "rejected" ? "text-muted-foreground/50" : "text-status-warning"}`} />
                    <span className={`text-sm font-bold ${task.status === "rejected" ? "text-muted-foreground/50" : "text-status-warning"}`}>
                      +{task.rewardLabel}
                    </span>
                  </div>

                  {task.status === "pending" && (
                    <button
                      onClick={() => onSubmitTask(task.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      完成此任务
                    </button>
                  )}

                  {task.status === "submitted" && (
                    <span className="text-xs text-primary/70">客服审核中，请耐心等待</span>
                  )}

                  {task.status === "rejected" && (
                    <button
                      onClick={() => onSubmitTask(task.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      重新提交
                    </button>
                  )}

                  {task.status === "claimed" && (
                    <span className="text-xs text-status-connected font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      已赠送
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* General tips */}
        <div className="mt-3 px-1">
          <p className="text-[10px] text-muted-foreground/50 leading-relaxed text-center">
            提交后客服将在1-3个工作日内审核 &middot; 审核通过后需手动领取积分
          </p>
        </div>
      </div>
    </div>
  )
}