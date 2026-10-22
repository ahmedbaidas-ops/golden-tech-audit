import { Summary } from "@/components/report/summary"
import { Strengths } from "@/components/report/strengths"
import { Problems } from "@/components/report/problems"
import { QuickNotes } from "@/components/report/quickNotes"
import { Journey } from "@/components/report/journey"
import { Competitors } from "@/components/report/competitors"
import { Plan, Method } from "@/components/report/plan"

export default function Page() {
  return (
    <main
      id="report-scroll"
      className="custom-scrollbar relative w-full flex-1 overflow-auto bg-background"
    >
      <div className="mx-auto max-w-6xl space-y-12 p-4 pb-16 sm:p-6 sm:pb-20">
        <Summary />
        <Strengths />
        <Problems />
        <QuickNotes />
        <Journey />
        <Competitors />
        <Plan />
        <Method />
      </div>
    </main>
  )
}
