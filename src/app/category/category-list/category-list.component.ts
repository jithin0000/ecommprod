import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {

    this.categories$ = this.categoryService.getAll()
    this.categories$.subscribe(console.log)
  }

}
