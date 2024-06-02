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
  const userDataObject = { Username: 'Raymond' }; // replace this with the actual user data
  localStorage.setItem('user', JSON.stringify(userDataObject));
  let userData = localStorage.getItem('user');
  if (userData) {
    try {
      userData = JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data from local storage:', error);
      userData = null;
    }
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
  this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe({
  next: (res: any) => {
    this.userData = {
      ...res,
      id: res._id,
      password: this.userData.password,
      token: this.userData.token
    };
    localStorage.setItem("user", JSON.stringify(this.userData));
    this.getfavoriteMovies();
  },
  error: (err: any) => console.error(err)
});
}
resetUser(): void {
  const userDataString = localStorage.getItem("user");
  if (userDataString && userDataString.trim() !== '') {
    try {
      this.userData = JSON.parse(userDataString.trim());
    } catch (error) {
      console.error('Error parsing user data from local storage:', error);
      this.userData = {};
    }
  } else {
    this.userData = {};
  }
}
  backToMovie(): void {
    this.router.navigate(["movies"]);
  }

getfavoriteMovies(): void {
 this.fetchApiData.getUserFavoriteMovies(this.userData.Username).subscribe({
  next: (res: any) => this.favoriteMovies = res,
  error: (err: any) => console.error(err)
});
}

getUser(): void {
  console.log('getUser method called');
  let user;
  const userDataString = localStorage.getItem("user");
  if (userDataString && userDataString.trim() !== '') {
    try {
      user = JSON.parse(userDataString.trim());
      
    } catch (error) {
      user = {};
    }
  } else {
    user = {};
  }

  if (user && user.Username) {
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
  } else {
    console.error('Username is undefined');
  }
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