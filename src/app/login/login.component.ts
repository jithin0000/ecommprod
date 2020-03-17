import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/auth/login.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { RegisterRequest } from '../models/register.model';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { SocialLoginRequest } from '../models/social.login.request';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorList: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    const token = localStorage.getItem('token')

    if (token === null) {

      this.authService.authState.subscribe(
        res => {
          if (res !== null) {


            if (res.provider === FacebookLoginProvider.PROVIDER_ID) {

              const body: SocialLoginRequest ={
                provider: FacebookLoginProvider.PROVIDER_ID,
                facebookRequest:{
                  facebookAccessToken : res.id,
                  facebookUserId : res.id,
                  fbEmail: res.email,
                  fbProfilePicture: res.photoUrl,
                  fbUsername: res.firstName + res.lastName
                }
              }

              this.social_login(body)
            


              

            } else if (res.provider === GoogleLoginProvider.PROVIDER_ID) {

              const body: SocialLoginRequest = { 
                provider: GoogleLoginProvider.PROVIDER_ID,
                googleAuthToken: res.idToken
               }

              this.social_login(body);

            }



          }
        }
      )
    }
  }

  login_form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })



  private social_login(body: SocialLoginRequest) {
    this.loginService.social_login_user(body)
      .subscribe(res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      }, error => {
        const errors = Object.keys(error).map(item => error[item]);
        this.errorList = errors;
      });
  }

  public get username_ctrl() {
    return this.login_form.get('username')
  }
  public get password_ctrl() {
    return this.login_form.get('password')
  }

  login() {
    if (this.login_form.valid) {

      this.loginService.login_user(this.login_form.value)
        .subscribe(res => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/home'])
        },

          error => {
            const errors = Object.keys(error).map(item => error[item]);

            this.errorList = errors
          }

        )

    }
  }

  signInWithGoogle() {

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)

  }

  signInWithFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }


}
