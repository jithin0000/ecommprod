import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  is_user_authenticated = false

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    const token = localStorage.getItem('token')

    if (token !== null) {
      this.is_user_authenticated = true
    }else{
      this.is_user_authenticated = false
    }
    
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
