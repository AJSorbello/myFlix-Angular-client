/**
 * @description This component displays detailed information about a movie genre.
 * It fetches data using FetchApiDataService and displays it in a dialog.
 * 
 * @module GenreComponent
 * @component
 * @implements OnInit
 * 
 * @param {MatDialogRef<GenreComponent>} dialogRef - Reference to the dialog opened.
 * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
 * @param {any} data - Data passed into the dialog, including the genre's name.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  genre: any;

  constructor(
    public dialogRef: MatDialogRef<GenreComponent>,
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * @description Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initializes the component by fetching genre details.
   */
  ngOnInit(): void {
    this.getGenreDetails(this.data.movie.Genre.Name);
  }

  /**
   * @description Fetches detailed information about a genre from the API.
   * @param {string} genreName - The name of the genre to fetch details for.
   */
  getGenreDetails(genreName: string): void {
    this.fetchApiData.getOneGenre(genreName).pipe(
      tap((resp: any) => {
        this.genre = resp; // Assign response to this.genre
        console.log('Genre Details:', this.genre);
      }),
      catchError((error) => {
        console.error('Error fetching genre details:', error);
        return of(null);
      })
    ).subscribe();
  }

  /**
   * @description Closes the dialog.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
