import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/auth/login.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorList: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register_form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    password : ['', [Validators.required]]
  })


  
  public get username_ctrl()  {
    return this.register_form.get('username')
  }
  public get password_ctrl()  {
    return this.register_form.get('password')
  }
  public get firstName_ctrl()  {
    return this.register_form.get('firstName')
  }

  register(){
    if (this.register_form.valid) {
      
     
      const body: RegisterRequest = {
        ...this.register_form.value,
        roles: []

      }

      this.loginService.register_user(body)
      .subscribe( res => {
        alert("registered success fully ")
      },

      error => {
        const errors = Object.keys(error).map(item => error[item]);

        this.errorList = errors
      }
      
      )

    }
  }
}
