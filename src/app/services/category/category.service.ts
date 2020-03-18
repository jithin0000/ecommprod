import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Category } from 'src/app/models/category.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {

  constructor(http: HttpClient) {
    super(http, "/category")
   }

   filterByName(name: string){
     return this.httpClient.get<Category[]>(this.urls+"/name",{
       params: new HttpParams()
       .append("search", name)
     }).pipe(
       catchError(this.handlePromise)
     )
   }
}
