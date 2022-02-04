import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MoviesService } from '../movies.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public movies: Movie[];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMovies()
  }

  getMovies(): void {
    this.moviesService.getAllMovies().subscribe(
      (response:Movie[]) => {
          this.movies = response;
          console.log(this.movies);
        },
        (err:HttpErrorResponse) => {
          alert(err.message);
        }
      )
  }
}
