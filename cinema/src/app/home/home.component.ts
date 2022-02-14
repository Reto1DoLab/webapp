import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MoviesService } from '../services/movies.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public movies: Movie[];
  isAdmin: boolean;
  isSubscriber: boolean;
  more: boolean[]=[];

  constructor(private moviesService: MoviesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.movies = [
      {
        title: "Encanto",
        date: new Date(2021),
        description: "Una joven colombiana puede ser la última esperanza para su familia, cuando descubre que la magia que rodea a Encanto, un lugar encantado que bendice a los niños con dones únicos, se encuentra en serio peligro.",
        urlImage: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/PKXVVSH7G5EEPOQJYPSQUEAFDE.jpeg",
      },
      {
        title: "Spider-man: No Way Home",
        date: new Date(2021),
        description: "Tras descubrirse la identidad secreta de Peter Parker como Spider-Man, la vida del joven se vuelve una locura. Peter decide pedirle ayuda al Doctor Extraño para recuperar su vida. Pero algo sale mal y provoca una fractura en el multiverso.",
        urlImage: "https://www.cinemascomics.com/wp-content/uploads/2022/01/poster-Spider-man-no-way-home.jpg",

      },
      {
        title: "Luca",
        date: new Date(2021),
        description: "Luca es un monstruo marino que vive debajo de un pueblo de la costa italiana. Cuando sale a la superficie, adquiere una apariencia humana, y conoce a un nuevo amigo, igual que él.",
        urlImage: "https://modogeeks.com/wp-content/uploads/2021/04/luca-poster.jpg",

      },
      {
        title: "Soul",
        date: new Date(2020),
        description: "Un profesor de música que ha perdido la pasión se transporta fuera de su cuerpo al \"Gran Antes\" y debe encontrar el camino de regreso con la ayuda de un alma infantil que aprende sobre sí misma.",
        urlImage: "https://lumiere-a.akamaihd.net/v1/images/image_5e27f8d3.jpeg?region=0,0,648,972",

      },
      {
        title: "Dune",
        date: new Date(2021),
        description: "Arrakis, también denominado \"Dune\", se ha convertido en el planeta más importante del universo. A su alrededor comienza una gigantesca lucha por el poder que culmina en una guerra interestelar.",
        urlImage: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2021/08/dune-2433609.jpg?itok=cCnYTrFm",

      },
      {
        title: "The Suicide Squad",
        date: new Date(2021),
        urlImage: "https://cloudfront-us-east-1.images.arcpublishing.com/copesa/5NVN6IJQGVF4RIPHO63NCEMTA4.jpeg",
        description: "Con tal de salir de una prisión infernal, los supervillanos más peligrosos del mundo aceptan una misión del Gobierno: viajar a una remota isla, enemiga de los Estados Unidos y repleta de soldados, para destruir un laboratorio de alta tecnología.",

      }
    ];
    this.authService.isAdmin.subscribe((data: boolean) => this.isAdmin = data);
    this.authService.isSubscriber.subscribe((data: boolean) => this.isSubscriber = data);
    console.log(this.isAdmin)

    this.getMovies();
  }

  getMovies(): void {
    this.moviesService.getAllMovies().subscribe(
      (response:Movie[]) => {
          this.movies = response;
          //console.log(this.movies);
        },
        (err:HttpErrorResponse) => {
          alert(err.message);
        }
      )
  }
}
