import { Observable, throwError, forkJoin } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = 'https://ajmovies-fc7e7627ec3d.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  private token: string;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return headers;
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login?' + new URLSearchParams(userDetails), {}, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public getOneMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + 'movies/' + title, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public getOneDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'directors/' + directorName, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public getOneGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + 'genre/' + genreName, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public getUser(username: string): Observable<any> {
  if (!username) {
    throw new Error('Username is required');
  }
  return this.http
    .get(apiUrl + 'users/' + username, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}

  public getFavoriteMovies(username: string): Observable<any> {
    return this.http 
      .get(apiUrl + 'users/' + username + '/movies' , { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
public addFavoriteMovie(username: string, movieId: string, movieTitle: string): Observable<any> {
  return this.http
    .post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}

public deleteFavoriteMovie(username: string, movieId: string, movieTitle: string): Observable<any> {
  return this.http
    .delete(apiUrl + 'users/' + username + '/movies/' + movieId, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}

  public editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .put(apiUrl + 'users/' + user.username, updatedUser, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .delete(apiUrl + 'users/' + user.username, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
}