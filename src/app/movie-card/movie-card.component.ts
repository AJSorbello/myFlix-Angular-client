import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input()
  isFromFav: boolean = false;

  movies: any[] = [];
  genre: any = '';
  director: any = '';
  user: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp.map((movie: any) => ({
        ...movie,
        heartActive: false
      }));
      console.log('Movies array:', this.movies);
    });
  }

 getFavorites(): void {
  let user = localStorage.getItem('user');
  if (user) {
    try {
      let parsedUser = JSON.parse(user);
      this.favoriteMovies = parsedUser.favoriteMovies;
    } catch (error) {
      console.error('Error parsing user data from local storage:', error);
      this.favoriteMovies = [];
    }
  }
}

  toggleHeart(movie: any): void {
    movie.heartActive = !movie.heartActive;
  }

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

  isFav(movie: any): boolean {
    return this.favoriteMovies.includes(movie.title);
  }

  toggleFav(movie: any): void {
    console.log('toggleFav called with movie:', movie);
    const isFavorite = this.isFav(movie);
    console.log('isFavorite:', isFavorite);
    isFavorite ? this.deleteFavMovies(movie) : this.addFavMovies(movie);
  }

  addFavMovies(movie: any): void {
    let user = localStorage.getItem('user');

    if (user) {
      let parsedUser = JSON.parse(user);
      console.log('user:', parsedUser);
      console.log(user);

      this.fetchApiData
        .addFavoriteMovie(movie.title, parsedUser.username)
        .subscribe((resp: any) => {
          console.log('server response:', resp);
          localStorage.setItem('user', JSON.stringify(resp));
          this.favoriteMovies.push(movie.title);
          console.log(this.favoriteMovies);
          this.snackBar.open(
            `${movie.title} has been added to your favorites`,
            'OK',
            {
              duration: 3000,
            }
          );
        });
    }
  }
navigateToProfile(): void {
  console.log('Navigating to profile page');
}
  deleteFavMovies(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      this.fetchApiData
        .deleteFavoriteMovie(movie.title, parsedUser.username)
        .subscribe((resp) => {
          localStorage.setItem('user', JSON.stringify(resp));
          this.favoriteMovies = this.favoriteMovies.filter(
            (title) => title !== movie.title
          );
          this.snackBar.open(
            `${movie.title} has been removed from your favorites`,
            'OK',
            {
              duration: 3000,
            }
          );
        });
    }
  }
}