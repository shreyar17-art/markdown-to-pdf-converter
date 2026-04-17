'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Eye } from 'lucide-react'

interface PreviewProps {
  markdown: string
}

export function Preview({ markdown }: PreviewProps) {
  if (!markdown.trim()) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Eye className="h-8 w-8 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">Nothing to preview</p>
          <p className="text-xs mt-1 opacity-60">Start writing to see the preview</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="prose dark:prose-invert prose-indigo max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-code:text-[13px] prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg
        prose-img:rounded-lg
        prose-blockquote:border-l-primary/50 prose-blockquote:not-italic
        prose-table:text-sm
        prose-th:bg-muted/50 prose-th:px-3 prose-th:py-2
        prose-td:px-3 prose-td:py-2
        prose-hr:border-border"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
