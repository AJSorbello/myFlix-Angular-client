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

  ngOnInit(): void {
    this.getOneDirector(this.data.movie.Director.Name);
  }

  getOneDirector(directorName: string): void {
    this.fetchApiData.getOneDirector(directorName).subscribe((resp: any) => {
      this.director = resp;
      console.log('Director Details:', this.director);
    }, (error) => {
      console.error('Error fetching director details:', error);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
} 