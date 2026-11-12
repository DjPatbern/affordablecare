# AffordableCare Week 04 Delivery Plan

## Feature ownership

| Owner | Primary responsibility | Week 04 deliverables |
| --- | --- | --- |
| Victor Patrick (`DjPatbern`) | Component architecture, design theme, public frontend | Design tokens, shared shell/primitives, `/`, `/services`, `/services/[serviceId]` UI and responsive states |
| Chioma Asiama (`enyinne`) | Database integrity and appointment backend | PostgreSQL/Prisma schema collaboration, appointment transaction, appointment APIs, authorization tests |
| Preston Machanga (`Press2027`) | Service/clinic API and provider backend | Seed data, public service/clinic queries, provider service and availability APIs |

Ownership indicates the driver, not the only reviewer. Backend owners review shared schemas and migrations together; Victor reviews API response shapes against frontend needs.

## Week 04 issue set

| Issue | Owner | Outcome |
| --- | --- | --- |
| [#16](https://github.com/DjPatbern/affordablecare/issues/16) | Victor | Design tokens and shared application shell |
| [#13](https://github.com/DjPatbern/affordablecare/issues/13) | Victor | Public service directory and clinic/service detail UI |
| [#12](https://github.com/DjPatbern/affordablecare/issues/12) | Victor | Patient booking frontend and conflict states |
| [#15](https://github.com/DjPatbern/affordablecare/issues/15) | Chioma + Preston | PostgreSQL data model, constraints, and initial migration |
| [#14](https://github.com/DjPatbern/affordablecare/issues/14) | Preston | Authentication, sessions, and profile contracts |
| [#17](https://github.com/DjPatbern/affordablecare/issues/17) | Preston | Public service/clinic APIs and seed data |
| [#18](https://github.com/DjPatbern/affordablecare/issues/18) | Chioma | Conflict-safe booking and appointment APIs |

## Dependencies and delivery sequence

1. **Architecture and tokens first:** component names, route list, design tokens, and domain vocabulary are agreed before feature code diverges.
2. **Schema before data fetching:** the Prisma schema and seed contract must land before persistent directory loaders and appointment mutations.
3. **Shared validation before forms/API:** request schemas and response types are agreed before wiring frontend forms.
4. **Read APIs before directory integration:** the service list/detail endpoints unblock removal of frontend fixture data.
5. **Authentication before protected workflows:** patient/provider session and authorization helpers unblock appointments and dashboards.
6. **Booking transaction before booking UI completion:** the server contract for conflicts and validation determines the final confirmation UX.

## Async coordination

- Post a daily GitHub Project update by **6:00 PM Africa/Lagos** with: completed work, next task, and blocker/decision needed.
- Use the assigned GitHub issue as the source of truth; link branches and pull requests to it.
- Raise blocking contract questions in the issue immediately rather than waiting for the next meeting.
- Hold a 20-minute midweek integration check focused on schema/API/frontend contract mismatches.
- Pull requests require one teammate review; schema/auth/booking changes require review from one backend owner.

## Branch and pull-request conventions

- Branches: `feature/<issue-number>-short-name`, `docs/<issue-number>-short-name`, or `fix/<issue-number>-short-name`.
- PR title: `[Issue #NN] Clear outcome`.
- PR description includes acceptance criteria, screenshots for UI changes, tests run, and migration/privacy/accessibility impact.
- Do not combine unrelated frontend and backend issues in one pull request.

## Week 04 completion criteria

- [ ] Project board contains at least eight scoped implementation issues.
- [ ] Week 04 milestone contains the agreed highest-priority work.
- [ ] Every Week 04 issue has one accountable owner.
- [ ] Component architecture and relationship diagrams render in GitHub.
- [ ] Design tokens and responsive rules are documented.
- [ ] Database/API handoff is sufficient for Chioma and Preston to start without guessing contracts.
- [ ] `.github/copilot-instructions.md` reflects the team's current decisions.
