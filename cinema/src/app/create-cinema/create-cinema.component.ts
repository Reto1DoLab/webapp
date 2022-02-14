import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';

import { CreateCinemaRequestBody } from './create-cinema.request';
@Component({
  selector: 'app-create-cinema',
  templateUrl: './create-cinema.component.html',
  styleUrls: ['./create-cinema.component.scss']
})
export class CreateCinemaComponent implements OnInit {

  name: string;
  username: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  web:string;
  address:string;
  constructor(private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  createCinema(){
    let body : CreateCinemaRequestBody = {
      name: this.name,
      surname: this.surname,
      username: this.username,
      email: this.email,
      password: this.password,
      web: this.web,
      address: this.address
    };
    this.adminService.createCinema(body).subscribe(data => {
        this.router.navigate(['/']);
        this.toastr.success('Cinema Created!');
      }, error => {
        console.log(error);
        this.toastr.error('Creation Failed! Please try again');
      });
  }
}
