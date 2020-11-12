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
export class DockerService {

  baseUrl = environment.dockerUri;
constructor(private http: HttpClient) { }
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

getDockersInfo(): Observable<any> {
  return this.http.get(this.baseUrl + '/get-all-dockerInfo')
  .pipe(retry(1), catchError(this.errorHandl));
}
addDocker(docker): Observable<ResponseMessage> {
  return this.http.post<ResponseMessage>(this.baseUrl + '/docker/add', JSON.stringify(docker), this.httpOptions)
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
