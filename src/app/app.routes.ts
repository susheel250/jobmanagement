import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { JobCreateComponent } from './pages/job-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/:id', component: JobDetailComponent }, // Dynamic route for job details
  { path: 'create-job', component: JobCreateComponent },
  {
    path: 'jobs/edit/:id',
    loadComponent: () => import('./pages/edit-job.component').then(m => m.EditJobComponent)
  }
  
  
];
