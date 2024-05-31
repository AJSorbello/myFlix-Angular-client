import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const apiUrl = 'https://ajmovies-fc7e7627ec3d.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

private getToken(): string {
  const token = localStorage.getItem('token');
  return token ? token : '';
}

private handleError(error: HttpErrorResponse): any {
  console.error('An error occurred:', error);  // log the entire error object
  if (error.error instanceof ErrorEvent) {
    console.error('Client-side error:', error.error.message);
  } else {
    console.error(
      `Server returned code ${error.status}, ` +
      `body was: ${error.error}`
    );
  }
  return throwError('Something bad happened; please try again later.');
}

public userRegistration(userDetails: any): Observable<any> {
  return this.http.post(apiUrl + '/users', userDetails)
    .pipe(map(this.extractResponseData), catchError(this.handleError));
}
public userLogin(userDetails: any): Observable<any> {
   
    return this.http.post(apiUrl + `/login?username=${userDetails.username}&password=${userDetails.password}`, userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + '/movies', {headers: new HttpHeaders(
    {
        Authorization: `Bearer ${this.getToken()}`,
    })}).pipe(
        map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getOneMovies(title: string): Observable<any> {
    return this.http.get(apiUrl + `/movies/${title}`, {headers: new HttpHeaders(
    {
        Authorization: `Bearer ${this.getToken()}`,
    })}).pipe(
        map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getDirector(id: string): Observable<any> {
    return this.http.get(apiUrl + `/directors/${id}`, {headers: new HttpHeaders(
    {
        Authorization: `Bearer ${this.getToken()}`,
    })}).pipe(
        map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getGenre(id: string): Observable<any> {
    return this.http.get(apiUrl + `/genres/${id}`, {headers: new HttpHeaders(
    {
        Authorization: `Bearer ${this.getToken()}`,
    })}).pipe(
        map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + `/users/${username}`, {headers: new HttpHeaders(
    {
        Authorization: `Bearer ${this.getToken()}`,
    })}).pipe(
        map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getUserFavoriteMovies(username: string): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
  });
  return this.http.get(`${apiUrl}/users/${username}/movies`, { headers: headers })
    .pipe(catchError(this.handleError));
}

  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(apiUrl + `/users/${username}/movies/${movieId}`,
    {headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
    })}).pipe(
        map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public editUser(username: string, userDetails: any): Observable<any> {
    return this.http.put(apiUrl + `/users/${username}`, userDetails,
    {headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
    })}).pipe(
        map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + `/users/${username}`,
    {headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
    })}).pipe(
        map(this.extractResponseData), catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }
}