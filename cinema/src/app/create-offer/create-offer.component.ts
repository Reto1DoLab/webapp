import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { CinemaService } from '../services/cinema.service';
import { CreateOfferRequest } from './create.offer.request';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  description: string;
  deadline: Date;
  addPoints: number;
  subPoints: number;
  cinemaUsername: string;


  constructor(
    private cinemaService: CinemaService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.username.subscribe((data: string) => this.cinemaUsername = data);
  }

  createOffer(){
    let username = localStorage.getItem('username')
    let body : CreateOfferRequest = {
      description: this.description,
      deadline: this.deadline,
      addPoints: this.addPoints,
      subPoints: this.subPoints,
      cinemaUsername: username as string,
    };
    console.log(body);
    this.cinemaService.createOffer(body).subscribe(data => {
        this.router.navigate(['/'],);
        this.toastr.success('Offer Created!');
      }, error => {
        console.log(error);
        this.toastr.error('Offer Creation Failed! Please try again');
      });
  }

}
