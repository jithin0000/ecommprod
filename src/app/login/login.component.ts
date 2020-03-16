import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorList: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  login_form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]]
  })


  
  public get username_ctrl()  {
    return this.login_form.get('username')
  }
  public get password_ctrl()  {
    return this.login_form.get('password')
  }

  login(){
    if (this.login_form.valid) {
      
      this.loginService.login_user(this.login_form.value)
      .subscribe( res => {

        
        localStorage.setItem('token', res.token)
      },

      error => {
        const errors = Object.keys(error).map(item => error[item]);

        this.errorList = errors
      }
      
      )

    }
  }
  

}
