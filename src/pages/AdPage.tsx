import { Zap } from "lucide-react"

interface AdPageProps {
  onFinish: () => void
}

export function AdPage({ onFinish }: AdPageProps) {
  return (
    <div
      className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden cursor-pointer"
      onClick={onFinish}
    >
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[360px] h-[220px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Skip button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onFinish()
          }}
          className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white/80 hover:bg-black/50 transition-colors"
        >
          跳过
        </button>
      </div>

      {/* Ad content area - top 4/5 */}
      <div className="h-[80%] w-full relative flex items-center justify-center p-5 bg-ocean-gradient">
        <div className="w-full h-full bg-white shadow-xl flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <p className="text-sm text-slate-500 font-medium">广告内容区域</p>
          <p className="text-xs text-slate-400">（示意占位，4/5 屏幕区域）</p>
        </div>
      </div>

      {/* App content area - bottom 1/5 */}
      <div className="h-[20%] w-full relative z-10 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col items-center justify-center px-6 gap-1.5">
        <div className="w-12 h-12 rounded-lg overflow-hidden ring-1 ring-primary/30 shadow-[0_4px_16px_hsl(38_92%_55%/0.2)]">
          <img src="./images/logo-app.png" alt="雄鹰加速器" className="w-full h-full object-cover" />
        </div>
        <h2 className="font-bold text-gradient-premium tracking-wider text-center leading-snug drop-shadow-[0_2px_10px_hsl(38_92%_55%/0.25)]">
          <span className="text-[26px]">真免费</span>
          <span className="text-base"> = 全功能开放 零收费</span>
        </h2>
        <p className="text-[10px] text-muted-foreground/60 pt-0.5">沪ICP备2021006153号-9A</p>
      </div>
    </div>
  )
}
