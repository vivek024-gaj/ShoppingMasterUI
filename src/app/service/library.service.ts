import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Application } from '../model/application';
import { ResponseMessage } from '../model/response-message';
import { Libraries } from '../model/libraries';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  baseUrl = environment.configServer;
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  

  getAllLibs(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin' + ':' + 'vivek@123') });
    return this.http.get(this.baseUrl + '/lib-list')
    .pipe(retry(1), catchError(this.errorHandl));
  }

  getLibrariesPropertiesById(id): Observable<any> {
    return this.http.get(this.baseUrl + '/libraries/' + id)
    .pipe(retry(1), catchError(this.errorHandl));
  }
  addLibrary(application): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/libraries/add', JSON.stringify(application), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getLibrary(id): Observable<Libraries> {
    return this.http.get<Application>(this.baseUrl + '/libraries/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }
 
  // PUT
  updateLibraries(id, data): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(this.baseUrl + '/libraries/' + id + '/update', JSON.stringify(data), this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // DELETE
  deleteLibraries(id) {
    return this.http.delete<ResponseMessage>(this.baseUrl + '/libraries/' + id + '/delete', this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
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
