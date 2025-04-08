import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Add these
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  jobs = [
    {
      id: 1,
      title: 'Install Network Cables',
      company: 'TechWave Solutions',
      date: '2025-04-08',
    },
    {
      id: 2,
      title: 'Replace Router',
      company: 'CoreNet Services',
      date: '2025-04-07',
    },
    {
      id: 3,
      title: 'Server Room Cleanup',
      company: 'SecureStack Pvt Ltd',
      date: '2025-04-06',
    }
  ];
  
}
