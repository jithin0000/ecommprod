import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { filter, tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  

  categories$: Observable<Category[]>
  searchTerm$  = new  Subject<String>()
  autoCompleteList$: Observable<Category[]>

  

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {

    this.categories$ = this.categoryService.getAll()
    this.categories$.subscribe(console.log)

   this.autoCompleteList$ =  this.searchTerm$.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap( va => this.categoryService.filterByName(va.toString()))
    )
  }

  searchName(name: HTMLInputElement){
   
    const value = name.value

    this.searchTerm$.next(value)
  }

  ngOnDestroy(): void {
    this.searchTerm$.unsubscribe()
  }

}
