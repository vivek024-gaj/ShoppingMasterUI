import { ShoppingService } from './service/shopping.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  currentUser: any;


  constructor(private shoppingService: ShoppingService, public authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      console.log('currentUser', this.currentUser);
    });
  }

  productList: any;
  ngOnInit() {
    this.loadProductList();
    // this.addToCart();
  }

  loadProductList() {
      this.shoppingService.getProductList().subscribe((res) => {
        this.productList = res;
        console.log('product list ', this.productList);

      }, error => {
        console.log('error', error);
      });
  }

  addToCart(productId) {
    this.shoppingService.addToCart(productId, this.currentUser.id).subscribe((data) => {
  console.log('res', data);
    })
  }

}
