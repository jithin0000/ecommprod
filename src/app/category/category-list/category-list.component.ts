import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Observable, Subject, combineLatest, concat, merge } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { filter, tap, distinctUntilChanged, debounceTime, switchMap, take, mergeAll, toArray, map, combineAll } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  

  categories$: Observable<Category[]>
  filteredCategories$: Observable<Category[]>
  searchTerm$  = new  Subject<String>()
  autoCompleteList$: Observable<Category[]>

  

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  category_form = this.formBuilder.group({
    name: ['', [Validators.required]]
  })

  
  public get name_ctrl()  {
    return this.category_form.get('name')
  }
  

  ngOnInit(): void {

    this.categories$ = this.categoryService.getAll()

    this.filteredCategories$ = this.categories$.pipe(
      mergeAll(),
      // take(10),
      toArray()
      )

    this.filteredCategories$.subscribe()

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


  addCategory(){

    if (this.category_form.value) {
      

      const data$ = this.categoryService.create(this.category_form.value)

      this.filteredCategories$ = merge(
        data$, 
        this.filteredCategories$.pipe(mergeAll())
        ).pipe(toArray())
      
    }
  }

  ngOnDestroy(): void {
    this.searchTerm$.unsubscribe()
  }

  delete(id){
    this.categoryService.delete(id)
    .subscribe(res => {
   this.filteredCategories$ =    this.categories$.pipe(
        mergeAll(),
        filter( item => item.id !== id),
        toArray()
      )


    })
  }

  

}
