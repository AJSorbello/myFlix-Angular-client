/**
 * @description This component displays a list of movie cards with options to view genre, director, and synopsis details.
 * Users can also toggle their favorite movies.
 * 
 * @module MovieCardComponent
 * @component
 * @implements OnInit
 * 
 * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
 * @param {MatDialog} dialog - Service to open modal dialogs.
 * @param {MatSnackBar} snackBar - Service to display snack-bar notifications.
 * @param {Router} router - Service to navigate between routes.
 */
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
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
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
    private router: Router
  ) {
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  /**
   * @description Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initializes the component by fetching user details.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * @description Fetches all movies and marks favorite movies as active.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp.map((movie: any) => ({
        ...movie,
        heartActive: this.favoriteMovies.includes(movie._id)
      }));
      console.log('Movies array:', this.movies);
    });
  }

  /**
   * @description Fetches user details from local storage and then fetches the user data from the API.
   */
  getUser(): void {
    let user = localStorage.getItem('Username');
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
      // Call getMovies after the user data is loaded
      this.getMovies();
    }, (error: any) => {
      console.error('Error fetching user data:', error);
    });
  }

  /**
   * @description Toggles a movie between favorite and non-favorite.
   * @param {string} movieId - The ID of the movie to toggle.
   */
  toggleFavorite(movieId: string): void {
    const movieIndex = this.movies.findIndex(movie => movie._id === movieId);
    if (movieIndex < 0) return;  // Movie not found

    const isFavorited = this.favoriteMovies.includes(movieId);

    if (isFavorited) {
      // Movie is currently a favorite, so remove it from favorites
      this.fetchApiData.deleteFavoriteMovie(this.user.Username, movieId).subscribe(() => {
        console.log(`Removed movie with ID ${movieId} from favorites`);
        this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
        this.movies[movieIndex].heartActive = false;
      }, (error: any) => {
        console.error('Error removing movie from favorites:', error);
      });
    } else {
      // Movie is not currently a favorite, so add it to favorites
      this.fetchApiData.addFavoriteMovie(this.user.Username, movieId).subscribe(() => {
        console.log(`Added movie with ID ${movieId} to favorites`);
        this.favoriteMovies.push(movieId);
        this.movies[movieIndex].heartActive = true;
      }, (error: any) => {
        console.error('Error adding movie to favorites:', error);
      });
    }
  }

  /**
   * @description Opens a modal dialog to display genre details of a movie.
   * @param {any} movie - The movie object whose genre details are to be displayed.
   */
  openGenreModal(movie: any): void {
    this.dialog.open(GenreComponent, {
      data: { movie: movie }
    });
  }

  /**
   * @description Opens a modal dialog to display director details of a movie.
   * @param {any} movie - The movie object whose director details are to be displayed.
   */
  openDirectorModal(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: { movie: movie }
    });
  }

  /**
   * @description Opens a modal dialog to display synopsis of a movie.
   * @param {any} movie - The movie object whose synopsis is to be displayed.
   */
  openSynopsisModal(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: { movie: movie }
    });
  }
}
