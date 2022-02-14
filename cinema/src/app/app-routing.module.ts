import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCinemaComponent } from './create-cinema/create-cinema.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { CinemaGuard } from './guards/cinema.guard';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from "./register/register.component";
import { CreateOfferComponent } from "./create-offer/create-offer.component";
import { CreateMovieComponent } from "./create-movie/create-movie.component";
import { OffersComponent } from './offers/offers.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "offers", component: OffersComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: "user-profile/:name", component: ProfileComponent, pathMatch: "full", canActivate: [AuthGuard]},
  { path: "create-cinema", component: CreateCinemaComponent, pathMatch: "full", canActivate: [AdminGuard]},
  { path: "create-offer", component: CreateOfferComponent, pathMatch: "full", canActivate: [CinemaGuard]},
  { path: "create-movie", component: CreateMovieComponent, pathMatch: "full", canActivate: [AdminGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
