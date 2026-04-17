import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from 'sonner'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Inkdown — Beautiful PDFs from Markdown',
  description:
    'Write Markdown with live preview. Export stunning PDFs. Templates, dark mode, keyboard shortcuts. Free and open source.',
  keywords: ['markdown', 'pdf', 'converter', 'editor', 'export', 'open source'],
  openGraph: {
    title: 'Inkdown — Beautiful PDFs from Markdown',
    description: 'Write in Markdown. Export stunning PDFs. Free, fast, and open source.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
