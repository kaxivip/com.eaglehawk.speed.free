import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, AlertTriangle, CheckCircle2, X } from "lucide-react"

interface AccountDeletePageProps {
  onBack: () => void
  onConfirmDelete: () => void
}

type DeleteStep = "warning" | "confirm" | "success"

export function AccountDeletePage({ onBack, onConfirmDelete }: AccountDeletePageProps) {
  const [step, setStep] = useState<DeleteStep>("warning")
  const [agreed, setAgreed] = useState(false)

  const handleConfirmDelete = () => {
    setStep("success")
  }

  const handleDone = () => {
    onConfirmDelete()
  }

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-destructive/5 blur-[80px]" />

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
        <h2 className="text-lg font-bold text-foreground">注销账号</h2>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-6 pb-8">
        {step === "warning" && (
          <div className="flex flex-col items-center">
            {/* Warning icon */}
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>

            <h3 className="text-lg font-bold text-foreground mb-2">确认注销账号？</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              此操作不可逆，请仔细阅读以下提示
            </p>

            {/* Warning list */}
            <Card className="glass-card border-0 w-full mb-6">
              <CardContent className="p-4 space-y-3">
                <div className="flex gap-3">
                  <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground">账号下所有个人信息将被永久删除，无法恢复</p>
                </div>
                <div className="flex gap-3">
                  <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground">剩余加速时长将被清零，无法找回</p>
                </div>
                <div className="flex gap-3">
                  <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground">已完成的任务记录和成就将被清除</p>
                </div>
                <div className="flex gap-3">
                  <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground">注销后同一手机号需等待30天才能重新注册</p>
                </div>
              </CardContent>
            </Card>

            {/* Agreement checkbox */}
            <button
              onClick={() => setAgreed(!agreed)}
              className="w-full flex items-center gap-2.5 mb-6"
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  agreed
                    ? "bg-destructive border-destructive"
                    : "border-muted-foreground/40 bg-transparent"
                }`}
              >
                {agreed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </div>
              <span className="text-sm text-muted-foreground">
                我已阅读并理解以上提示，确认注销账号
              </span>
            </button>

            {/* Buttons */}
            <div className="w-full space-y-3">
              <button
                onClick={() => setStep("confirm")}
                disabled={!agreed}
                className={`w-full py-3.5 rounded-xl text-sm font-medium transition-all ${
                  agreed
                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                继续注销
              </button>
              <button
                onClick={onBack}
                className="w-full py-3.5 rounded-xl border border-border/50 text-sm font-medium text-foreground hover:bg-muted/20 transition-colors"
              >
                返回
              </button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="flex flex-col items-center">
            {/* Confirm icon */}
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>

            <h3 className="text-lg font-bold text-foreground mb-2">最终确认</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              请输入"确认注销"以完成账号注销
            </p>

            <Card className="glass-card border-0 w-full mb-6">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-2">请在下方输入框中输入"确认注销"</p>
                <input
                  type="text"
                  placeholder="请输入 确认注销"
                  className="w-full bg-ocean-mid/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-destructive/50 focus:ring-1 focus:ring-destructive/30 transition-all"
                  id="delete-confirm-input"
                />
              </CardContent>
            </Card>

            {/* Buttons */}
            <div className="w-full space-y-3">
              <button
                onClick={() => {
                  const input = document.getElementById("delete-confirm-input") as HTMLInputElement
                  if (input?.value === "确认注销") {
                    handleConfirmDelete()
                  }
                }}
                className="w-full py-3.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 active:scale-[0.98] transition-all"
              >
                确认注销
              </button>
              <button
                onClick={onBack}
                className="w-full py-3.5 rounded-xl border border-border/50 text-sm font-medium text-foreground hover:bg-muted/20 transition-colors"
              >
                返回
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center">
            {/* Success icon */}
            <div className="w-20 h-20 rounded-full bg-status-connected/10 flex items-center justify-center mb-5">
              <CheckCircle2 className="w-10 h-10 text-status-connected" />
            </div>

            <h3 className="text-lg font-bold text-foreground mb-2">账号已注销</h3>
            <p className="text-sm text-muted-foreground text-center mb-2">
              您的账号已成功注销
            </p>
            <p className="text-xs text-muted-foreground/70 text-center mb-8">
              感谢您使用雄鹰加速器，期待您的再次使用
            </p>

            <Card className="glass-card border-0 w-full mb-6">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>注销时间：{new Date().toLocaleString("zh-CN")}</p>
                  <p>30天内同一手机号将无法重新注册</p>
                </div>
              </CardContent>
            </Card>

            <button
              onClick={handleDone}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all"
            >
              返回首页
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
