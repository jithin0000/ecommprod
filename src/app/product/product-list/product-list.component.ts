import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import {debounceTime, distinctUntilChanged, filter, mergeAll, switchMap, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList$: Observable<Product[]>;
  searchTerm$ = new Subject<string>();

  autoProductList$: Observable<Product[]>;
  deletedMessage = '';

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {

   this.productList$ =  this.productService.getAll();
   this.productList$.subscribe();

   this.autoProductList$ = this.searchTerm$.pipe(
     debounceTime(250),
     distinctUntilChanged(),
     switchMap( v => this.productService.filterByName(v.toString()))
   );

   this.autoProductList$.subscribe();
  }

  searchProductByName(element: HTMLInputElement) {
    this.searchTerm$.next(element.value);

  }

  deleteProduct(id: string) {

    this.productService.delete(id).subscribe(res => {

      this.deletedMessage = res.message;

      this.productList$ =  this.productList$.pipe(
        mergeAll(),
        filter(item => item.id !== id),
        toArray()
      );


    });

  }
}

