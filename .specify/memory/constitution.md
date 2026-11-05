# AffordableCare Constitution

## Core Principles

### I. Accessible, Patient-Centred Experience
Every patient workflow MUST be understandable without healthcare or technical expertise, keyboard accessible, responsive from mobile through desktop, and designed for clear recovery from errors. Essential information MUST not depend on colour alone.

### II. Privacy and Least Privilege
Health-adjacent and account data MUST be treated as sensitive. The application MUST collect only data required for a defined workflow, expose it only to the patient or authorised provider, validate authorisation on the server, avoid sensitive data in logs, and use secure defaults. AffordableCare is a discovery and scheduling platform, not an emergency or diagnostic service, and MUST communicate that boundary clearly.

### III. Type-Safe, Maintainable Implementation
Production code MUST use TypeScript strict mode and MUST NOT use `any`. Use PascalCase for components and types, camelCase for functions and variables, and kebab-case for route segments. Shared domain rules MUST have a single source of truth.

### IV. Next.js and Tailwind Conventions
The application MUST use the installed Next.js App Router APIs documented by the repository's installed Next.js version. Server Components are the default; Client Components are limited to interfaces requiring browser state or interaction. Routing is file-based. Styling is utility-first with Tailwind CSS; custom CSS is reserved for global foundations or behaviour that utilities cannot express cleanly.

### V. Testable Delivery
Each change MUST map to acceptance criteria. Domain rules and validation require automated tests; authentication, authorisation, booking conflicts, and appointment lifecycle changes require integration coverage; critical patient and provider journeys require end-to-end coverage. Linting, type checking, and relevant tests MUST pass before merge.

## Technical and Product Constraints

- Required foundation: Next.js App Router, TypeScript strict mode, React, and Tailwind CSS.
- Persisted production data MUST use a relational model suitable for users, providers, clinics, services, availability, and appointments.
- Patient and provider permissions MUST be explicit and deny access by default.
- Forms MUST provide labels, validation feedback, pending states, and success or failure confirmation.
- Dates and appointment times MUST retain timezone context and display it to users.
- No feature may imply guaranteed affordability, medical suitability, or emergency support.

## Development Workflow and Collaboration

- Work begins from a prioritised issue with a user outcome and acceptance criteria; lightweight backlog items are refined before implementation.
- Pull requests MUST link their issue, describe testing, and call out privacy, accessibility, or migration impact.
- Reviewers MUST check this constitution and the installed Next.js documentation before approving framework-specific code.
- Breaking schema or contract changes require migration and rollback notes.
- Scope or architectural decisions MUST be recorded in the relevant specification or plan.

## Governance

This constitution governs specifications, plans, and reviews. Amendments require a documented reason, team approval, an impact assessment, and dependent guidance updates. Exceptions MUST be explicit, time-bound, and tracked as debt.

**Version**: 1.0.0 | **Ratified**: 2026-11-05 | **Last Amended**: 2026-11-05
