"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { HugeiconsIcon } from "@hugeicons/react"
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"
import { Button } from "./button"

export function Themetoggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light")
  }, [theme, setTheme])

  return (
    <Button
      variant="outline"
      size="icon"
      className="flex size-7 items-center justify-center"
      onClick={toggleTheme}
    >
      <HugeiconsIcon
        icon={Sun03Icon}
        className="block size-4 opacity-70 dark:hidden dark:opacity-85"
      />
      <HugeiconsIcon
        icon={Moon02Icon}
        className="hidden size-4 opacity-70 dark:block dark:opacity-85"
      />
    </Button>
  )
}
