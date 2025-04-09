import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './job-create.component.html',
})
export class CreateJobComponent {
  job = {
    title: '',
    company: '',
    date: '',
    status: '',
    description: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  submitJob() {
    const jobData = this.job;

    this.http.post('http://localhost:3000/jobs', jobData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).subscribe({
      next: (res) => {
        alert('Job created successfully!');
        this.router.navigate(['/jobs']);
      },
      error: (err) => {
        alert('Failed to create job. Make sure you are logged in.');
        console.error(err);
      }
    });
  }
}