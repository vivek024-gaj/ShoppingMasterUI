import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EurekaService {
  baseUrl = environment.eurekaUri;
constructor(private http: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
getEurekaServerStatus(): Observable<any> {
  return this.http.get(this.baseUrl + '/eureka/status')
  .pipe(retry(1), catchError(this.errorHandl));
}
getEurekaServerApplications(): Observable<any> {
  return this.http.get(this.baseUrl + '/eureka/applications')
  .pipe(retry(1), catchError(this.errorHandl));
}
getEurekaApp(): Observable<any> {
  return this.http.get(this.baseUrl + '/eureka/appInfo').pipe(
    retry(1), catchError(this.errorHandl)
  );
}
getEurekaLastn(): Observable<any> {
  return this.http.get(this.baseUrl + '/eureka/lastn')
  .pipe(retry(1), catchError(this.errorHandl));
}
//
// Error handling
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


