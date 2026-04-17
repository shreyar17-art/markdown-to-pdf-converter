export interface Template {
  id: string
  name: string
  description: string
  content: string
}

export const templates: Template[] = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Learn what Inkdown can do',
    content: `# Welcome to Inkdown

Write beautiful documents in **Markdown** and export them as polished PDFs.

## Quick Start

Start typing in the editor on the left. Your changes appear instantly in the preview on the right.

## Formatting

You can use all standard Markdown formatting:

- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- \`inline code\` for technical terms
- [Links](https://example.com) to external resources
- ~~Strikethrough~~ for corrections

## Code Blocks

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # 55
\`\`\`

## Tables

| Feature | Status |
|---------|--------|
| Live Preview | Available |
| PDF Export | Available |
| Dark Mode | Available |
| Templates | Available |
| Auto-save | Available |
| Drag & Drop | Available |

## Blockquotes

> "The best way to predict the future is to create it."
> — Peter Drucker

## Task Lists

- [x] Write markdown
- [x] Preview in real-time
- [ ] Export to PDF
- [ ] Share with the world

---

Ready to create something amazing? Start editing, or choose a template from the toolbar above.
`,
  },
  {
    id: 'resume',
    name: 'Resume',
    description: 'Professional resume template',
    content: `# Jane Smith

**Software Engineer** · San Francisco, CA
jane@example.com · (555) 123-4567 · [linkedin.com/in/janesmith](https://linkedin.com)

---

## Summary

Full-stack engineer with 5+ years of experience building scalable web applications. Passionate about clean code, developer experience, and shipping products that users love.

## Experience

### Senior Software Engineer — Acme Corp
*2022 – Present*

- Led migration of monolithic Rails app to Next.js + microservices, reducing p95 latency by 40%
- Designed and implemented real-time collaboration features serving 50K+ daily active users
- Mentored 4 junior engineers through structured onboarding and weekly 1:1s

### Software Engineer — StartupCo
*2019 – 2022*

- Built payment processing pipeline handling $2M+ monthly transaction volume
- Implemented CI/CD pipeline reducing deployment time from 45 minutes to 8 minutes
- Contributed to open-source design system adopted by 200+ internal developers

## Technical Skills

**Languages:** TypeScript, Python, Go, SQL
**Frameworks:** React, Next.js, Node.js, FastAPI
**Infrastructure:** AWS, Docker, Kubernetes, Terraform
**Databases:** PostgreSQL, Redis, DynamoDB

## Education

### B.S. Computer Science — Stanford University
*2015 – 2019* · GPA: 3.8/4.0

## Projects

**markdown-to-pdf** — Open-source Markdown-to-PDF converter with live preview and custom templates. 500+ GitHub stars.
`,
  },
  {
    id: 'readme',
    name: 'Project README',
    description: 'Open source project docs',
    content: `# Project Name

> One-line description of what this project does.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- Feature one with a brief explanation
- Feature two with a brief explanation
- Feature three with a brief explanation

## Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/username/project-name.git
cd project-name

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Deployment | Vercel |

## Project Structure

\`\`\`
src/
├── app/          # Next.js App Router pages
├── components/   # Reusable UI components
├── lib/          # Utilities and helpers
└── providers/    # React context providers
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
`,
  },
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Structured meeting minutes',
    content: `# Team Standup — April 17, 2026

**Date:** Thursday, April 17, 2026
**Time:** 10:00 AM – 10:30 AM
**Attendees:** Alice, Bob, Charlie, Diana

---

## Agenda

1. Sprint progress review
2. Blockers and dependencies
3. Upcoming deadlines

## Discussion

### Sprint Progress

- **Alice:** Completed user authentication flow. PR #142 ready for review.
- **Bob:** Database migration 80% complete. Estimated finish by EOD Friday.
- **Charlie:** Design mockups for dashboard v2 approved by stakeholders.
- **Diana:** Load testing revealed bottleneck in search API — investigating.

### Blockers

| Person | Blocker | Owner | ETA |
|--------|---------|-------|-----|
| Bob | Needs production DB credentials | DevOps | Today |
| Diana | Search API requires index optimization | Diana | Friday |

### Decisions Made

1. **Ship auth flow** by end of sprint (April 20)
2. **Postpone** dashboard v2 to next sprint
3. **Schedule** deep-dive on search performance for Friday 2 PM

## Action Items

- [ ] Alice: Write integration tests for auth flow
- [ ] Bob: Coordinate with DevOps for credentials
- [ ] Charlie: Start component library for dashboard v2
- [ ] Diana: Profile search queries and propose index changes

## Next Meeting

**Friday, April 19, 2026 at 10:00 AM**
`,
  },
  {
    id: 'blog-post',
    name: 'Blog Post',
    description: 'Article or blog post format',
    content: `# Why We Switched from REST to GraphQL

*Published April 17, 2026 · 8 min read*

---

## TL;DR

After 18 months of growing pains with our REST API, we migrated to GraphQL. The result: 60% fewer API calls, 3x faster mobile load times, and happier frontend engineers.

## The Problem

Our REST API started simple — a handful of endpoints serving a single web client. But as we grew to support mobile apps, partner integrations, and a public API, cracks started showing:

- **Over-fetching:** Mobile clients downloaded 10x more data than they displayed
- **Under-fetching:** Complex pages required 12+ sequential API calls
- **Versioning nightmare:** Three API versions running simultaneously

## What We Tried First

Before committing to GraphQL, we explored alternatives:

1. **BFF Pattern** — Separate backend-for-frontend services. Added operational complexity without solving the core problem.
2. **Sparse Fieldsets** — JSON:API-style field selection. Helped with over-fetching but not under-fetching.
3. **Custom Endpoints** — Per-screen endpoints. Fast initially, but created maintenance burden.

## The Migration

We chose an incremental approach:

\`\`\`typescript
// Phase 1: GraphQL gateway wrapping existing REST services
const resolvers = {
  Query: {
    user: async (_, { id }) => {
      const user = await restClient.get(\\\`/users/\\\${id}\\\`)
      const posts = await restClient.get(\\\`/users/\\\${id}/posts\\\`)
      return { ...user, posts }
    },
  },
}
\`\`\`

> **Key insight:** We didn't rewrite our backend. GraphQL served as a composition layer over existing services.

## Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Avg. API calls per page | 8.3 | 1.2 | -85% |
| Mobile data transfer | 2.1 MB | 340 KB | -84% |
| Time to interactive | 4.2s | 1.4s | -67% |

## Lessons Learned

1. **Start with the hardest page.** If GraphQL can simplify your most complex view, the rest follows naturally.
2. **Invest in tooling early.** Type generation, query linting, and performance monitoring pay for themselves immediately.
3. **Don't migrate everything.** Simple CRUD endpoints work fine as REST. Use GraphQL where data relationships are complex.

## What's Next

We're exploring [GraphQL subscriptions](https://graphql.org/blog/subscriptions-in-graphql-and-relay/) for real-time features and evaluating persisted queries for public API performance.

---

*Have questions? Reach out on [Twitter](https://twitter.com) or leave a comment below.*
`,
  },
  {
    id: 'technical-spec',
    name: 'Technical Spec',
    description: 'RFC / specification document',
    content: `# RFC: Real-Time Collaboration Engine

**Author:** Engineering Team
**Status:** Draft
**Created:** April 17, 2026
**Last Updated:** April 17, 2026

---

## 1. Summary

This document proposes a real-time collaboration engine that enables multiple users to edit documents simultaneously with conflict-free resolution.

## 2. Motivation

Users frequently request the ability to collaborate on documents in real-time. Currently, our platform only supports single-user editing, leading to version conflicts and workflow friction.

### Goals

- Enable real-time multi-user editing with < 100ms latency
- Provide presence indicators (cursors, selections)
- Support offline editing with automatic sync on reconnect
- Maintain backward compatibility with existing document format

### Non-Goals

- Video/audio communication
- Permission management (handled by existing auth system)
- Mobile-specific optimizations (Phase 2)

## 3. Proposed Solution

### Architecture

\`\`\`
┌─────────┐     WebSocket     ┌──────────────┐     Redis Pub/Sub     ┌─────────┐
│ Client A │ ◄──────────────► │   Collab      │ ◄────────────────► │  Client B │
│          │                  │   Server      │                     │           │
└─────────┘                  └──────┬───────┘                     └─────────┘
                                     │
                                     │ Persist
                                     ▼
                              ┌──────────────┐
                              │  PostgreSQL   │
                              └──────────────┘
\`\`\`

### Conflict Resolution

We propose using **CRDTs** (Conflict-free Replicated Data Types) via the Yjs library:

- Automatic merge without central coordination
- Proven at scale (used by Notion, Figma)
- Rich ecosystem of editor bindings

## 4. Alternatives Considered

| Approach | Pros | Cons |
|----------|------|------|
| OT (Operational Transform) | Well-understood, used by Google Docs | Requires central server, complex implementation |
| CRDT (Yjs) | Decentralized, offline-first | Higher memory usage, eventual consistency |
| Last-write-wins | Simple | Data loss, poor UX |

## 5. Implementation Plan

### Phase 1: Foundation (Weeks 1–3)
- [ ] Set up WebSocket infrastructure
- [ ] Integrate Yjs with document model
- [ ] Basic cursor presence

### Phase 2: Polish (Weeks 4–5)
- [ ] Offline support and sync
- [ ] Undo/redo per user
- [ ] Performance optimization

### Phase 3: Launch (Week 6)
- [ ] Beta rollout to 10% of users
- [ ] Monitoring and alerting
- [ ] Full GA release

## 6. Open Questions

1. What is the maximum number of concurrent editors per document?
2. Should we support commenting within the collab session?
3. How long do we retain edit history?

---

*Please add comments and feedback directly to this document.*
`,
  },
]
