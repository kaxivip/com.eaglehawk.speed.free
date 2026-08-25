/** Shared application icon data used across ModeSelectPage and AppSelectPage */

export interface AppIconData {
  id: string
  name: string
  category: string
  icon: string
  color: string
}

export const APP_ICONS: Record<string, { icon: string; color: string; name: string }> = {
  youtube: { icon: "▶", color: "bg-red-500/20", name: "YouTube" },
  twitter: { icon: "𝕏", color: "bg-foreground/10", name: "X" },
  instagram: { icon: "📷", color: "bg-pink-500/20", name: "Instagram" },
  telegram: { icon: "✈", color: "bg-blue-500/20", name: "Telegram" },
  whatsapp: { icon: "📱", color: "bg-green-500/20", name: "WhatsApp" },
  tiktok: { icon: "🎵", color: "bg-foreground/10", name: "TikTok" },
  discord: { icon: "🎮", color: "bg-indigo-500/20", name: "Discord" },
  spotify: { icon: "🎧", color: "bg-green-600/20", name: "Spotify" },
  netflix: { icon: "🎬", color: "bg-red-600/20", name: "Netflix" },
  chatgpt: { icon: "🤖", color: "bg-emerald-500/20", name: "ChatGPT" },
  github: { icon: "💻", color: "bg-foreground/10", name: "GitHub" },
  reddit: { icon: "🔴", color: "bg-orange-500/20", name: "Reddit" },
  medium: { icon: "📝", color: "bg-foreground/10", name: "Medium" },
  notion: { icon: "📓", color: "bg-foreground/10", name: "Notion" },
  figma: { icon: "🎨", color: "bg-purple-500/20", name: "Figma" },
  google: { icon: "🔍", color: "bg-blue-400/20", name: "Google" },
}

export const MOCK_APPS: AppIconData[] = [
  { id: "youtube", name: "YouTube", category: "视频", icon: "▶", color: "bg-red-500/20" },
  { id: "twitter", name: "X (Twitter)", category: "社交", icon: "𝕏", color: "bg-foreground/10" },
  { id: "instagram", name: "Instagram", category: "社交", icon: "📷", color: "bg-pink-500/20" },
  { id: "telegram", name: "Telegram", category: "通讯", icon: "✈", color: "bg-blue-500/20" },
  { id: "whatsapp", name: "WhatsApp", category: "通讯", icon: "📱", color: "bg-green-500/20" },
  { id: "tiktok", name: "TikTok", category: "视频", icon: "🎵", color: "bg-foreground/10" },
  { id: "discord", name: "Discord", category: "社交", icon: "🎮", color: "bg-indigo-500/20" },
  { id: "spotify", name: "Spotify", category: "音乐", icon: "🎧", color: "bg-green-600/20" },
  { id: "netflix", name: "Netflix", category: "视频", icon: "🎬", color: "bg-red-600/20" },
  { id: "chatgpt", name: "ChatGPT", category: "AI", icon: "🤖", color: "bg-emerald-500/20" },
  { id: "github", name: "GitHub", category: "开发", icon: "💻", color: "bg-foreground/10" },
  { id: "reddit", name: "Reddit", category: "社区", icon: "🔴", color: "bg-orange-500/20" },
  { id: "medium", name: "Medium", category: "阅读", icon: "📝", color: "bg-foreground/10" },
  { id: "notion", name: "Notion", category: "效率", icon: "📓", color: "bg-foreground/10" },
  { id: "figma", name: "Figma", category: "设计", icon: "🎨", color: "bg-purple-500/20" },
  { id: "google", name: "Google", category: "搜索", icon: "🔍", color: "bg-blue-400/20" },
]
