import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticleCardComponent} from "./components/article-card/article-card.component";
import {RouterModule} from "@angular/router";
import { PopupComponent } from './components/popup/popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import { FilterComponent } from './components/filter/filter.component';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [
    ArticleCardComponent,
    PopupComponent,
    FilterComponent,
    LoaderComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ],
  exports: [
    ArticleCardComponent,
    PopupComponent,
    FilterComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
