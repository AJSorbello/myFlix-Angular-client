import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { Router } from '@angular/router';

interface User {
  Username: string;
  Password: string;
  Email: string;
  Birthday: Date;
FullName: string;
FavoriteMovies: string[];
}
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],

})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  favorites: any[] = [];
  genre: any = '';
  director: any = '';
  favoriteMovies: any[] = [];
username: string | null = null;

 constructor(
  public fetchApiData: FetchApiDataService,
  public dialog: MatDialog,
  public snackBar: MatSnackBar,
  private router: Router,
) {
  this.toggleFavorite = this.toggleFavorite.bind(this);
}

  ngOnInit(): void {
      this.getMovies();
      this.getUser();
    }

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    this.movies = resp.map((movie: any) => ({
      ...movie,
      heartActive: this.favoriteMovies.includes(movie._id)
    }));
    console.log('Movies array:', this.movies);
  });
}
  // Methods related to fetching data
  getUser(): void {
  let user = localStorage.getItem('User');
  if (!user) {
    console.error('No user found in local storage');
    return;
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(user);
  } catch (error) {
    console.error('Error parsing user data from local storage:', error);
    return;
  }

  const { Username } = parsedUser;
  if (!Username) {
    console.error('No username found in user data');
    return;
  }

  this.fetchApiData.getUser(Username).subscribe((resp: any) => {
    this.user = resp;
    this.favoriteMovies = this.user.FavoriteMovies;
  }, (error: any) => {
    console.error('Error fetching user data:', error);
  });
}
toggleFavorite(movieId: string): void {
  const movieIndex = this.movies.findIndex(movie => movie._id === movieId);
  if (movieIndex < 0) return;  // Movie not found

  const isFavorited = this.favoriteMovies.includes(movieId);

  if (isFavorited) {
    // Movie is currently a favorite, so remove it from favorites
    this.fetchApiData.deleteFavoriteMovie(this.user.Username, movieId).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
      this.movies[movieIndex].heartActive = false;
    }, (error: any) => {
      console.error('Error removing movie from favorites:', error);
    });
  } else {
    // Movie is not currently a favorite, so add it to favorites
    this.fetchApiData.addFavoriteMovie(this.user.Username, movieId).subscribe(() => {
      this.favoriteMovies.push(movieId);
      this.movies[movieIndex].heartActive = true;
    }, (error: any) => {
      console.error('Error adding movie to favorites:', error);
    });
  }
}
  // Methods related to opening modals
  openGenreModal(movie: any): void {
    this.dialog.open(GenreComponent, {
      data: { movie: movie }
    });
  }

  openDirectorModal(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: { movie: movie }
    });
  }

  openSynopsisModal(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: { movie: movie }
    });
  }
    navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}