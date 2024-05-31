import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { GenreComponent } from '../genre/genre.component'; // Import your GenreModalComponent
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { SynopsisComponent } from '../synopsis/synopsis.component'; // Import your SynopsisModalComponent

interface Movie {
  Title: string;
  Director: {
    Name: string;
  };
  ImagePath: string;
  heartActive: boolean;
}

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: Movie[] = [];

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog) { } // Inject MatDialog

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      console.log('Response from getAllMovies:', resp);
      this.movies = resp.map((movie: any) => ({
        ...movie,
        heartActive: false
      }));
      console.log('Movies array:', this.movies);
    });
  }

  toggleHeart(movie: Movie): void {
    movie.heartActive = !movie.heartActive;
  }
openGenreModal(movie: Movie): void {
  this.dialog.open(GenreComponent, {
    data: { movie: movie }
  });
}

openDirectorModal(movie: Movie): void {
  this.dialog.open(DirectorInfoComponent, {
    data: { movie: movie }
  });
}

openSynopsisModal(movie: Movie): void {
  this.dialog.open(SynopsisComponent, {
    data: { movie: movie }
  });
}
}