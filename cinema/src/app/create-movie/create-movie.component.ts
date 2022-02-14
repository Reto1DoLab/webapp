import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { CreateMovieRequest } from './create.movie.request';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {



  title: string;
  description: string;
  date: Date;
  urlImage: string;
  

  constructor(private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  createMovie() {
    let body : CreateMovieRequest = {
      title: this.title,
      description: this.description,
      date: this.date,
      urlImage: this.urlImage,
    };
    this.adminService.createMovie(body).subscribe(data => {
        this.router.navigate(['/'],);
        this.toastr.success('Movie Created!');
      }, error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
  }
}
