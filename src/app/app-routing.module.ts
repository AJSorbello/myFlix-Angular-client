import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component'; // Corrected import statement

const routes: Routes = [
  { path: 'movies', component: MovieCardComponent }, // Changed from 'movie' to 'movies'
  { path: 'profile', component: ProfilePageComponent },
  { path: 'login', component: UserLoginFormComponent }, // Route for '/login'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}