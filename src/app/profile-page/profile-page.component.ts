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
    try {
      user = JSON.parse(localStorage.getItem('user') || '{}');
    } catch (error) {
      console.error('Failed to parse user:', error);
      return;
    }

    if (!user.Username) {
      console.error('User not found in local storage');
      return;
    }

    this.fetchApiData.getUser(user.Username).pipe(
      tap((res: any) => {
        this.userData = res;
        this.getFavoriteMovies();
      })
    ).subscribe({
      error: (err: any) => console.error(err)
    });
  }

getFavoriteMovies(): void {
  this.fetchApiData.getFavoriteMovies(this.userData.Username).subscribe({
    next: (res: any) => this.favoriteMovies = res, 
    error:(err:any) => 
      console.error(err)
    });
}
 deleteFavoriteMovie(movieId: string): void {
  this.fetchApiData.deleteFavoriteMovie(this.userData.Username, movieId).subscribe({
    next: (res: any) => {
      this.favoriteMovies = res;
      // Remove the movie from favoriteMovies
      const index = this.userData.FavoriteMovies.indexOf(movieId);
      if (index > -1) {
        this.userData.FavoriteMovies.splice(index, 1);
      }
      localStorage.setItem('user', JSON.stringify(this.userData));
    },
    error: (err: any) => {
      console.error(err);
    }
  });
}
  resetUser(): void {
    this.userData = {};
    localStorage.removeItem('user');
    this.router.navigate(["welcome"]);
  }
  logout(): void {
  localStorage.removeItem('user');
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
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.getFavoriteMovies();
      },
      error: (err: any) => console.error(err)
    });
  }
}