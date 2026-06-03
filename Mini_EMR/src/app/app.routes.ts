import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/pages/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
import { pendingChangesGuard } from './shared/guards/pending-changes.guard';
export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],

        children: [

            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/pages/dashboard/dashboard')
                        .then(m => m.Dashboard)
            },

            {
                path: 'patients',
                loadComponent: () =>
                    import('./features/patients/pages/patients/patients')
                        .then(m => m.Patients)
            },

            {
                path: 'patients/:id',
                loadComponent: () =>
                    import('./features/patients/pages/patient-detail/patient-detail')
                        .then(m => m.PatientDetail)
            },

            {
                path: 'appointments',
                loadComponent: () =>
                    import('./features/appointments/pages/appointments/appointments')
                        .then(m => m.Appointments)
            },
            {
                path: 'visits/:appointmentId',
                canDeactivate: [pendingChangesGuard],
                loadComponent: () =>
                    import('./features/visits/pages/visits/visits')
                        .then(m => m.Visits)
            },
            {
                path: 'settings',
                loadComponent: () =>
                    import('./features/settings/pages/settings/settings')
                        .then(m => m.SettingsComponent)
            }
        ]
    },

    {
        path: '**',
        redirectTo: 'login'
    }
];