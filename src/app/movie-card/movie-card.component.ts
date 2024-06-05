import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { Router } from '@angular/router';

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
        heartActive: false
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
toggleFavorite(movie: any): void {
  try {
    movie.isFavorite = !movie.isFavorite;
    movie.heartActive = movie.isFavorite; 

    let user = localStorage.getItem('User');
    if (!user) {
      console.error('No user found');
      return;
    }

    let parsedUser = JSON.parse(user);
    let Username = parsedUser.Username;

    if (movie.isFavorite) {
      this.fetchApiData.addFavoriteMovie(Username, movie._id, movie.Title).subscribe(() => {
        console.log(`Added ${movie.Title} to favorites`);
      }, (error: any) => {
        console.error('Error adding favorite movie:', error);
      });
    } else {
      this.fetchApiData.deleteFavoriteMovie(Username, movie._id, movie.Title).subscribe(() => {
        console.log(`Removed ${movie.Title} from favorites`);
      }, (error: any) => {
        console.error('Error deleting favorite movie:', error);
      });
    }
  } catch (error) {
    console.error('Error in toggleFavorite:', error);
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