import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class BaseService<T> {

   private url: string = ""
  headers: HttpHeaders 

  constructor(private http: HttpClient,private endpoint: string) {

    this.url = environment.url+endpoint

    const token = localStorage.getItem('token')

    this.headers = new HttpHeaders({
      "Authorization" : token
    })

   }


   
   protected get httpClient()  {
     return this.http
   }

   protected get urls(){
     return this.url
   }

   
   


   getAll(){
     return this.http.get<T[]>(this.url)
   }

   getById(id: string){

     return this.http.get<T>(this.url+"/"+id, {
       headers: this.headers
     })
     .pipe(
       catchError(this.handlePromise)
     )
   }

   create(body: any){
     return this.http.post<T>(this.url, body,{
       headers : this.headers
     }).pipe(
       catchError(this.handlePromise)
     )
   }

   delete(id: string){
     return this.http.delete(this.url + "/delete/"+id, {
       headers: this.headers
     }).pipe(
       catchError(this.handlePromise)
     )
   }

   protected handlePromise(error: HttpErrorResponse) {

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
