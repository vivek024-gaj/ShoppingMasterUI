import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Application } from '../model/application';
import { ResponseMessage } from '../model/response-message';
import { LibrariesProperties } from '../model/libraries-properties';

@Injectable({
  providedIn: 'root'
})
export class LibraryPropertiesService {

  baseUrl = environment.configServer;
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  getAllProLibs(): Observable<any> {
    return this.http.get(this.baseUrl + '/libraries/list')
    .pipe(retry(1), catchError(this.errorHandl));
  }

  getLibrariesPropertiesById(id): Observable<any> {
    return this.http.get(this.baseUrl + '/libraries/properties/' + id)
    .pipe(retry(1), catchError(this.errorHandl));
  }
  addPropertyLibrary(proLib): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/libraries/properties/add', JSON.stringify(proLib), this.httpOptions)
    .pipe(retry(1), catchError(this.errorHandl));
  }
  getLibraryProperties(id): Observable<LibrariesProperties> {
    return this.http.get<LibrariesProperties>(this.baseUrl + '/libraries/properties/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }
 
  // PUT
  updateLibraries(id, data): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(this.baseUrl + '/libraries/properties/' + id + '/update', JSON.stringify(data), this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  // DELETE
  deleteLibraries(id) {
    return this.http.delete<ResponseMessage>(this.baseUrl + '/libraries/properties/' + id + '/delete', this.httpOptions)
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
