import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GlobalModule } from '../modal/global.module';
import { VmComponent } from './vm.component';
import { VmRoutingModule } from './vm-routing.module';

@NgModule({
  declarations: [
    VmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    GlobalModule,
    VmRoutingModule
  ],
})
export class VmModule { }
