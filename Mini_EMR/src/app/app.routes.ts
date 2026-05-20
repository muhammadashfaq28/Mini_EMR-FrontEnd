import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
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
                loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard').then(m => m.Dashboard)
            },

            {
                path: 'patients',
                loadComponent: () => import('./features/patients/pages/patients/patients').then(m => m.Patients)
            },
            {
                path: 'appointments',
                loadComponent: () => import('./features/appointments/pages/appointments/appointments').then(m => m.Appointments)
            },
            {
                path: 'visits',
                loadComponent: () => import('./features/visits/pages/visits/visits').then(m => m.Visits)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'login'
            }
        ]
    }

];
