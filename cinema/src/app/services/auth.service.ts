import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable ,Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RegisterRequestBody } from '../register/register.request';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestBody } from '../login/login.request';
import { LoginResponse } from '../login/login.response';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiServerUrl = environment.apiBaseUrl;

    @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
    @Output() username: EventEmitter<string> = new EventEmitter();

    refreshTokenPayload = {
        refreshToken: this.getRefreshToken(),
        username: this.getUserName()
    }

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService,
    ){  
    }

    registerSubscriber( body:RegisterRequestBody ): Observable<String> {
        return this.http.post(`${this.apiServerUrl}/auth/sign-up`,
                                    body, {responseType: 'text'});
    }

    login(loginRequestBody: LoginRequestBody): Observable<boolean> {
        return this.http.post<LoginResponse>(`${this.apiServerUrl}/auth/login`,
                loginRequestBody).pipe(map(data => {
                    localStorage.setItem('authenticationToken', data.authenticationToken);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    var objToString = JSON.stringify(data.expiresAt);
                    localStorage.setItem('expiresAt', objToString);
                    this.loggedIn.emit(true);
                    this.username.emit(data.username);
                    return true;
                }));
    }

    logout() {
        this.refreshTokenPayload.refreshToken = this.getRefreshToken();
        this.refreshTokenPayload.username = this.getUserName();

        this.http.post(`${this.apiServerUrl}/auth/logout`, this.refreshTokenPayload,
          { responseType: 'text' })
          .subscribe(data => {
            console.log(data);
          }, error => {
            throwError(error);
          })
        localStorage.removeItem('authenticationToken');
        localStorage.removeItem('username');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiresAt');
      }



    getJwtToken() {
        return localStorage.getItem('authenticationToken');
    }

    getUserName() {
        return localStorage.getItem('username');
    }
    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }
    
    isLoggedIn(): boolean {
        return this.getJwtToken() != null;
    }
}