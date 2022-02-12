import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterRequestBody } from './register.request';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { 

  }

  ngOnInit(): void {
  }

  register() {
    let body : RegisterRequestBody = {
      name: this.name,
      surname: this.surname,
      username: this.username,
      email: this.email,
      password: this.password,
    };
    this.authService.registerSubscriber(body).subscribe(data => {
        this.router.navigate(['/login'],
        { queryParams: { registered: 'true' } });
      }, error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
  }
  

}
