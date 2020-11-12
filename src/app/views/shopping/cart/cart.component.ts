import { AuthenticationService } from './../../../service/authentication.service';
import { CartService } from './../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  currentUser: any;
  cartList: any = {};
  cartCount: any;
  constructor(private cartService: CartService, public authenticationService: AuthenticationService) {

    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      console.log('currentUser', this.currentUser);
      
    });
   }

 

  ngOnInit() {
    this.cartService.getCartListByUser(this.currentUser.id).subscribe((data) => {
      // this.cartList = JSON.stringify(data);
      this.cartList = data;
      console.log('cartList' + this.cartList);
    }, error => {
      console.log('error' + error);
    });
    this.cartService.getCartCountByUser(this.currentUser.id).subscribe((data) => {
      this.cartCount = data;
      console.log('cartList' + this.cartCount);
    }, error => {
      console.log('error' + error);
    });

  }


}
