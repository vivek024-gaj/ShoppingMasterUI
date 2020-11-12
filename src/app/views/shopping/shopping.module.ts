import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { GlobalModule } from '../modal/global.module';
import { AddComponent } from './product/add/add.component';


@NgModule({
  declarations: [ProductComponent, AddComponent],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    GlobalModule
  ],
})
export class ShoppingModule { }
