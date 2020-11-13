import { ShoppingService } from './../../service/shopping.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  
  productForm: FormGroup;
  // operationMode: string;
  editUserId: any;
  mode: any;
  product: any;
  uploadFile: File = null;

  isSubmitted: boolean = false;
  isSuccess: boolean = false;
  _statusMsg: string;
  constructor(public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.createProductForm();
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      id: [],
      productName: ['', Validators.required],
      productDescription: ['', [Validators.required]],
      price: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  submitForm() {
    for (let controller in this.productForm.controls) {
      this.productForm.get(controller).markAsTouched();
    }
    if (this.productForm.invalid) {
      return;
    }
    if (this.mode == "edit") {
      // this.updateUser();
    } else {
      this.addProduct();
    }
  }

  fileChange(element) {
    this.uploadFile = element.target.files[0];
  }
  addProduct() {
    this.shoppingService.addProduct(this.productForm.value, this.uploadFile).subscribe((res: any) => {
      this.isSubmitted = true;
      if (res) {
        this.isSuccess = res.success;
        if (res.success) {
          this._statusMsg = res.message;
          this.product = {};
          this.mode = "add";
          this.productForm.reset();
          setTimeout(() => {
            this.isSubmitted = false;
            this.isSuccess = false
          }, 4000)

        } else {
          this._statusMsg = res.error;
        }
      }
    }, err => {
      console.log(err);
    })
  }

}
