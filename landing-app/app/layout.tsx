import type { Metadata, Viewport } from "next"
import "@fontsource/ibm-plex-sans-arabic/400.css"
import "@fontsource/ibm-plex-sans-arabic/500.css"
import "@fontsource/ibm-plex-sans-arabic/600.css"
import "@fontsource/ibm-plex-sans-arabic/700.css"
import "@fontsource/readex-pro/500.css"
import "@fontsource/readex-pro/600.css"
import "@fontsource/readex-pro/700.css"
import "./app.css"
import { IconSprite } from "@/components/IconSprite"
import { TopBar } from "@/components/TopBar"
import { Motion } from "@/components/Motion"
import { DirectionProvider } from "@/components/shadcn/direction"

export const metadata: Metadata = {
  title: "تدقيق التكنولوجيا الذهبية",
  description: "مراجعة العلامة التجارية والموقع الإلكتروني للتكنولوجيا الذهبية، مع تصور للصفحة الرئيسية الجديدة.",
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" }

// Scroll motion is switched on before first paint, and only for visitors who allow motion.
const MOTION_BOOT =
  'if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver"in window)document.documentElement.classList.add("js-anim")'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body>
        <IconSprite />
        <DirectionProvider dir="rtl">
          <div className="frame">
            <TopBar />
            {children}
          </div>
        </DirectionProvider>
        <Motion />
      </body>
    </html>
  )
}
