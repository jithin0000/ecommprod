import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  logout() {

    localStorage.clear()

    this.authService.authState.subscribe(
      res => {
        if(res !== null)
        {
          this.authService.signOut()
        }
      }
    )

    this.router.navigate(['/'])



  }
}
