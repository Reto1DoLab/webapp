import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginRequestBody } from '../login/login.request';
import { LoginResponse } from '../login/login.response';
import { UserInfo } from '../profile/userInfo';
import { RegisterRequestBody } from '../register/register.request';
import { UserInfoUpdateBody } from '../profile/user.profile.update.body'

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiServerUrl = environment.apiBaseUrl;

    @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
    @Output() username: EventEmitter<string> = new EventEmitter();
    @Output() isAdmin: EventEmitter<boolean> = new EventEmitter();
    @Output() isCinema: EventEmitter<boolean> = new EventEmitter();
    @Output() isSubscriber: EventEmitter<boolean> = new EventEmitter();




    refreshTokenPayload = {
        refreshToken: this.getRefreshToken(),
        username: this.getUserName()
    }
    updateProfileInfoBody = {
        refreshToken: this.getRefreshToken(),
        username: this.getUserName(),
        name: "",
        surname: "",
        password: "",
        email: "",
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
                    localStorage.setItem('role', data.role);
                    this.loggedIn.emit(true);
                    this.username.emit(data.username);
                    if (data.role == '[admins]'){
                        this.isAdmin.emit(true);
                    }
                    if (data.role == '[cinema]'){
                        this.isCinema.emit(true);
                    }
                    if (data.role == '[subscriber]'){
                        this.isSubscriber.emit(true);
                    }
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
            this.loggedIn.emit(false);
            this.isAdmin.emit(false);
            this.isCinema.emit(false);
            this.isSubscriber.emit(false);
          }, error => {
            throwError(error);
          })
        localStorage.removeItem('authenticationToken');
        localStorage.removeItem('username');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('role')
      }

    getUserInfo (username:String):Observable<UserInfo>  {
        return this.http.get<UserInfo>(`${this.apiServerUrl}/auth/info/${username}`)
    }

    updateUserInfo (userInfo:UserInfo):Observable<UserInfo> {
        
        this.updateProfileInfoBody.refreshToken = this.getRefreshToken();
        this.updateProfileInfoBody.username = this.getUserName();
        this.updateProfileInfoBody.name = userInfo.name;
        this.updateProfileInfoBody.surname = userInfo.surname;
        this.updateProfileInfoBody.email = userInfo.email;
        this.updateProfileInfoBody.password = userInfo.password;


        return this.http.post<UserInfo>(`${this.apiServerUrl}/auth/update-info`, this.updateProfileInfoBody);

    }

    getJwtToken() {
        return localStorage.getItem('authenticationToken');
    }

    getRole() {
        //localStorage.setItem('role','admin');
        return localStorage.getItem('role');
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