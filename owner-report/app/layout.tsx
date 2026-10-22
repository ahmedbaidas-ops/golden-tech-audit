import "@fontsource/ibm-plex-sans-arabic/400.css"
import "@fontsource/ibm-plex-sans-arabic/500.css"
import "@fontsource/ibm-plex-sans-arabic/600.css"
import "@fontsource/ibm-plex-sans-arabic/700.css"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "تقرير تجربة الزبون | التكنولوجيا الذهبية",
  description:
    "تقرير مبسّط عن تجربة الزبون في موقع التكنولوجيا الذهبية، من Pixilated Studio.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className="antialiased">
      <body>
        <ThemeProvider forcedTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  )
}
