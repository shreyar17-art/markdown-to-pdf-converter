import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Inkdown — Beautiful PDFs from Markdown',
  description:
    'Write in Markdown. Export stunning PDFs. Live preview, templates, dark mode. Free and open source.',
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
