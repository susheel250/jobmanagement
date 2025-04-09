import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './edit-job.component.html',
})
export class EditJobComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  jobId: string | null = null;

  jobData = {
    title: '',
    company: '',
    date: '',
    status: '',
    description: ''
  };

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');

    const token = localStorage.getItem('token');
    if (!this.jobId || !token) return;

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get(`http://localhost:3000/jobs/${this.jobId}`, { headers }).subscribe({
      next: (data: any) => {
        data.date = formatDateToInput(data.date);  // ✅ Format the date properly

        this.jobData = data;
      },
      error: (err) => {
        console.error('Failed to load job:', err);
        alert('Could not load job details.');
      }
    });
  }

  updateJob() {
    const token = localStorage.getItem('token');
    if (!this.jobId || !token) return;

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.put(`http://localhost:3000/jobs/${this.jobId}`, this.jobData, { headers }).subscribe({
      next: () => {
        alert('Job updated successfully.');
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update job.');
      }
    });
  }
}

function formatDateToInput(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
