# MiniEMR - Frontend

## Tech Stack
- Angular 20, TypeScript 5
- Angular Material, Bootstrap 5
- NgRx 16, RxJS 7

## Project Structure

src/app/
├── core/
│   ├── guards/
│   ├── interceptors/
│   ├── services/
│   ├── models/
│   └── enums/
├── shared/
│   ├── components/
│   ├── directives/
│   ├── pipes/
│   ├── validators/
│   └── utils/
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── patients/
│   ├── appointments/
│   ├── visits/
│   └── medicines/
├── layout/
│   ├── sidebar/
│   ├── navbar/


## Setup
1. Install dependencies:
```bash
npm install -g @angular/cli
npm install
```
2. Update `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7001/api'
};
```
3. Run:
```bash
ng serve
```
- App: `http://localhost:4200`

## Features

### Authentication
- JWT login, auto token attachment, route guards, role-based access

### Dashboard
- Date picker, status filter, 4 stats cards, appointments table, doctor card

### Patients
- Search by name/phone/CNIC, register/edit dialogs, patient detail with visit history

### Appointments
- Book dialog, patient/doctor dropdowns, conflict validation, check-in/cancel

### Visits (NgRx)
- 3-section form (Vitals, Notes, Prescription), shared NgRx state, BMI auto-calc, vitals highlighting, unsaved changes warning

## Custom Directives
```html
<!-- Vitals highlighting -->
<input [appVitalStatus]="'bpSystolic'" [vitalValue]="value">

<!-- Role-based visibility -->
<div *hasRole="'Doctor'">Doctor only</div>
```

## Custom Pipes
| Pipe | Usage |
|------|-------|
| age | `{{ patient.dob \| age }}` |
| bmi | `{{ height \| bmi:weight }}` |
| dateFormat | `{{ date \| dateFormat:'short' }}` |

## Routes
| Path | Guard |
|------|-------|
| /login | None |
| /dashboard | AuthGuard |
| /patients | AuthGuard |
| /patients/:id | AuthGuard |
| /visits/:appointmentId | AuthGuard + RoleGuard |

## Test Accounts
| Username | Password | Role |
|----------|----------|------|
| dr.ahmed | Doctor@123 | Doctor |
| dr.fatima | Doctor@123 | Doctor |
| recep.ali | Recep@123 | Receptionist |
| recep.sara | Recep@123 | Receptionist |



│   └── main-layout/
├── app.routes.ts
└── app.config.ts
