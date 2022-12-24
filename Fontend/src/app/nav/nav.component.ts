import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  public user: string; 
  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.getUser().type;
  }

  ngOnInit(): void {
  }

}
