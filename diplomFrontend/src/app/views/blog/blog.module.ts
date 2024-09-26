import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import {BlogComponent} from "./blog/blog.component";
import {SharedModule} from "../../shared/shared.module";
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BlogComponent,
    BlogDetailsComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        BlogRoutingModule,
        ReactiveFormsModule
    ]
})
export class BlogModule { }
