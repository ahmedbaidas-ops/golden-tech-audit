import Link from "next/link"
import { LOGO } from "@/data/profile"
import { ProfileBody, ProfileHero } from "@/components/profile/Profile"
import { Icon } from "@/components/ui"

export const metadata = { title: "من نحن · Pixilated Studio" }

export default function Profile() {
  return (
    <main>
      <ProfileHero logo={LOGO} />
      <ProfileBody />
      <div className="reveal mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted-foreground">كيف نعمل معكم على ما في هذا التقرير، وبكم؟</p>
        <Link className="pill-btn primary" href="/proposal/">
          <span className="ic">
            <Icon name="doc" />
          </span>
          العرض المالي
        </Link>
      </div>
      <p className="foot">
        المصدر: عرض شركة <bdi>Pixilated</bdi> 2026.
      </p>
    </main>
  )
}
