import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userData: any = {
    Username: '',
    password: '',
    email: '',
    birthDate: '',
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
    public router: Router
  ) {}

  public ngOnInit(): void {
    this.getUser(); 
  }

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
      if (this.userData.favoriteMovies) {
        this.getFavoriteMovies(this.userData.favoriteMovies);
      }
    });
  }
private getFavoriteMovies(favoriteMovies: string[]): void {
  this.favoriteMovies = [];
  favoriteMovies.forEach(movieTitle => {
    this.fetchApiData.getOneMovie(movieTitle).subscribe((movie: any) => {
      this.favoriteMovies.push(movie);
    });
  });
}

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
        this.refreshFavoriteMovies();
      },
      error: (err: any) => console.error(err)
    });
  }

  public resetUser(): void {
    this.userData = {};
    localStorage.removeItem('Username');
    this.router.navigate(["welcome"]);
  }

  public logout(): void {
    localStorage.removeItem('Username');
    this.router.navigate(['welcome']);
  }

  public backToMovie(): void {
    this.router.navigate(["movie"]);
  }

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
        this.refreshFavoriteMovies();
      },
      error: (err: any) => console.error(err)
    });
  }

  private refreshFavoriteMovies(): void {
    this.fetchApiData.getUser(this.userData.Username).subscribe((res: any) => {
      this.userData = res;
      if (this.userData.favoriteMovies) {
        this.getFavoriteMovies(this.userData.favoriteMovies);
      }
    });
  }
}