import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './job-detail.component.html',
})
export class JobDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  job: any = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`http://localhost:3000/jobs/${id}`).subscribe((res: any) => {
        this.job = res;
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
