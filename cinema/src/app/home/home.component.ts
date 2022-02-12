import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MoviesService } from '../services/movies.service';
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
    //this.getMovies()
    this.movies = [
      {
        id: 1,
        name: "Encanto",
        year: 2021,
        description: "Una joven colombiana puede ser la última esperanza para su familia, cuando descubre que la magia que rodea a Encanto, un lugar encantado que bendice a los niños con dones únicos, se encuentra en serio peligro.",
        imageURL: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/PKXVVSH7G5EEPOQJYPSQUEAFDE.jpeg",
        directors: [],
        categorys: [],
        actors: [],
      },
      {
        id: 2,
        name: "Spider-man: No Way Home",
        year: 2021,
        description: "Tras descubrirse la identidad secreta de Peter Parker como Spider-Man, la vida del joven se vuelve una locura. Peter decide pedirle ayuda al Doctor Extraño para recuperar su vida. Pero algo sale mal y provoca una fractura en el multiverso.",
        imageURL: "https://www.cinemascomics.com/wp-content/uploads/2022/01/poster-Spider-man-no-way-home.jpg",
        directors: [],
        categorys: [],
        actors: [],
      },
      {
        id: 3,
        name: "Luca",
        year: 2021,
        description: "Luca es un monstruo marino que vive debajo de un pueblo de la costa italiana. Cuando sale a la superficie, adquiere una apariencia humana, y conoce a un nuevo amigo, igual que él.",
        imageURL: "https://modogeeks.com/wp-content/uploads/2021/04/luca-poster.jpg",
        directors: [],
        categorys: [],
        actors: [],
      },
      {
        id: 4,
        name: "Soul",
        year: 2020,
        description: "Un profesor de música que ha perdido la pasión se transporta fuera de su cuerpo al \"Gran Antes\" y debe encontrar el camino de regreso con la ayuda de un alma infantil que aprende sobre sí misma.",
        imageURL: "https://lumiere-a.akamaihd.net/v1/images/image_5e27f8d3.jpeg?region=0,0,648,972",
        directors: [],
        categorys: [],
        actors: [],
      },
      {
        id: 5,
        name: "Dune",
        year: 2021,
        description: "Arrakis, también denominado \"Dune\", se ha convertido en el planeta más importante del universo. A su alrededor comienza una gigantesca lucha por el poder que culmina en una guerra interestelar.",
        imageURL: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2021/08/dune-2433609.jpg?itok=cCnYTrFm",
        directors: [],
        categorys: [],
        actors: [],
      },
      {
        id: 6,
        name: "The Suicide Squad",
        year: 2021,
        imageURL: "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/5NVN6IJQGVF4RIPHO63NCEMTA4.jpeg",
        description: "Con tal de salir de una prisión infernal, los supervillanos más peligrosos del mundo aceptan una misión del Gobierno: viajar a una remota isla, enemiga de los Estados Unidos y repleta de soldados, para destruir un laboratorio de alta tecnología.",
        directors: [],
        categorys: [],
        actors: [],
      }
    ];
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
