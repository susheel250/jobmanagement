import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './job-detail.component.html',
})
export class JobDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  job: any = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Route ID:', id);
  
    if (id) {
      this.http.get(`http://localhost:3000/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).subscribe({
        next: (res: any) => {
          console.log('Job response:', res);
          this.job = res;
        },
        error: (err) => {
          console.error('Failed to load job:', err);
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
}
