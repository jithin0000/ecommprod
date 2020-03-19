import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Product } from 'src/app/models/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  constructor(http: HttpClient) {
    super(http, "/product")
   }

   filterByName(name: string){
     return this.httpClient.get<Product[]>(this.urls+"/name",{
       params: new HttpParams().set("search", name)
     }).pipe(
       catchError(this.handlePromise)
     )
   }
}
