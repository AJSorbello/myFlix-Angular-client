import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

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

  constructor(public fetchApiData: FetchApiDataService) { }

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
}
