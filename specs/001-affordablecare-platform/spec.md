# Feature Specification: AffordableCare Healthcare Access Platform

**Feature Branch**: `001-affordablecare-platform`  
**Created**: 2026-11-05  
**Status**: Draft

## Project Purpose and Target Audience

AffordableCare helps people discover healthcare services, understand basic clinic information, and arrange appointments without scattered sources or phone-only scheduling. It gives healthcare providers a focused way to publish services and manage patient appointments.

The initial audience is patients seeking accessible, lower-cost care and clinic staff responsible for service listings and schedules. The first release does not provide diagnosis, clinical advice, emergency response, insurance adjudication, or payment processing.

## User Scenarios & Testing

### User Story 1 - Discover Healthcare Services (Priority: P1)

As a visitor or patient, I want to browse and filter healthcare services and clinics so that I can identify a suitable care option.

**Independent Test**: A visitor can filter listings, inspect a clinic and service, and understand how to proceed.

**Acceptance Scenarios**:

1. **Given** published services exist, **When** a visitor opens the directory, **Then** results show clinic, service, location, supplied affordability information, and availability.
2. **Given** filters are selected, **When** results update, **Then** only matches appear and selected filters remain visible.
3. **Given** no matches, **When** results update, **Then** an empty state offers to clear filters.

### User Story 2 - Register and Manage a Patient Account (Priority: P1)

As a patient, I want a secure account so that I can book and track appointments.

**Independent Test**: A new patient can register, sign in, update permitted profile fields, and sign out.

**Acceptance Scenarios**:

1. **Given** valid details, **When** registration succeeds, **Then** the patient can access authenticated features.
2. **Given** an invalid or registered email, **When** submitted, **Then** registration is prevented with safe feedback.
3. **Given** valid profile changes, **When** saved, **Then** they persist for later visits.

### User Story 3 - Book an Available Appointment (Priority: P1)

As a patient, I want to choose an available service time so that I can arrange care online.

**Independent Test**: A signed-in patient can confirm an available slot and see it in their appointments.

**Acceptance Scenarios**:

1. **Given** an available future slot, **When** confirmed, **Then** one appointment records clinic, service, date, time, timezone, and status.
2. **Given** the slot becomes unavailable, **When** confirmation is submitted, **Then** no duplicate is created and another time is offered.

### User Story 4 - Manage Patient Appointments (Priority: P1)

As a patient, I want to view, reschedule, and cancel future appointments so that my schedule stays accurate.

**Acceptance Scenarios**:

1. **Given** patient appointments, **When** listed, **Then** upcoming and past items are distinguishable and no other patient's data appears.
2. **Given** an eligible appointment, **When** rescheduled, **Then** the new slot replaces the old reservation atomically.
3. **Given** an eligible appointment, **When** cancellation is confirmed, **Then** its status changes and the slot follows clinic policy.

### User Story 5 - Manage Provider Services (Priority: P1)

As an authorised provider, I want to create, update, publish, and unpublish clinic services so patients receive accurate information.

**Acceptance Scenarios**:

1. **Given** valid service details, **When** published, **Then** the service becomes discoverable for the correct clinic.
2. **Given** an unauthorised clinic, **When** a change is attempted, **Then** access is denied.

### User Story 6 - Manage Provider Appointments (Priority: P1)

As an authorised provider, I want to review appointments and update operational status so the clinic can manage visits.

**Acceptance Scenarios**:

1. **Given** clinic authorisation, **When** the dashboard opens, **Then** appointments can be viewed by date and status.
2. **Given** a valid status transition, **When** applied, **Then** it is saved and visible to the patient.
3. **Given** an invalid transition, **When** attempted, **Then** the appointment remains unchanged.

### Edge Cases

- Two patients attempt to reserve the same slot simultaneously.
- Availability changes while a patient views a slot.
- A clinic or service is unpublished while future appointments exist.
- A patient acts after the rescheduling or cancellation cutoff.
- Times cross timezone or daylight-saving boundaries.
- A user attempts to access another patient's appointment or another clinic's dashboard.

## Requirements

### Functional Requirements

- **FR-001**: Visitors MUST be able to browse published services and clinic details without signing in.
- **FR-002**: The directory MUST support category and location filters that can be cleared.
- **FR-003**: Patients MUST be able to register, sign in, sign out, recover access, and manage permitted profile fields.
- **FR-004**: Patient and provider permissions and resource ownership MUST be enforced for every protected action.
- **FR-005**: Authorised providers MUST be able to create, update, publish, and unpublish their clinic's services.
- **FR-006**: Listings MUST show clinic, category, description, location, availability, and supplied cost information.
- **FR-007**: Providers MUST be able to define bookable, timezone-aware service availability.
- **FR-008**: A signed-in patient MUST be able to book one currently available future slot.
- **FR-009**: No slot MUST hold more than one active appointment.
- **FR-010**: Patients MUST see only their own upcoming and past appointments.
- **FR-011**: Patients MUST be able to reschedule or cancel eligible appointments under a displayed clinic policy.
- **FR-012**: Providers MUST see appointments only for clinics they manage and filter them by date and status.
- **FR-013**: Only valid appointment status transitions MUST be accepted.
- **FR-014**: Appointment displays MUST include date, time, and timezone.
- **FR-015**: Core workflows MUST have clear validation, empty, pending, success, and failure states.
- **FR-016**: The platform MUST state that it does not provide medical advice or emergency services.
- **FR-017**: Unpublishing MUST preserve existing appointment records and prevent new bookings.
- **FR-018**: Sensitive account and appointment information MUST remain absent from public and unauthorised responses.

### Key Entities

- **User**: Identity and contact attributes with patient or provider permissions.
- **Patient Profile**: Patient-managed contact and preference information.
- **Provider Membership**: A provider's authorised clinic relationship and role.
- **Clinic**: Public contact, location, status, and policy information.
- **Service**: A clinic offering with category, description, affordability information, duration, and status.
- **Availability Slot**: A timezone-aware interval that can hold at most one active appointment.
- **Appointment**: A patient's service reservation, status, and lifecycle timestamps.

### Assumptions and Dependencies

- The first release uses email-based accounts and standard recovery.
- Provider authorisation occurs through an administrative process outside the first public release.
- Clinics own the accuracy of their service, cost, policy, and availability information.
- “Affordable” is descriptive clinic-supplied information, not a guarantee or insurance estimate.
- Notifications, payments, insurance verification, telehealth, reviews, and clinical records are out of first-release scope.

## Success Criteria

- **SC-001**: 90% of test participants find a relevant service and reach booking options within 2 minutes unaided.
- **SC-002**: 95% of valid registration and booking attempts succeed during acceptance testing.
- **SC-003**: A patient can book within 5 minutes from a service detail page.
- **SC-004**: Concurrent slot attempts produce no more than one active appointment in 100% of tested races.
- **SC-005**: Permission tests block cross-patient and unauthorised clinic access in 100% of cases.
- **SC-006**: Core workflows work at 320px width and with keyboard-only navigation.
- **SC-007**: 90% of provider test participants can publish a service and locate a day's appointments unaided.
