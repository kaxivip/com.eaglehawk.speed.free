import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeft,
  Smartphone,
  Monitor,
  Apple,
  Download,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react"

interface OtherPlatformsPageProps {
  onBack: () => void
}

const platforms = [
  {
    id: "android",
    name: "Android 安卓版",
    icon: Smartphone,
    iconColor: "text-green-400",
    iconBg: "bg-green-500/10",
    version: "v1.0.0",
    size: "28.5 MB",
    status: "available" as const,
  },
  {
    id: "ios",
    name: "iOS 苹果版",
    icon: Apple,
    iconColor: "text-foreground",
    iconBg: "bg-foreground/10",
    version: "v1.0.0",
    size: "32.1 MB",
    status: "available" as const,
  },
  {
    id: "windows",
    name: "Windows 电脑版",
    icon: Monitor,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    version: "v1.0.0",
    size: "45.2 MB",
    status: "available" as const,
  },
  {
    id: "macos",
    name: "macOS 电脑版",
    icon: Apple,
    iconColor: "text-muted-foreground",
    iconBg: "bg-muted",
    version: "-",
    size: "-",
    status: "coming" as const,
  },
]

export function OtherPlatformsPage({ onBack }: OtherPlatformsPageProps) {
  const [copied, setCopied] = useState(false)
  const [downloaded, setDownloaded] = useState<string[]>([])
  const downloadUrl = "https://ffish.cc/download"

  const handleCopy = () => {
    navigator.clipboard.writeText(downloadUrl).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = (id: string) => {
    if (!downloaded.includes(id)) {
      setDownloaded((prev) => [...prev, id])
    }
  }

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
      <div className="h-12" />

      <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-foreground">其它平台客户端</h2>
      </div>

      {/* Download link */}
      <div className="relative z-10 px-5 pt-5">
        <Card className="overflow-hidden border-0 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-ocean-mid to-accent/5" />
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">通用下载链接</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-ocean-deep/50 rounded-lg px-3 py-2.5 text-sm text-primary font-mono truncate">
                {downloadUrl}
              </div>
              <button
                onClick={handleCopy}
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  copied ? "bg-status-connected/15 text-status-connected" : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform list */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-5 pb-8 space-y-3">
        <p className="text-xs text-muted-foreground/70 font-medium px-1">选择平台下载</p>
        {platforms.map((p) => {
          const Icon = p.icon
          const isDownloaded = downloaded.includes(p.id)
          const isComing = p.status === "coming"
          return (
            <Card key={p.id} className={`glass-card border-0 ${!isComing ? "hover:bg-muted/30" : "opacity-60"}`}>
              <CardContent className="p-4 flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-xl ${p.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${p.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{p.version}</span>
                    {p.size !== "-" && (
                      <>
                        <span className="text-[10px] text-muted-foreground/40">|</span>
                        <span className="text-[10px] text-muted-foreground">{p.size}</span>
                      </>
                    )}
                  </div>
                </div>
                {isComing ? (
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">即将推出</span>
                ) : isDownloaded ? (
                  <span className="text-xs text-status-connected flex items-center gap-1 bg-status-connected/10 px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    已下载
                  </span>
                ) : (
                  <button
                    onClick={() => handleDownload(p.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-ocean-surface to-accent text-primary-foreground text-xs font-medium hover:opacity-90 active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    下载
                  </button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
