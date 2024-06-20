/**
 * @description This component displays detailed information about a movie director.
 * It fetches data using FetchApiDataService and displays it in a dialog.
 * 
 * @module DirectorInfoComponent
 * @component
 * @implements OnInit
 * 
 * @param {MatDialogRef<DirectorInfoComponent>} dialogRef - Reference to the dialog opened.
 * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
 * @param {any} data - Data passed into the dialog, including the director's name.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss']
})
export class DirectorInfoComponent implements OnInit {
  director: any;

  constructor(
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * @description Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initializes the component by fetching director details.
   */
  ngOnInit(): void {
    this.getOneDirector(this.data.movie.Director.Name);
  }

  /**
   * @description Fetches detailed information about a director from the API.
   * @param {string} directorName - The name of the director to fetch details for.
   */
  getOneDirector(directorName: string): void {
    this.fetchApiData.getOneDirector(directorName).subscribe((resp: any) => {
      this.director = resp;
      console.log('Director Details:', this.director);
    }, (error) => {
      console.error('Error fetching director details:', error);
    });
  }

  /**
   * @description Closes the dialog.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
