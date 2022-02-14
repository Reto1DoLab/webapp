import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OffersService } from '../services/offers.service';
import { Offer } from './offer';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  offers: Offer[];
  constructor(private offersService: OffersService) { }

  ngOnInit(): void {
    this.offers = [
      {
          description: "2x3",
          deadline: new Date(1646024400000),
          addPoints: 3,
          subPoints: 1,
          cinemaName: "Cinepolis",
          cinemaSurname: "Hayuelos"
      },
      {
        description: "2x3",
        deadline: new Date(1646024400000),
        addPoints: 3,
        subPoints: 1,
        cinemaName: "Cinepolis",
        cinemaSurname: "Hayuelos"
    },
    {
      description: "2x3",
      deadline: new Date(1646024400000),
      addPoints: 3,
      subPoints: 1,
      cinemaName: "Cinepolis",
      cinemaSurname: "Hayuelos"
  },
  {
    description: "2x3",
    deadline: new Date(1646024400000),
    addPoints: 3,
    subPoints: 1,
    cinemaName: "Cinepolis",
    cinemaSurname: "Hayuelos"
}
  ]
  this.getOffers();
  }
  getOffers(): void {
    this.offersService.getAllOffers().subscribe(
      (response:Offer[]) => {
          this.offers = response;
          //console.log(this.movies);
        },
        (err:HttpErrorResponse) => {
          alert(err.message);
        }
      )
  }
}
