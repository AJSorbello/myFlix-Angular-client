import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const apiUrl = 'https://ajmovies-fc7e7627ec3d.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post<any>(`${apiUrl}login`, userDetails, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.getHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getOneMovies(title: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/' + title, { headers: this.getHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getDirector(id: string): Observable<any> {
    return this.http
      .get<any>(`${apiUrl}directors/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public getGenre(id: string): Observable<any> {
    return this.http
      .get<any>(`${apiUrl}genres/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public getUser(username: string): Observable<any> {
    return this.http
      .get<any>(`${apiUrl}users/${username}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public getFavouriteMovies(username: string): Observable<any> {
    return this.http
      .get<any>(`${apiUrl}users/${username}/movies`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public addFavouriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .post<any>(`${apiUrl}users/${username}/movies/${movieId}`, {}, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public editUser(username: string, userDetails: any): Observable<any> {
    return this.http
      .put<any>(`${apiUrl}users/${username}`, userDetails, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete<any>(`${apiUrl}users/${username}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  public deleteFavouriteMovie(
    username: string,
    movieId: string
  ): Observable<any> {
    return this.http
      .delete<any>(`${apiUrl}users/${username}/movies/${movieId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
  const body = res;
  return body || {};
}

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(
      `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
    );
    return throwError('Something bad happened; please try again later.');
  }
}