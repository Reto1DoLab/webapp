import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn: boolean;
  isCinema: boolean;
  isAdmin: boolean;
  username: string;

  constructor(private authService: AuthService, 
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.isAdmin.subscribe((data: boolean) => this.isAdmin = data);
    this.authService.isCinema.subscribe((data: boolean) => this.isCinema = data);

    
    let username = this.authService.getUserName();
    if (username){
      this.username = username;
    }
  }


  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  goToCreateCinema() {
    this.router.navigateByUrl('/create-cinema');
  }
  goToCreateMovie() {
    this.router.navigateByUrl('/create-movie');
  }
  goToCreateOffer() {
    this.router.navigateByUrl('/create-offer');
  }




  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
    this.toastr.success('Logout Successful');
  }

}
