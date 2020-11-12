import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigServerComponent } from './config-server.component';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { LibraryComponent } from './library/library.component';
import { LibrariesPropertiesComponent } from './libraries-properties/libraries-properties.component';
import { ApplicationConfigureComponent } from './application-configure/application-configure.component';



const routes: Routes = [
  {

    path: '',
    data: {
      title: 'Config Server'
    },
    children: [
      {
        path: 'config',
        redirectTo: 'config'
      },
      {
        path: 'dashboard',
        component: ConfigServerComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'application',
        component: ApplicationComponent,
        data: {
          title: 'Application'
        }
      },
      {
        path: 'library',
        component: LibraryComponent,
        data: {
          title: 'Library'
        }
      },
      {
        path: 'library/configure-lib',
        component: LibrariesPropertiesComponent,
        data: {
          title: 'Configure Library'
        }
      },
      {
        path: 'application/configure-app',
        component: ApplicationConfigureComponent,
        data: {
          title: 'Configure Application'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigServerRoutingModule { }
