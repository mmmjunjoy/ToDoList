import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  signup() {
    this.router.navigate(['/signup']);
  }

  gologin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {}
}
