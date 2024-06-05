import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}

  ngOnInit(): void {
  this.getUser(); 
}
getUser(): void {
  let user;
  let storedUser = localStorage.getItem('user');
  console.log('Stored user:', storedUser);
  try {
    user = JSON.parse(storedUser || '{}');
  } catch (error) {
    console.error('Failed to parse user:', error);
    return;
  }
  if (!user.Username) {
    console.error('User not found in local storage');
    return;
  }

  this.fetchApiData.getUser(user.Username).subscribe({
    next: (res: any) => {
      this.userData = res;
      this.getFavoriteMovies();
    },
    error: (err: any) => console.error(err)
  });
}

getFavoriteMovies(): void {
  this.fetchApiData.getFavoriteMovies(this.userData.Username).subscribe({
    next: (movies: any[]) => this.favoriteMovies = movies,
    error: (err: any) => console.error(err)
  });
}
deleteFavoriteMovie(movieId: string): void {
  const movieTitle = this.favoriteMovies.find(movie => movie._id === movieId)?.Title;
  if (!movieTitle) {
    console.error('Movie not found in favoriteMovies');
    return;
  }

  this.fetchApiData.deleteFavoriteMovie(this.userData.Username, movieId, movieTitle).subscribe({
    next: (res: any) => {
      this.favoriteMovies = res;
      // Remove the movie from favoriteMovies
      const index = this.userData.FavoriteMovies.indexOf(movieId);
      if (index > -1) {
        this.userData.FavoriteMovies.splice(index, 1);
      }
      localStorage.setItem('username', JSON.stringify(this.userData));
    },
    error: (err: any) => console.error(err)
  });
}
  resetUser(): void {
    this.userData = {};
    localStorage.removeItem('username');
    this.router.navigate(["welcome"]);
  }
  logout(): void {
  localStorage.removeItem('username');
  this.router.navigate(["welcome"]);
}

  backToMovie(): void {
    this.router.navigate(["movie"]);
  }

updateUser(): void {
  this.fetchApiData.editUser(this.userData).subscribe({
    next: (res: any) => {
      this.userData = {
        ...res,
        id: res._id,
        password: this.userData.password,
        token: this.userData.token
      };
      if (typeof this.userData === 'object' && this.userData !== null) {
        localStorage.setItem('user', JSON.stringify(this.userData));
      }
      this.getFavoriteMovies();
    },
    error: (err: any) => console.error(err)
  });
}}