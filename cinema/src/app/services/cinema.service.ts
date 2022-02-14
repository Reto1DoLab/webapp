import { Injectable } from '@angular/core';
import { Movie } from '../home/movie'
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { CreateOfferRequest } from '../create-offer/create.offer.request';
import { Offer } from '../create-offer/offer';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAllOffers(): Observable<Offer[]> {
    
    return this.http.get<Offer[]>(`${this.apiServerUrl}/cinema/get-all-offers`)
  }
  createOffer( body: CreateOfferRequest ): Observable<String> {
    return this.http.post(`${this.apiServerUrl}/cinema/create-offer`, body, {responseType: 'text'});
  }
}