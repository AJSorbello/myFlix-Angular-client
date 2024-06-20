/**
 * @import { NgModule } from '@angular/core';
 * @import { RouterModule, Routes } from '@angular/router';
 * @import { ProfilePageComponent } from './profile-page/profile-page.component';
 * @import { MovieCardComponent } from './movie-card/movie-card.component';
 * @import { UserLoginFormComponent } from './user-login-form/user-login-form.component'; // Corrected import statement
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component'; // Corrected import statement

/**
 * The routes for the Angular application.
 */
const routes: Routes = [
  { path: 'movies', component: MovieCardComponent }, // Changed from 'movie' to 'movies'
  { path: 'profile', component: ProfilePageComponent },
  { path: 'login', component: UserLoginFormComponent }, // Route for '/login'
];

/**
 * The main application module, responsible for setting up the application's routes.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
