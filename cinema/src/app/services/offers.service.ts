import { Injectable } from '@angular/core';
import { Movie } from '../home/movie'
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Offer } from '../offers/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAllOffers(): Observable<Offer[]> {
    console.log(`${this.apiServerUrl}/offer/show`)
    return this.http.get<Offer[]>(`${this.apiServerUrl}/offer/show`)
  }
}
