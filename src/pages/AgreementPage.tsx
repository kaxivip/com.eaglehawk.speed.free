import { ChevronLeft } from "lucide-react"

interface AgreementPageProps {
  type: "privacy" | "service"
  onBack: () => void
}

export function AgreementPage({ type, onBack }: AgreementPageProps) {
  const isPrivacy = type === "privacy"

  return (
    <div className="w-full h-full bg-ocean-gradient flex flex-col relative overflow-hidden">
      {/* Status bar spacer */}
      <div className="h-12" />

      {/* Header */}
      <div className="relative z-10 px-5 pt-2 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-foreground">
          {isPrivacy ? "隐私协议" : "服务协议"}
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-auto px-5 pt-4 pb-8">
        <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
          <p className="text-xs">更新日期：2026年1月1日 | 生效日期：2026年1月1日</p>

          {isPrivacy ? (
            <>
              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">引言</h3>
                <p>
                  雄鹰加速器（以下简称"本应用"）由上海忭萌科技有限公司运营。我们深知个人信息对您的重要性，并将按照法律法规要求，采取相应安全保护措施来保护您的个人信息。
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">一、我们收集的信息</h3>
                <p className="font-medium text-foreground">1. 注册登录信息</p>
                <p>当您注册并登录雄鹰加速器时，我们需要收集您的手机号码用于身份验证和账号安全。如果您选择一键登录，我们将通过运营商授权获取您的手机号码。</p>
                <p className="font-medium text-foreground mt-2">2. 应用列表信息</p>
                <p>当您使用"应用加速"模式时，我们需要获取您设备上已安装应用的列表信息。该信息仅在您的设备本地使用，用于让您选择需要加速的应用，不会上传至我们的服务器或分享给任何第三方。</p>
                <p className="font-medium text-foreground mt-2">3. 网络连接信息</p>
                <p>为提供加速服务，我们会在您开启加速时建立加密通道。我们仅记录连接时间和流量统计，不会记录、监控或存储您通过加速通道传输的任何内容。</p>
                <p className="font-medium text-foreground mt-2">4. 设备信息</p>
                <p>我们可能收集您的设备型号、操作系统版本等基础信息，仅用于服务优化和故障排查。</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">二、信息的使用</h3>
                <p>我们收集的信息将用于以下目的：</p>
                <ul className="list-disc pl-4 space-y-1 mt-1">
                  <li>提供、维护和改善我们的加速服务</li>
                  <li>验证您的身份并保障账号安全</li>
                  <li>发送服务通知和系统公告</li>
                  <li>防止欺诈和违法行为</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">三、信息的共享</h3>
                <p>
                  未经您的同意，我们不会与任何第三方共享您的个人信息，法律法规另有规定的除外。我们可能委托第三方服务商提供广告服务，但我们会要求其遵守严格的隐私保护标准。
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">四、信息安全</h3>
                <p>
                  我们采用AES-256加密技术保护数据传输安全，所有加速通道均使用端到端加密。我们的服务器部署在通过ISO 27001认证的数据中心。
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">五、您的权利</h3>
                <p>根据相关法律法规，您享有以下权利：</p>
                <ul className="list-disc pl-4 space-y-1 mt-1">
                  <li>查询和访问您的个人信息</li>
                  <li>更正或补充您的个人信息</li>
                  <li>删除您的个人信息</li>
                  <li>撤回您此前作出的同意</li>
                  <li>注销您的账号</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">六、联系我们</h3>
                <p>
                  如您对本隐私协议有任何疑问，请通过以下方式联系我们：
                </p>
                <p className="mt-1">邮箱：bianmeng.net@outlook.com</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">引言</h3>
                <p>
                  欢迎使用雄鹰加速器。本服务协议（以下简称"本协议"）是您与上海忭萌科技有限公司之间关于使用雄鹰加速器服务所订立的协议。
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">一、服务内容</h3>
                <p>雄鹰加速器为用户提供以下服务：</p>
                <ul className="list-disc pl-4 space-y-1 mt-1">
                  <li>全局加速：将设备所有网络流量通过加密通道中转</li>
                  <li>应用加速：仅对用户选定的应用流量进行加速中转</li>
                  <li>免费续时：通过观看激励广告、完成任务获取加速时长</li>
                </ul>
                <p className="mt-2">本应用承诺永久免费，不会收取任何费用。</p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">二、使用规范</h3>
                <p>您在使用本服务时，应遵守中华人民共和国相关法律法规，不得利用本服务从事以下活动：</p>
                <ul className="list-disc pl-4 space-y-1 mt-1">
                  <li>违反宪法或法律法规的行为</li>
                  <li>危害国家安全、泄露国家秘密的行为</li>
                  <li>侵犯他人知识产权或其他合法权益的行为</li>
                  <li>散布淫秽、色情、赌博、暴力、凶杀、恐怖内容的行为</li>
                  <li>其他违反法律、行政法规的行为</li>
                </ul>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">三、免责声明</h3>
                <p>
                  本应用仅提供网络加速服务，不对用户通过本服务访问的内容负责。用户应自行判断所访问内容的合法性和安全性。
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">四、服务变更与终止</h3>
                <p>
                  我们有权根据业务发展需要，变更、暂停或终止部分或全部服务。如因不可抗力导致服务中断，我们不承担责任。
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-foreground mb-2">五、争议解决</h3>
                <p>
                  本协议适用中华人民共和国法律。因本协议产生的争议，双方应协商解决；协商不成的，任何一方均可向上海忭萌科技有限公司所在地有管辖权的人民法院提起诉讼。
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
