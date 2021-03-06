import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component'
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';


const routes: Routes = [
  { path:"", component: AuthComponent},
  { path: "home", component: HomeComponent},
  { path: "profile", component: ProfileComponent},
  { path: "admin", component: AdminComponent},
  { path: "category", component: CategoryComponent},
  { path: "category/:id", component: CategoryDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
