import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule],
  templateUrl: './jobs.component.html',
})
export class JobsComponent implements OnInit {
  http = inject(HttpClient);
  jobs: any[] = [];

  ngOnInit() {
    this.http.get('http://localhost:3000/jobs').subscribe((res: any) => {
      this.jobs = res;
    });
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
    if (confirm('Are you sure you want to delete this job?')) {
      this.http.delete(`http://localhost:3000/jobs/${id}`).subscribe(() => {
        this.jobs = this.jobs.filter(job => job.id !== id); // Remove deleted job from UI
      });
    }
  }
  
}
