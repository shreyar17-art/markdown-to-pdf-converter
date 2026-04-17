'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { toast } from 'sonner'
import { Navbar } from './navbar'
import { Editor } from './editor'
import { ExportDialog } from './export-dialog'
import { templates, type Template } from '@/lib/templates'

const STORAGE_KEY = 'inkdown-content'
const DEFAULT_CONTENT = templates[0].content

export function EditorWorkspace() {
  const [markdown, setMarkdown] = useState(DEFAULT_CONTENT)
  const [exportOpen, setExportOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const previousContent = useRef('')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null && saved.length > 0) {
      setMarkdown(saved)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, markdown)
    }
  }, [markdown, mounted])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === 'e' || e.key === 'E')
      ) {
        e.preventDefault()
        setExportOpen(true)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        toast.success('Content auto-saved')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleTemplateSelect = useCallback(
    (template: Template) => {
      previousContent.current = markdown
      setMarkdown(template.content)
      toast(`Loaded "${template.name}" template`, {
        action: {
          label: 'Undo',
          onClick: () => setMarkdown(previousContent.current),
        },
      })
    },
    [markdown]
  )

  const handleFileDrop = useCallback(
    (content: string, filename: string) => {
      previousContent.current = markdown
      setMarkdown(content)
      toast.success(`Imported ${filename}`, {
        action: {
          label: 'Undo',
          onClick: () => setMarkdown(previousContent.current),
        },
      })
    },
    [markdown]
  )

  const handleNew = useCallback(() => {
    if (!markdown.trim()) return
    previousContent.current = markdown
    setMarkdown('')
    toast('New document created', {
      action: {
        label: 'Undo',
        onClick: () => setMarkdown(previousContent.current),
      },
    })
  }, [markdown])

  return (
    <div className="flex flex-col h-screen bg-background">
      <Navbar
        onExport={() => setExportOpen(true)}
        onTemplateSelect={handleTemplateSelect}
        onNew={handleNew}
      />
      <Editor
        markdown={markdown}
        onChange={setMarkdown}
        onFileDrop={handleFileDrop}
      />
      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        markdown={markdown}
      />
    </div>
  )
}
