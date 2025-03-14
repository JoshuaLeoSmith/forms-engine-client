import { Routes } from '@angular/router';
import { DashboardComponent } from './features/core/components/dashboard/dashboard.component';
import { LandingPageComponent } from './features/landing-page/components/landing-page/landing-page.component';
export const routes: Routes = [
    {
        path:'',
        component: DashboardComponent,
        title: 'Dashboard'
    },
    {
        path:'landing',
        component: LandingPageComponent,
        title: 'Landing Page'
    }
];

