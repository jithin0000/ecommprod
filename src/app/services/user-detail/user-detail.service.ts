import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService extends BaseService<User> {

  constructor(
    http: HttpClient
  ) { 
    super(http, "/detail")
  }

  getUserDetails(){
    return this.httpClient.get<User>(this.urls+"/me",{
      headers: this.headers
    })
    .pipe(
      catchError(this.handlePromise)
    )
  }
}
