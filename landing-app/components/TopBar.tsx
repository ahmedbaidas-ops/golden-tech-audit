"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FULL_REPORT, Icon, Logo, TEAM_BOARD } from "./ui"

const NAV = [
  { href: "/", label: "نظرة عامة" },
  { href: "/brand/", label: "العلامة", more: "التجارية" },
  { href: "/website/", label: "الموقع" },
  { href: "/concept/", label: "الكونسبت" },
]

const clean = (p: string) => p.replace(/\/+$/, "") || "/"

export function TopBar() {
  const path = clean(usePathname() ?? "/")
  return (
    <header className="topbar">
      <Link className="brand-id" href="/">
        <Logo k="golden" size={46} />
        <span className="brand-txt">
          <b>التكنولوجيا الذهبية</b>
          <small>تقرير التدقيق · الرياض</small>
        </span>
      </Link>
      <nav className="switch" aria-label="أجزاء التقرير">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} aria-current={clean(n.href) === path ? "page" : undefined}>
            {n.label}
            {/* the non-breaking space survives the flex layout; the word hides on phones */}
            {n.more && <span className="lg">&nbsp;{n.more}</span>}
          </Link>
        ))}
      </nav>
      <div className="tb-actions">
        <a
          className="icon-btn"
          href={FULL_REPORT}
          target="_blank"
          rel="noopener"
          aria-label="التقرير الكامل بالصور والمصادر"
          title="التقرير الكامل بالصور والمصادر"
        >
          <Icon name="doc" />
        </a>
        <a
          className="icon-btn"
          href={TEAM_BOARD}
          target="_blank"
          rel="noopener"
          aria-label="لوحة الفريق التفصيلية"
          title="لوحة الفريق التفصيلية"
        >
          <Icon name="grid" />
        </a>
        <span className="who">
          <span className="av" aria-hidden="true">
            P
          </span>
          <span>
            <b>
              <bdi>Pixilated Studio</bdi>
            </b>
            <small>22 أكتوبر 2026</small>
          </span>
        </span>
      </div>
    </header>
  )
}
