import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginRequest } from 'src/app/models/login.request.model';
import { JwtResponse } from 'src/app/models/jwt.response';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RegisterRequest } from 'src/app/models/register.model';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url  = ""

  constructor(private http: HttpClient) {
    this.url = environment.url+"/user"
   }

   login_user(body: LoginRequest){
     return this.http.post<JwtResponse>( this.url+"/login", body )
     .pipe(
       catchError(this.handlePromise)
     )
   }

   register_user(body: RegisterRequest){
     return this.http.post<User>(this.url+"/register", body).pipe(
       catchError(this.handlePromise)
     )
   }
   

  private handlePromise(error: HttpErrorResponse) {

    if(error.error instanceof ErrorEvent)
    {
      console.log('error occured',error.error.message)

    }else{
      console.error(`Backend error ${error.status}`, error.error)
      return throwError(
        error.error
      )
    }

    return throwError(
      "something bad happened try again later, "
    )

  }
}
