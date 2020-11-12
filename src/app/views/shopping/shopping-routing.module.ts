import { AddComponent } from './product/add/add.component';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Shopping'
    },
    children: [
      {
        path: 'cloud',
        redirectTo: 'cloud'
      },
      {
        path: 'shopping/product',
        component: ProductComponent,
        data: {
          title: 'Product'
        }
      },
      {
        path: 'shopping/product/add',
        component: AddComponent,
        data: {
          title: 'Product'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
