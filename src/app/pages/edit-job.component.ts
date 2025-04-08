import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit-job.component.html',
})
export class EditJobComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  router = inject(Router);

  jobId!: number;
  job: any = {
    title: '',
    company: '',
    date: '',
    status: '',
    description: ''
  };



  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:3000/jobs/${jobId}`).subscribe((job: any) => {
      job.date = formatDateToInput(job.date);  // ✅ Format the date properly
      this.job = job;
    });
  }
  
  
  
  

  updateJob() {
  const jobId = this.route.snapshot.paramMap.get('id');
  this.http.put(`http://localhost:3000/jobs/${jobId}`, this.job)
    .subscribe(() => {
      this.router.navigate(['/jobs']);
      alert('Job updated successfully!');
      
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

