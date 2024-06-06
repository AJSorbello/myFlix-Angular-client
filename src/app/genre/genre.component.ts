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

  ngOnInit(): void {
    this.getGenreDetails(this.data.movie.Genre.Name);
  }

  getGenreDetails(genreName: string): void {
    this.fetchApiData.getOneGenre(genreName).pipe(
      tap((resp: any) => {
        this.genre = resp; // Assign resp to this.genre
        console.log('Genre Details:', this.genre);
      }),
      catchError((error) => {
        console.error('Error fetching genre details:', error);
        return of(null);
      })
    ).subscribe();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}