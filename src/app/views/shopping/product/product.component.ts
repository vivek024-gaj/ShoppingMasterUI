import { ShoppingService } from './../service/shopping.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationModalComponent } from '../../modal/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  @ViewChild('confirmModal', { static: false }) public confirmModal: ConfirmationModalComponent;

  
  productList: any = [];
  isSubmitted: boolean = false;
  isSuccess: boolean = false;
  _statusMsg: string;
  showEditUserForm: boolean;
  product: any;
  mode: string = "add";
  showAddUserForm: boolean;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    return this.shoppingService.getProductList().subscribe((res) =>{
      this.productList = res;
      console.log('product list', this.productList);
      
    }, error => {
      console.log('error', error);
      
    })
  }

}
