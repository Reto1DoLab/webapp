import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;
  public username: String;
  public password: String;

  constructor(private http: HttpClient) { }

  authenticationService(username: String, password: String): Observable<any>{
    return this.http.get<any>(`{this.apiServerUrl}/v1/basicauth`)
  }

}
