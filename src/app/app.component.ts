import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ import this

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // ✅ add here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
