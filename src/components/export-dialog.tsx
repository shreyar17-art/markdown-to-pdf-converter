'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { FileDown, X, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  markdown: string
}

export function ExportDialog({ open, onOpenChange, markdown }: ExportDialogProps) {
  const [filename, setFilename] = useState('document')
  const [pageSize, setPageSize] = useState('A4')
  const [margin, setMargin] = useState('1in')
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    if (!markdown.trim()) {
      toast.error('Nothing to export. Start writing first.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown, page_size: pageSize, margin }),
      })

      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
          const error = await response.json()
          throw new Error(error.error || 'Conversion failed')
        }
        throw new Error(`Conversion failed (${response.status})`)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename || 'document'}.pdf`
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success('PDF exported successfully')
      onOpenChange(false)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to export PDF'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <Dialog.Title className="text-lg font-semibold">
            Export PDF
          </Dialog.Title>
          <Dialog.Description className="text-sm text-muted-foreground mt-1.5">
            Configure your PDF export settings.
          </Dialog.Description>

          <div className="space-y-4 mt-6">
            <div>
              <label htmlFor="filename" className="text-sm font-medium">
                Filename
              </label>
              <div className="flex items-center gap-2 mt-1.5">
                <input
                  id="filename"
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className={inputClass + ' flex-1'}
                  placeholder="document"
                />
                <span className="text-sm text-muted-foreground shrink-0">.pdf</span>
              </div>
            </div>

            <div>
              <label htmlFor="page-size" className="text-sm font-medium">
                Page Size
              </label>
              <select
                id="page-size"
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                className={inputClass + ' mt-1.5 cursor-pointer'}
              >
                <option value="A4">A4 (210 × 297 mm)</option>
                <option value="Letter">US Letter (8.5 × 11 in)</option>
                <option value="Legal">US Legal (8.5 × 14 in)</option>
              </select>
            </div>

            <div>
              <label htmlFor="margin" className="text-sm font-medium">
                Margins
              </label>
              <select
                id="margin"
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                className={inputClass + ' mt-1.5 cursor-pointer'}
              >
                <option value="0.5in">Narrow (0.5 in)</option>
                <option value="1in">Normal (1 in)</option>
                <option value="1.25in">Wide (1.25 in)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <Dialog.Close asChild>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleExport}
              disabled={loading || !markdown.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileDown className="h-4 w-4" />
              )}
              {loading ? 'Exporting...' : 'Download PDF'}
            </button>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
