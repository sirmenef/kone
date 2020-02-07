import { ApiService } from './services/api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
    this.apiService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
