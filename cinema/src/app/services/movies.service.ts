import { Injectable } from '@angular/core';
import { Movie } from '../home/movie'
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAllMovies(): Observable<Movie[]> {
    console.log(`${this.apiServerUrl}/movies`)
    return this.http.get<Movie[]>(`${this.apiServerUrl}`)
  }
}
