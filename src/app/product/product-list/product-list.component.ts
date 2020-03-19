import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList$: Observable<Product[]>
  searchTerm$ = new Subject<String>()

  autoProductList$ :  Observable<Product[]>

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {

   this.productList$ =  this.productService.getAll()
   this.productList$.subscribe()

   this.autoProductList$ = this.searchTerm$.pipe(
     debounceTime(250),
     distinctUntilChanged(),
     switchMap( v => this.productService.filterByName(v.toString()))
   )
   
   this.autoProductList$.subscribe()
  }

  searchProductByName(element: HTMLInputElement){
    this.searchTerm$.next(element.value)

  }

}
