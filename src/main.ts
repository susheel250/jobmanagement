import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { JobsComponent } from './app/pages/jobs/jobs.component';
import { JobDetailComponent } from './app/pages/job-detail/job-detail.component';

bootstrapApplication(AppComponent, {
  providers: [...appConfig.providers],
}).catch(err => console.error(err));