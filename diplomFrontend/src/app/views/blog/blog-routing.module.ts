import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogComponent} from "./blog/blog.component";
import {BlogDetailsComponent} from "./blog-details/blog-details.component";

const routes: Routes = [
  {path: 'articles', component: BlogComponent},
  {path: 'articles/:url', component: BlogDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
