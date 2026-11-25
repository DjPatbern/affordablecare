# AffordableCare repository instructions

AffordableCare is a healthcare service-discovery and appointment-booking platform for patients and clinic providers. It is not an emergency, diagnostic, insurance-adjudication, payment, or clinical-record system.

## Required stack

- Use the installed Next.js App Router version. Read the matching documentation under `node_modules/next/dist/docs/` before using framework APIs.
- Use React, TypeScript strict mode, and the repository's installed Tailwind CSS v4 configuration.
- Style utility-first with Tailwind. Limit custom CSS to global tokens, font/accessibility foundations, or behavior that Tailwind cannot express clearly; do not add a parallel styling framework without a recorded team decision.
- Do not use `any`; prefer explicit domain types and validated unknown input.
- Use PostgreSQL with Prisma ORM for persistent application data.
- Pages and layouts are Server Components by default. Add `"use client"` only when browser state, events, or client-only APIs require it.

## Repository layout and validated commands

- App Router pages and route handlers live in `app/`; static assets live in `public/`.
- Shared planning and architecture live in `docs/`; feature specifications live in `specs/`.
- Install exact dependencies with `npm ci` after cloning or when `package-lock.json` changes.
- Run the development server with `npm run dev`.
- Always run `npm run lint` and `npm run build` before requesting review. If a managed sandbox blocks Turbopack from binding its internal worker port, use `npx next build --webpack` as the validated fallback; do not treat that sandbox error as an application defect.
- The repository does not yet define a test script. When tests are introduced, add the command to `package.json` and update this file.

## Architecture

- Follow `docs/component-architecture.md` for routes, component ownership, hierarchy, and server/client boundaries.
- Follow `docs/backend-architecture.md` for entities, relationships, constraints, transactions, API contracts, and authorization.
- Follow `docs/design-system.md` for tokens, typography, spacing, responsive behavior, and accessibility.
- Keep database clients and authorization out of presentation components.
- Share validation schemas and domain types between forms, route handlers, and service functions.
- Use server-side authorization for every protected read and mutation.

## Naming and structure

- Components and types: `PascalCase`.
- Functions and variables: `camelCase`.
- Route segments and non-component files: `kebab-case` unless a framework convention requires otherwise.
- Use descriptive names such as `serviceId`, `appointmentStatus`, and `clinicTimezone`.
- Prefer feature-local components; promote to shared UI only when reused.

## UI and accessibility

- Use the warm ivory/forest/sage token palette; do not introduce ad hoc colors.
- Use `Fraunces` for display headings and `Manrope` for body/UI text through `next/font` when implemented.
- Build mobile-first and verify 320px, 768px, 1024px, and 1440px widths.
- Preserve semantic headings, labels, visible focus, keyboard access, 44px touch targets, and WCAG AA contrast.
- Provide loading, empty, error, success, and unauthorized states.
- Never use color alone to communicate status.

## Data and security

- Store money as integer minor units plus ISO currency; never use floating point.
- Store appointment instants with timezone-aware timestamps and display them in the clinic timezone.
- Book a slot and create its appointment in one transaction that prevents double-booking.
- Patients may access only their own profiles/appointments; providers require active clinic membership.
- Do not log tokens, phone numbers, patient notes, or sensitive appointment payloads.
- Archive or unpublish records referenced by appointment history rather than deleting them.

## Quality gates

- Map changes to issue acceptance criteria.
- Run lint, strict type checking, and relevant tests before requesting review.
- Add integration tests for authorization, booking conflicts, appointment status transitions, and contract changes.
- Include responsive screenshots for UI pull requests and migration notes for schema changes.
- Keep changes focused; document deviations from the architecture before implementing them.
