import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }


  logout(){

    localStorage.clear()
    this.authService.signOut()


  }
}
