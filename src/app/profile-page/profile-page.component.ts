import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {
    try {
      this.userData = JSON.parse(localStorage.getItem("user") || "{}");
    } catch (error) {
      console.error('Error parsing user data from local storage:', error);
      this.userData = {};
    }
  }

  ngOnInit(): void {
  if (localStorage.getItem("user")) {
    this.getUser();
  } else {
    this.router.navigate(["welcome"]);
  }
}

updateUser(): void {
  if (!this.userData.Username) {
    this.resetUser();
  }
  this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe((res: any) => {
    this.userData = {
      ...res,
      id: res._id,
      password: this.userData.password,
      token: this.userData.token
    };
    localStorage.setItem("user", JSON.stringify(this.userData));
    this.getfavoriteMovies();
  }, (err: any) => {
    console.error(err)
  })
}
 resetUser(): void {
  try {
    this.userData = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    console.error('Error parsing user data from local storage:', error);
    this.userData = {};
  }
}
  backToMovie(): void {
    this.router.navigate(["movies"]);
  }

getfavoriteMovies(): void {
  this.fetchApiData.getUserFavoriteMovies(this.userData.Username).subscribe((res: any) => {
    this.favoriteMovies = res;
  }, (err: any) => {
    console.error(err);
  });
}

getUser(): void {
  let user;
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    console.error('Error parsing user data from local storage:', error);
    user = {};
  }
  this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
    this.userData = {
      ...res,
      id: res._id,
      password: user.password,
      token: user.token
    };
    localStorage.setItem("user", JSON.stringify(this.userData));
    this.getfavoriteMovies();
  })
}

  removeFromFavorite(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(this.userData.id, movie.title).subscribe((res: any) => {
      this.userData.favoriteMovies = res.favoriteMovies;
      this.getfavoriteMovies();
    }, (err: any) => {
      console.error(err)
    })
  }
  
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }
}