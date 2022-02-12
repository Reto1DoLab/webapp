import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginRequestBody } from './login.request';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  isError: boolean;
  registerSuccessMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params["registered"] !== undefined && params["registered"] === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  login() {
    let body : LoginRequestBody = {
      username: this.username,
      password: this.password,
    };
    this.authService.login(body).subscribe(data => {
      this.isError = false;
      this.router.navigateByUrl('/');
      this.toastr.success('Login Successful');
    }, error => {
      console.log(error);
      this.isError = true;
      throwError(error);
    });
  }



}
