import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { IconSprite } from "@/components/IconSprite"
import { Motion } from "@/components/Motion"
import { TopBar } from "@/components/TopBar"
import { DirectionProvider } from "@/components/shadcn/direction"
import Overview from "@/app/page"
import Brand from "@/app/brand/page"
import Website from "@/app/website/page"
import Concept from "@/app/concept/page"
import Proposal from "@/app/proposal/page"
import Profile from "@/app/profile/page"
import { usePath } from "./router"

// the same pages as the Next app, routed in memory
const ROUTES: Record<string, [() => React.ReactNode, string]> = {
  "/": [Overview, "نظرة عامة"],
  "/brand/": [Brand, "العلامة التجارية"],
  "/website/": [Website, "الموقع"],
  "/concept/": [Concept, "الكونسبت"],
  "/profile/": [Profile, "من نحن"],
  "/proposal/": [Proposal, "العرض المالي"],
}

function App() {
  const path = usePath()
  const [Page, label] = ROUTES[path] ?? ROUTES["/"]
  useEffect(() => {
    document.title = `${label} · تدقيق التكنولوجيا الذهبية`
  }, [label])
  return (
    <>
      <IconSprite />
      <DirectionProvider dir="rtl">
        <div className="frame">
          <TopBar />
          <Page key={path} />
        </div>
      </DirectionProvider>
      <Motion />
    </>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
