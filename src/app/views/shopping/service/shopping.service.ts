import { environment } from './../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/product/list').pipe(retry(1), catchError(this.errorHandl));
  }

  addToCart(productId, userId): Observable<any> {
    // const body = { productId: productId, userId: userId };
    let cartView1: FormData = new FormData();
    cartView1.append('productId', productId);
    cartView1.append('userId', userId);
    console.log('productId', cartView1);
let cartView = {cartView1}
    // var body = "productId=" + productId + "&userId=" + userId;
    return this.httpClient.post(this.baseUrl + '/cart/add', {productId,userId}, this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
  }

  addProduct(data, file): Observable<any> {
    let formData: FormData = new FormData;
    if (file) {
      formData.append("file", file);
    }
    formData.append("productDetails", JSON.stringify(data));

    return this.httpClient.post<any>(this.baseUrl +  '/product/add', formData)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }


  errorHandl(error) {
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
