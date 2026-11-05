# AffordableCare Initial Backlog

P0/P1 items are ready for GitHub issues. P2 items are intentionally lightweight for later prioritisation and refinement.

**GitHub Project:** [AffordableCare Development](https://github.com/users/DjPatbern/projects/1)

| Backlog ID | GitHub issue |
| --- | --- |
| AC-001 | [#15](https://github.com/DjPatbern/affordablecare/issues/15) |
| AC-002 | [#14](https://github.com/DjPatbern/affordablecare/issues/14) |
| AC-003 | [#13](https://github.com/DjPatbern/affordablecare/issues/13) |
| AC-004 | [#11](https://github.com/DjPatbern/affordablecare/issues/11) |
| AC-005 | [#10](https://github.com/DjPatbern/affordablecare/issues/10) |
| AC-006 | [#12](https://github.com/DjPatbern/affordablecare/issues/12) |
| AC-007 | [#9](https://github.com/DjPatbern/affordablecare/issues/9) |
| AC-008 | [#8](https://github.com/DjPatbern/affordablecare/issues/8) |
| AC-009 | [#7](https://github.com/DjPatbern/affordablecare/issues/7) |
| AC-010 | [#6](https://github.com/DjPatbern/affordablecare/issues/6) |
| AC-011 | [#5](https://github.com/DjPatbern/affordablecare/issues/5) |
| AC-012 | [#4](https://github.com/DjPatbern/affordablecare/issues/4) |
| AC-013 | [#3](https://github.com/DjPatbern/affordablecare/issues/3) |
| AC-014 | [#2](https://github.com/DjPatbern/affordablecare/issues/2) |
| AC-015 | [#1](https://github.com/DjPatbern/affordablecare/issues/1) |

## Ready issues

### AC-001 — Establish data model and migrations (P0)

- Model users, profiles, memberships, clinics, services, slots, and appointments.
- Enforce appointment ownership, clinic authorisation, and one active booking per slot.
- Provide a repeatable empty-database migration.

### AC-002 — Patient authentication and profiles (P0)

- Support registration, sign-in/out, recovery, and permitted profile edits.
- Reject duplicate/invalid registration safely and protect authenticated pages.
- Prevent role changes and cross-profile access.

### AC-003 — Service directory and clinic details (P0)

- Publicly show only published clinics/services.
- Combine category and location filters and provide reset/empty states.
- Include required public listing information in a responsive interface.

### AC-004 — Provider service management (P0)

- Support authorised create, read, update, publish, and unpublish actions.
- Validate on the server and deny unauthorised clinic access.
- Preserve existing appointments when unpublishing.

### AC-005 — Provider availability management (P0)

- Create, edit, and remove eligible timezone-aware future availability.
- Reject overlaps and invalid intervals.
- Protect reserved slots; expose only bookable slots to patients.

### AC-006 — Patient appointment booking (P0)

- Create exactly one patient-owned appointment for a valid slot.
- Prevent concurrent double-booking and recover from stale availability.
- Confirm clinic, service, date, time, timezone, and status.

### AC-007 — Patient appointment management (P0)

- Show only the patient's past/upcoming appointments.
- Reschedule atomically and cancel under displayed clinic policy.
- Clearly distinguish appointment states.

### AC-008 — Provider appointment dashboard (P0)

- Limit schedules to authorised clinics and combine date/status filters.
- Accept only valid status changes and expose updates to the patient.

### AC-009 — Accessibility, responsive, and journey verification (P1)

- Cover authentication, discovery, booking, and both management dashboards.
- Verify 320px and desktop layouts plus keyboard navigation and labels.
- Run lint, strict type checking, and tests in continuous integration.

## Lightweight backlog — refine before implementation

- **AC-010 — Appointment reminders (P2):** Explore channels, timing, preferences, consent, cost, and failures.
- **AC-011 — Payments and insurance (P2):** Define transaction, compliance, pricing, insurance, and refund scope.
- **AC-012 — Reviews and quality signals (P2):** Explore verification, moderation, responses, abuse, and fairness.
- **AC-013 — Telehealth (P2):** Explore eligibility, secure meetings, consent, privacy, and provider workflows.
- **AC-014 — Calendar sync (P2):** Explore export/sync, timezones, updates, and privacy-safe event content.
- **AC-015 — Provider onboarding (P2):** Define verification, invitations, roles, suspensions, audit history, and transfers.

## Suggested GitHub Project fields

- Workflow: Backlog → Ready → In progress → In review → Done
- Priority: P0, P1, P2
- Type: Data, Backend, Frontend, Quality, Discovery
- Put AC-001–AC-009 in Ready and AC-010–AC-015 in Backlog.
