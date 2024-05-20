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

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post<any>(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getOneMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get<any>(`${apiUrl}movies/${id}`)
      .pipe(catchError(this.handleError));
  }

  public getDirector(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get<any>(`${apiUrl}directors/${id}`)
      .pipe(catchError(this.handleError));
  }

  public getGenre(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get<any>(`${apiUrl}genres/${id}`)
      .pipe(catchError(this.handleError));
  }

  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get<any>(`${apiUrl}users/${username}`)
      .pipe(catchError(this.handleError));
  }

  public getFavouriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get<any>(`${apiUrl}users/${username}/movies`)
      .pipe(catchError(this.handleError));
  }

  public addFavouriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .post<any>(`${apiUrl}users/${username}/movies/${movieId}`, {})
      .pipe(catchError(this.handleError));
  }

  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .put<any>(`${apiUrl}users/${username}`, userDetails)
      .pipe(catchError(this.handleError));
  }

  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .delete<any>(`${apiUrl}users/${username}`)
      .pipe(catchError(this.handleError));
  }

  public deleteFavouriteMovie(
    username: string,
    movieId: string
  ): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .delete<any>(`${apiUrl}users/${username}/movies/${movieId}`)
      .pipe(catchError(this.handleError));
  }

  private extractResponseData(res: Response): any {
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
