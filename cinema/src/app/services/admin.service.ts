import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import { Observable } from 'rxjs/internal/Observable';
import { environment } from "src/environments/environment";
import { CreateCinemaRequestBody } from "../create-cinema/create-cinema.request";
import { CreateMovieRequest } from "../create-movie/create.movie.request";





@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService,
    ){  
    }


    createCinema( body:CreateCinemaRequestBody ): Observable<String> {
        return this.http.post(`${this.apiServerUrl}/admin/create-cinema`,
                                    body, {responseType: 'text'});
    }

    createMovie( body:CreateMovieRequest ): Observable<String> {
        return this.http.post(`${this.apiServerUrl}/film/save`, body, {responseType: 'text'});
    }




}