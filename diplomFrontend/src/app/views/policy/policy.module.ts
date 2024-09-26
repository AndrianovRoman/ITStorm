import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    PolicyRoutingModule
  ]
})
export class PolicyModule { }
