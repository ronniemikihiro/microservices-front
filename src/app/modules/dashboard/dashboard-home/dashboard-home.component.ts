import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getUserAuthenticated();
    this.titleService.setTitle('Dashborad - Home');
  }
}
