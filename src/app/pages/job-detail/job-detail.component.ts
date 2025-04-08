import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
})
export class JobDetailComponent implements OnInit {
  jobId: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
  }
}
