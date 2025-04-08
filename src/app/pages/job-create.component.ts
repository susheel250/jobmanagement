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
export class JobCreateComponent {
  http = inject(HttpClient);
  router = inject(Router);

  job = {
    title: '',
    company: '',
    date: '',
    status: '',
    description: '',
  };

  submitJob() {
    this.http.post('http://localhost:3000/jobs', this.job).subscribe(() => {
      alert('Job created successfully!');
      this.router.navigate(['/jobs']);
    });
  }
}
