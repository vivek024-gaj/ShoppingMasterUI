import { VmComponent } from './vm.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {

    path: '',
    data: {
      title: 'VM'
    },
    children: [
      {
        path: 'vm',
        redirectTo: 'vm'
      },
      {
        path: 'vm-list',
        component: VmComponent,
        data: {
          title: 'Virtual Machines'
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VmRoutingModule { }
