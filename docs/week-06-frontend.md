# Week 06 frontend handoff

## Authentication

Use the first-party email and password flow proposed in #14 and PR #21. The provider is AffordableCare’s own backend. Victor owns the browser integration, and the backend owner confirms the contract before it is wired.

- Login submits credentials to `POST /api/auth/login`. Show pending and accessible error states and use a validated same-origin return path to resume booking.
- Read session state through `GET /api/auth/me`. The backend issues an HTTP-only signed session cookie with a seven-day lifetime, SameSite=Lax, and Secure in production. Protected operations check the session on the server.
- Logout calls `POST /api/auth/logout`, clears session-dependent UI, and returns to a public page. An expired session follows the signed-out flow. Keep credentials and tokens out of browser storage and logs.

## Frontend carryover

- Public directory and service details (#13) still read fixtures. Connect them to the published directory contract in #17 once the backend build and API are available.
- Booking (#12) still previews slot selection. Connect login, restore the selected service after sign-in, and handle pending, expired slot, and confirmed booking states after #14 and #18 are available.
- Add route-specific titles and descriptions as clinic details, registration, profile, appointments, and provider screens land. Public routes can use the shared Open Graph pattern. Keep account screens out of search indexes. Enable indexing on service listings and details when they switch to published clinic data.

The frontend PR is #20. The proposed Week 06 target for Victor’s carryover is December 2, 2026, subject to backend availability.
