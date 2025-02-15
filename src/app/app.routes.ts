import { Routes } from '@angular/router';
import { DashboardComponent } from './features/core/components/dashboard/dashboard.component';
export const routes: Routes = [
    {
        path:'',
        component: DashboardComponent,
        title: 'Dashboard'
    }
];

