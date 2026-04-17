'use client'

import { useState, useCallback, useMemo } from 'react'
import { Preview } from './preview'
import { FileText, Eye, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EditorProps {
  markdown: string
  onChange: (value: string) => void
  onFileDrop: (content: string, filename: string) => void
}

export function Editor({ markdown, onChange, onFileDrop }: EditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
  const [isDragging, setIsDragging] = useState(false)

  const stats = useMemo(() => {
    const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0
    const chars = markdown.length
    const lines = markdown.split('\n').length
    return { words, chars, lines }
  }, [markdown])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (
        file &&
        (file.name.endsWith('.md') ||
          file.name.endsWith('.markdown') ||
          file.name.endsWith('.txt'))
      ) {
        const reader = new FileReader()
        reader.onload = (ev) => {
          const content = ev.target?.result as string
          if (content) onFileDrop(content, file.name)
        }
        reader.readAsText(file)
      }
    },
    [onFileDrop]
  )

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-primary/5 backdrop-blur-sm border-2 border-dashed border-primary m-2 rounded-xl flex items-center justify-center motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-200 transition-opacity duration-200">
          <div className="text-center">
            <Upload className="h-10 w-10 text-primary mx-auto mb-3" />
            <p className="text-sm font-semibold text-primary">
              Drop markdown file to import
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports .md, .markdown, and .txt files
            </p>
          </div>
        </div>
      )}

      <div className="flex md:hidden border-b border-border shrink-0">
        <button
          onClick={() => setActiveTab('write')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 min-h-[44px] py-3 text-sm font-medium cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            activeTab === 'write'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <FileText className="h-3.5 w-3.5" />
          Write
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 min-h-[44px] py-3 text-sm font-medium cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            activeTab === 'preview'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Eye className="h-3.5 w-3.5" />
          Preview
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div
          className={cn(
            'flex-1 md:w-1/2 flex flex-col',
            activeTab === 'preview' && 'hidden md:flex'
          )}
        >
          <div className="flex items-center h-9 px-4 border-b border-border bg-muted/40 shrink-0">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              Markdown
            </span>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 p-4 md:p-6 bg-background resize-none outline-none font-mono text-[13px] leading-relaxed placeholder:text-muted-foreground/40 scrollbar-thin transition-shadow duration-200 focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Start writing markdown..."
            spellCheck={false}
          />
        </div>

        <div className="hidden md:block w-px bg-border shrink-0" />

        <div
          className={cn(
            'flex-1 md:w-1/2 flex flex-col',
            activeTab === 'write' && 'hidden md:flex'
          )}
        >
          <div className="flex items-center h-9 px-4 border-b border-border bg-muted/40 shrink-0">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              Preview
            </span>
          </div>
          <div className="flex-1 overflow-auto p-4 md:p-8 scrollbar-thin">
            <Preview markdown={markdown} />
          </div>
        </div>
      </div>

      <div className="h-7 border-t border-border flex items-center px-4 text-[11px] text-muted-foreground gap-3 bg-muted/30 shrink-0">
        <span>
          {stats.words} {stats.words === 1 ? 'word' : 'words'}
        </span>
        <span className="opacity-30">·</span>
        <span>{stats.chars} characters</span>
        <span className="opacity-30">·</span>
        <span>{stats.lines} lines</span>
        <div className="flex-1" />
        <span className="hidden sm:inline opacity-50">
          ⌘⇧E / Ctrl+Shift+E to export
        </span>
      </div>
    </div>
  )
}
