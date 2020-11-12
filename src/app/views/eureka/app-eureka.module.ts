import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EurekaComponent } from './eureka.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GlobalModule } from '../modal/global.module';
import { EurekaRoutingModule } from './eureka-routing.module';

@NgModule({
  declarations: [
    EurekaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    GlobalModule,
    EurekaRoutingModule
  ],
})
export class AppEurekaModule { }
