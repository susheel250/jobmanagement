import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // ✅ Add this to enable *ngFor, *ngIf, etc.
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  jobs = [
    {
      id: 1,
      title: 'Install Network Cables',
      status: 'Pending',
      date: '2025-04-08',
      description: 'Setup network cables in office block A.',
    },
    {
      id: 2,
      title: 'Replace Router',
      status: 'Completed',
      date: '2025-04-07',
      description: 'Old router was faulty. Replaced with new model.',
    },
    {
      id: 3,
      title: 'Server Room Cleanup',
      status: 'In Progress',
      date: '2025-04-06',
      description: 'Remove unused wires and label ports.',
    }
  ];

  selectedJob: any = null;

  selectJob(job: any) {
    this.selectedJob = job;
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'red';
      case 'in progress':
        return 'orange';
      default:
        return 'black';
    }
  }
}
