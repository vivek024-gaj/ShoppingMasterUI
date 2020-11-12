import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Application } from '../model/application';
import { ResponseMessage } from '../model/response-message';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl = environment.configServer;
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getApplicationsList(): Observable<any> {
    return this.http.get(this.baseUrl + '/application/list')
    .pipe(retry(1), catchError(this.errorHandl));
  }

  getApplicationPropertiesById(id): Observable<any> {
    return this.http.get(this.baseUrl + '/application/' + id)
    .pipe(retry(1), catchError(this.errorHandl));
  }
  addApplication(application): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/application/add', JSON.stringify(application), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getApplication(id): Observable<Application> {
    return this.http.get<Application>(this.baseUrl + '/app/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }
 
  // PUT
  updateApplication(id, data): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(this.baseUrl + '/application/' + id + '/update', JSON.stringify(data), this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // DELETE
  deleteAppliction(id) {
    return this.http.delete<ResponseMessage>(this.baseUrl + '/application/' + id + '/delete', this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

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
