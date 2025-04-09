import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './jobs.component.html',
})
export class JobsComponent implements OnInit {
  http = inject(HttpClient);
  platformId = inject(PLATFORM_ID);
  jobs: any[] = [];

  ngOnInit() {
    // Run only in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token not found. Please login.');
        return;
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get('http://localhost:3000/jobs', { headers }).subscribe({
        next: (res: any) => {
          this.jobs = res;
        },
        error: (err) => {
          console.error('Failed to fetch jobs:', err);
          if (err.status === 401) {
            alert('Unauthorized. Please login again.');
          }
        }
      });
    }
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'completed': return 'green';
      case 'pending': return 'red';
      case 'in progress': return 'orange';
      default: return 'black';
    }
  }

  deleteJob(id: number) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (!token) return;

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      if (confirm('Are you sure you want to delete this job?')) {
        this.http.delete(`http://localhost:3000/jobs/${id}`, { headers }).subscribe(() => {
          this.jobs = this.jobs.filter(job => job.id !== id);
        });
      }
    }
  }
}
