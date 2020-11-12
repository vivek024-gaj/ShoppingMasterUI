import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EurekaComponent } from './eureka.component';


const routes: Routes = [
  {

    path: '',
    data: {
      title: 'Eureka'
    },
    children: [
      {
        path: 'eureka',
        redirectTo: 'eureka'
      },
      {
        path: 'status',
        component: EurekaComponent,
        data: {
          title: 'Microservices Dashboard'
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EurekaRoutingModule { }
