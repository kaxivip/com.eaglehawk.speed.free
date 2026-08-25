import { useState, useEffect } from "react"
import { Smartphone, X } from "lucide-react"

/**
 * Shows a full-screen prompt guiding users to "Add to Home Screen"
 * Only appears when:
 * - On a real mobile device
 * - NOT already running in standalone (PWA) mode
 * - User hasn't dismissed it before
 */
export function AddToHomeScreenPrompt() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const isSmallScreen = window.innerWidth <= 768
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    const dismissed = sessionStorage.getItem("a2hs-dismissed")

    if (isTouchDevice && isSmallScreen && !isStandalone && !dismissed) {
      // Slight delay so the page renders first
      setTimeout(() => setShow(true), 800)
    }
  }, [])

  const handleDismiss = () => {
    setShow(false)
    sessionStorage.setItem("a2hs-dismissed", "1")
  }

  if (!show) return null

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm px-6">
      <div className="bg-[hsl(220,25%,12%)] rounded-2xl p-6 max-w-[320px] w-full relative border border-white/10">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[hsl(190,100%,50%)]/15 flex items-center justify-center">
            <Smartphone className="w-7 h-7 text-[hsl(190,100%,50%)]" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-center text-base font-bold text-white mb-2">
          获得最佳体验
        </h3>
        <p className="text-center text-xs text-white/50 mb-5 leading-relaxed">
          将应用添加到主屏幕，享受 100% 全屏沉浸式体验
        </p>

        {/* Steps */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-[hsl(190,100%,50%)]/20 text-[hsl(190,100%,50%)] text-xs font-bold flex items-center justify-center flex-shrink-0">
              1
            </span>
            <p className="text-sm text-white/80">
              {isIOS
                ? "点击底部 分享 按钮"
                : "点击右上角 ⋮ 菜单"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-[hsl(190,100%,50%)]/20 text-[hsl(190,100%,50%)] text-xs font-bold flex items-center justify-center flex-shrink-0">
              2
            </span>
            <p className="text-sm text-white/80">
              {isIOS
                ? "选择\u300C添加到主屏幕\u300D"
                : "选择\u300C添加到主屏幕\u300D或\u300C安装应用\u300D"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-[hsl(190,100%,50%)]/20 text-[hsl(190,100%,50%)] text-xs font-bold flex items-center justify-center flex-shrink-0">
              3
            </span>
            <p className="text-sm text-white/80">从桌面图标打开即可全屏使用</p>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={handleDismiss}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[hsl(190,100%,50%)] to-[hsl(200,100%,45%)] text-white text-sm font-semibold active:scale-[0.98] transition-transform"
        >
          我知道了
        </button>
      </div>
    </div>
  )
}
