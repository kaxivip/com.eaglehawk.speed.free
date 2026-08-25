import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeft,
  Upload,
  X,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
} from "lucide-react"

interface TaskInfo {
  name: string
  description: string
  requirements: string[]
  rewardLabel: string
}

interface TaskSubmitPageProps {
  taskId: number
  taskInfo?: TaskInfo
  onBack: () => void
  onSubmitSuccess: () => void
}

export function TaskSubmitPage({ taskId, taskInfo, onBack, onSubmitSuccess }: TaskSubmitPageProps) {
  const [description, setDescription] = useState("")
  const [attachments, setAttachments] = useState<{ name: string; type: "image" | "video" }[]>([])
  const [submitted, setSubmitted] = useState(false)

  const defaultTaskInfo: Record<number, TaskInfo> = {
    1: {
      name: "vivo应用商店好评",
      description: "在vivo应用商店搜索「雄鹰加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      rewardLabel: "1000分",
    },
    2: {
      name: "OPPO应用商店好评",
      description: "在OPPO应用商店搜索「雄鹰加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      rewardLabel: "1000分",
    },
    3: {
      name: "华为应用市场好评",
      description: "在华为应用市场搜索「雄鹰加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      rewardLabel: "1000分",
    },
    4: {
      name: "小米应用商店好评",
      description: "在小米应用商店搜索「雄鹰加速器」，给予5星好评并撰写文字评价",
      requirements: [
        "好评过程录屏（从打开应用商店到提交评价）",
        "「我的」页面截图（需包含UID或手机号）",
      ],
      rewardLabel: "1000分",
    },
  }

  const task = taskInfo || defaultTaskInfo[taskId] || {
    name: "任务",
    description: "请提交任务完成证据",
    requirements: ["请上传任务完成的截图或录屏"],
    rewardLabel: "积分",
  }

  const handleAddAttachment = () => {
    if (attachments.length >= 5) return
    setAttachments((prev) => [
      ...prev,
      { name: `附件_${prev.length + 1}`, type: "image" as const },
    ])
  }

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-status-connected/5 blur-[80px]" />
        <div className="h-12" />
        <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-bold text-foreground">ID{taskId}-任务提审</h2>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5">
          <div className="w-20 h-20 rounded-full bg-status-connected/10 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-10 h-10 text-status-connected" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">提交成功</h3>
          <p className="text-sm text-muted-foreground text-center mb-2">
            您的审核材料已提交，客服将在1-3个工作日内完成审核
          </p>
          <p className="text-xs text-muted-foreground/70 text-center mb-8">
            审核通过后，请返回手动领取{task.rewardLabel}
          </p>
          <button
            onClick={onSubmitSuccess}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all"
          >
            返回福利列表
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-foreground">ID{taskId}-任务提审</h2>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-5 pb-8">
        {/* Task info card */}
        <Card className="overflow-hidden border-0 relative mb-5">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
          <CardContent className="p-5 relative z-10">
            <p className="text-sm font-semibold text-foreground">{task.name}</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{task.description}</p>
            <div className="mt-3 mb-3 border-t border-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">奖励</span>
              <span className="text-2xl font-extrabold text-status-warning leading-none">{task.rewardLabel}</span>
            </div>
          </CardContent>
        </Card>

        {/* Requirements - task specific */}
        <Card className="glass-card border-0 mb-5">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">任务要求</span>
            </div>
            <div className="space-y-2">
              {task.requirements.map((req, i) => (
                <p key={i} className="text-xs text-muted-foreground leading-relaxed">{i + 1}. {req}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upload attachments */}
        <Card className="glass-card border-0 mb-5">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">上传凭证</span>
              <span className="text-[10px] text-muted-foreground/60">最多5个</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {attachments.map((att, index) => (
                <div key={index} className="relative aspect-square rounded-xl bg-ocean-mid/50 border border-border/30 flex flex-col items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-muted-foreground/40 mb-1" />
                  <p className="text-[10px] text-muted-foreground/50 truncate px-2">{att.name}</p>
                  <button
                    onClick={() => handleRemoveAttachment(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-primary-foreground" />
                  </button>
                </div>
              ))}

              {attachments.length < 5 && (
                <button
                  onClick={() => handleAddAttachment()}
                  className="aspect-square rounded-xl border-2 border-dashed border-border/40 flex flex-col items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <Upload className="w-5 h-5 text-muted-foreground/40 mb-1" />
                  <span className="text-[9px] text-muted-foreground/50">上传凭证</span>
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Text description */}
        <Card className="glass-card border-0 mb-6">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">任务完成补充</span>
              <span className="text-[10px] text-muted-foreground/60">选填</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请描述任务完成情况，如遇到问题请说明..."
              className="w-full h-24 bg-ocean-deep/30 rounded-xl px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 border border-border/30 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
            />
          </CardContent>
        </Card>

        {/* Divider before submit */}
        <div className="border-t border-white/10 mb-5" />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={attachments.length === 0}
          className={`w-full py-3.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${
            attachments.length > 0
              ? "bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {attachments.length > 0 ? "ID" + taskId + "-任务提审" : "上传凭证"}
        </button>

        <p className="text-[10px] text-muted-foreground/50 text-center mt-3">
          提交后客服将在1-3个工作日内审核 &middot; 审核通过后需手动领取积分
        </p>
      </div>
    </div>
  )
}