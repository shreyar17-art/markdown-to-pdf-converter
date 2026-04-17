'use client'

import Link from 'next/link'
import {
  Eye,
  FileDown,
  FileText,
  Moon,
  Save,
  Sparkles,
  Upload,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Eye,
    title: 'Live Preview',
    description:
      'See your formatted document update in real-time as you type.',
  },
  {
    icon: FileDown,
    title: 'PDF Export',
    description:
      'One-click export with custom page size, margins, and filename.',
  },
  {
    icon: Sparkles,
    title: 'Templates',
    description:
      '6 professional templates: Resume, README, Meeting Notes, and more.',
  },
  {
    icon: Moon,
    title: 'Dark Mode',
    description:
      'Full dark and light theme support with automatic system detection.',
  },
  {
    icon: Save,
    title: 'Auto-save',
    description:
      'Your work is saved to your browser automatically. Never lose a draft.',
  },
  {
    icon: Upload,
    title: 'Drag & Drop',
    description:
      'Import .md and .txt files by dropping them onto the editor.',
  },
] as const

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[480px] w-[480px] motion-safe:animate-pulse rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[420px] w-[420px] motion-safe:animate-pulse rounded-full bg-primary/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground) / 0.35) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-2 font-heading text-lg font-semibold tracking-tight transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <FileText className="h-6 w-6 text-primary" aria-hidden />
            Inkdown
          </Link>
          <div className="flex-1" />
          <Link
            href="https://github.com/gengirish/inkdown"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            GitHub
          </Link>
          <Link
            href="/editor"
            className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Open Editor
          </Link>
        </nav>
      </header>

      <main>
        <section className="relative px-4 pb-24 pt-20 sm:px-6 md:pt-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground md:text-7xl">
                Beautiful PDFs from Markdown
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Write with live preview. Export pixel-perfect PDFs. Free and
                open source.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Link
                  href="/editor"
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5 sm:w-auto"
                >
                  Start Writing
                </Link>
                <Link
                  href="https://github.com/gengirish/inkdown"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-border bg-card/50 px-8 py-3 text-base font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-primary/50 hover:bg-card hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5 sm:w-auto"
                >
                  View on GitHub
                </Link>
              </div>
            </div>

            <div className="mx-auto mt-16 max-w-5xl">
              <div
                className={cn(
                  'overflow-hidden rounded-xl border border-border bg-card shadow-2xl',
                  'motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.01]',
                )}
              >
                <div className="flex h-11 items-center gap-2 border-b border-border bg-muted/40 px-4">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-background/80 px-3 py-1 text-left text-xs text-muted-foreground">
                    document.md — Inkdown
                  </span>
                </div>
                <div className="grid min-h-[280px] grid-cols-1 md:grid-cols-2 md:divide-x md:divide-border">
                  <div className="border-b border-border bg-muted/20 p-4 font-mono text-xs leading-relaxed text-muted-foreground md:border-b-0">
                    <span className="text-primary">#</span> Hello Inkdown{'\n'}
                    <span className="text-primary">##</span> Ship faster{'\n'}
                    {'\n'}
                    Write **markdown** on the left —{'\n'}
                    see the preview update on the right.
                  </div>
                  <div className="space-y-3 bg-background/50 p-6 text-left">
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      Hello Inkdown
                    </h2>
                    <h3 className="font-heading text-lg font-semibold text-foreground/90">
                      Ship faster
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Write <strong className="text-foreground">markdown</strong>{' '}
                      on the left — see the preview update on the right.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Everything you need
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="cursor-pointer rounded-xl border border-border bg-card p-6 shadow-md transition-all duration-200 hover:border-primary/50 hover:shadow-lg motion-safe:hover:-translate-y-1"
                >
                  <Icon
                    className="h-10 w-10 text-primary"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 py-24">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Ready to write?
            </h2>
            <p className="mt-4 text-muted-foreground">
              No sign-up required. Start writing in seconds.
            </p>
            <Link
              href="/editor"
              className="mt-8 inline-flex cursor-pointer rounded-lg bg-primary px-10 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5"
            >
              Open Editor
            </Link>
            <p className="mt-6 text-sm text-muted-foreground">
              Free and open source — MIT License
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p>
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Inkdown. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
