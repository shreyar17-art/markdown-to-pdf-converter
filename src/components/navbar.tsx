'use client'

import {
  FileDown,
  FileText,
  Plus,
  Sparkles,
  ChevronDown,
  Briefcase,
  BookOpen,
  Users,
  PenTool,
  Code2,
  type LucideIcon,
} from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ThemeToggle } from './theme-toggle'
import { templates, type Template } from '@/lib/templates'

const templateIcons: Record<string, LucideIcon> = {
  'getting-started': FileText,
  resume: Briefcase,
  readme: BookOpen,
  'meeting-notes': Users,
  'blog-post': PenTool,
  'technical-spec': Code2,
}

interface NavbarProps {
  onExport: () => void
  onTemplateSelect: (template: Template) => void
  onNew: () => void
}

export function Navbar({ onExport, onTemplateSelect, onNew }: NavbarProps) {
  return (
    <nav className="h-12 border-b border-border flex items-center px-3 gap-1 bg-background/80 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-2 mr-2">
        <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
          <FileText className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-[15px] tracking-tight">Inkdown</span>
      </div>

      <div className="h-5 w-px bg-border mx-1.5" />

      <button
        onClick={onNew}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="New document"
      >
        <Plus className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">New</span>
      </button>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Templates</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[260px] bg-popover border border-border rounded-xl p-1.5 shadow-xl z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            sideOffset={5}
            align="start"
          >
            <DropdownMenu.Label className="px-2 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
              Choose a template
            </DropdownMenu.Label>
            <DropdownMenu.Separator className="h-px bg-border my-1" />
            {templates.map((template) => {
              const Icon = templateIcons[template.id] || FileText
              return (
                <DropdownMenu.Item
                  key={template.id}
                  className="flex items-start gap-3 px-2 py-2.5 rounded-lg cursor-pointer outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  onSelect={() => onTemplateSelect(template)}
                >
                  <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium leading-none mb-1">
                      {template.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-tight">
                      {template.description}
                    </div>
                  </div>
                </DropdownMenu.Item>
              )
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <div className="flex-1" />

      <ThemeToggle />

      <button
        onClick={onExport}
        className="flex items-center gap-1.5 ml-1 px-3.5 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
      >
        <FileDown className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Export PDF</span>
      </button>
    </nav>
  )
}
