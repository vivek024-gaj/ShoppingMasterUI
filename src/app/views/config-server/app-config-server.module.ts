import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GlobalModule } from '../modal/global.module';
import { ConfigServerRoutingModule } from './config-server-routing.module';
import { ConfigServerComponent } from './config-server.component';
import { ApplicationComponent } from './application/application.component';
import { LibraryComponent } from './library/library.component';
import { LibrariesPropertiesComponent } from './libraries-properties/libraries-properties.component';
import { ApplicationConfigureComponent } from './application-configure/application-configure.component';

@NgModule({
  declarations: [
    ConfigServerComponent, ApplicationComponent, LibraryComponent, LibrariesPropertiesComponent, ApplicationConfigureComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    GlobalModule,
    ConfigServerRoutingModule
  ],
})
export class AppConfigServerModule { }
