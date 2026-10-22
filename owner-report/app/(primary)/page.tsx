import { Cover } from "@/components/report/cover"
import { Strengths } from "@/components/report/strengths"
import { Problems } from "@/components/report/problems"
import { Plan } from "@/components/report/plan"
import { Details } from "@/components/report/details"

export default function Page() {
  return (
    <main
      id="report-scroll"
      className="custom-scrollbar relative w-full flex-1 overflow-auto bg-(--paper)"
    >
      <div className="mx-auto max-w-[66rem] space-y-16 px-4 pt-5 pb-24 sm:px-6 sm:pt-8 lg:space-y-20">
        <Cover />
        <Strengths />
        <Problems />
        <Plan />
        <Details />
      </div>
    </main>
  )
}
