/**
 * @description This component handles the user's profile page where they can view and update their profile information, as well as manage their favorite movies.
 * 
 * @module ProfilePageComponent
 * @component
 * @implements OnInit
 * 
 * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
 * @param {Router} router - Service to navigate between routes.
 * @param {DatePipe} datePipe - Service to format dates.
 */
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userData: any = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: [] as string[], // Initialize FavoriteMovies to an empty array
  };
  formUserData: any = {
    Username: '',
    password: '',
    email: '',
  };

  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];
  _id: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    private datePipe: DatePipe // Inject DatePipe
  ) {}

  /**
   * @description Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initializes the component by loading data and fetching movies and user details.
   */
  public ngOnInit(): void {
    this.loadData();
    this.getMovies();
    this.getUser();
  }

  /**
   * @description Fetches all movies and formats them with additional details.
   */
  private getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res.map((movie: any) => ({
        ...movie,
        director: movie.Director.Name,
        image: movie.ImagePath
      }));
    });
  }

  /**
   * @description Loads user data and movies from the API, and formats the user's birthday.
   */
  private loadData(): void {
    const username = localStorage.getItem('Username');
    if (!username) {
      console.error('Username not found in local storage');
      return;
    }

    forkJoin({
      movies: this.fetchApiData.getAllMovies(),
      user: this.fetchApiData.getUser(JSON.parse(username).Username)
    }).subscribe(({ movies, user }) => {
      this.movies = movies.map((movie: any) => ({
        ...movie,
        director: movie.Director.Name,
        image: movie.ImagePath
      }));

      this.userData = user;
      this.userData.Birthday = this.datePipe.transform(this.userData.Birthday, 'yyyy-MM-dd', 'UTC');
    });
  }

  /**
   * @description Filters the list of movies to show only the user's favorite movies.
   */
  private filterFavoriteMovies(): void {
    this.favoriteMovies = this.movies.filter(movie => this.userData.FavoriteMovies.includes(movie._id));
  }

  /**
   * @description Fetches user details from local storage and the API.
   */
  private getUser(): void {
    let storedUser = localStorage.getItem('Username');
    console.log('Stored user:', storedUser);
    if (!storedUser) {
      console.error('No user found in local storage');
      return;
    }

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error('Failed to parse user:', error);
      return;
    }

    if (!user) {
      console.error('User not found in local storage');
      return;
    }

    this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
      this.userData = res;
      this.userData.Birthday = this.datePipe.transform(this.userData.Birthday, 'yyyy-MM-dd', 'UTC');
      if (this.userData.FavoriteMovies) {
        this.filterFavoriteMovies();
      }
    });
  }

  /**
   * @description Removes a movie from the user's list of favorite movies.
   * @param {string} MovieID - The ID of the movie to remove from favorites.
   */
  public deleteFavoriteMovie(MovieID: string): void {
    const movieTitle = this.favoriteMovies.find(movie => movie._id === MovieID)?.Title;
    if (!movieTitle) {
      console.error('Movie not found in favoriteMovies');
      return;
    }

    this.fetchApiData.deleteFavoriteMovie(this.userData.Username, MovieID).subscribe({
      next: (res: any) => {
        this.favoriteMovies = res;
        // Remove the movie from favoriteMovies
        const index = this.userData.FavoriteMovies.indexOf(MovieID);
        if (index > -1) {
          this.userData.FavoriteMovies.splice(index, 1);
        }
        localStorage.setItem('Username', JSON.stringify(this.userData));
        this.filterFavoriteMovies();
        // Log a message when a movie is removed from the favorites
        console.log(`Movie with ID ${MovieID} was removed from the favorites.`);
      },
      error: (err: any) => console.error(err)
    });
  }

  /**
   * @description Resets the user data and navigates to the welcome page.
   */
  public resetUser(): void {
    this.userData = {};
    localStorage.removeItem('Username');
    this.router.navigate(["welcome"]);
  }

  /**
   * @description Updates the user's profile information.
   */
  public updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
      next: (res: any) => {
        this.userData = {
          ...res,
          id: res._id,
          password: this.userData.password,
          token: this.userData.token
        };
        if (typeof this.userData === 'object' && this.userData !== null) {
          localStorage.setItem('Username', JSON.stringify(this.userData));
        }
        this.filterFavoriteMovies();
      },
      error: (err: any) => console.error(err)
    });
  }
}
