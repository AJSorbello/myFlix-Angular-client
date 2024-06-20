/**
 * @description This component is responsible for displaying the synopsis of a movie.
 * 
 * @module SynopsisComponent
 * @component
 * @implements OnInit
 * 
 * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
 * @param {MatDialogRef} dialogRef - Reference to the dialog opened.
 * @param {any} data - Data injected into the dialog component.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {
  movie: any;

  constructor(
    public dialogRef: MatDialogRef<SynopsisComponent>,
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * @description Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initializes the component by fetching movie details.
   */
  ngOnInit(): void {
    this.getMovieDetails(this.data.movie.Title);
  }

  /**
   * @description Fetches the details of a specific movie by its title.
   * @param {string} title - The title of the movie to fetch details for.
   */
  getMovieDetails(title: string): void {
    this.fetchApiData.getOneMovie(title).subscribe((resp: any) => {
      this.movie = resp;
      console.log('Movie Details:', this.movie);
    }, (error) => {
      console.error('Error fetching movie details:', error);
    });
  }

  /**
   * @description Closes the dialog.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
