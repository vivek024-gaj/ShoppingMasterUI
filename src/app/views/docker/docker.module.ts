import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { GlobalModule } from '../modal/global.module';
import { DockerComponent } from './docker.component';
import { DockerRoutingModule } from './docker-routing.module';
import { DockerInfoComponent } from './docker-info/docker-info.component';


@NgModule({
  declarations: [DockerComponent, DockerInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    GlobalModule,
    DockerRoutingModule
  ],
})
export class DockerModule { }
