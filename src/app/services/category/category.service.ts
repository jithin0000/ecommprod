import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Category } from 'src/app/models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {

  constructor(http: HttpClient) {
    super(http, "/category")
   }
}
