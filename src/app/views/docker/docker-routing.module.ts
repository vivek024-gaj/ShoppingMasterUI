import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DockerComponent } from './docker.component';
import { DockerInfoComponent } from './docker-info/docker-info.component';

const routes: Routes = [
  {

    path: '',
    data: {
      title: 'Docker'
    },
    children: [
      {
        path: 'docker',
        redirectTo: 'docker'
      },
      {
        path: 'dashboard',
        component: DockerComponent,
        data: {
          title: 'Docker Dashboard'
        }
      },
      {
        path: 'docker-info',
        component: DockerInfoComponent,
        data: {
          title: 'Docker'
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DockerRoutingModule { }
