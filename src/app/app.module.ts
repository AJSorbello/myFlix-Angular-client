import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SynopsisComponent } from './synopsis/synopsis.component';
import { DirectorInfoComponent } from './director-info/director-info.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';
import { GenreComponent } from './genre/genre.component';
import { FetchApiDataService } from './fetch-api-data.service'; // Import the service at the top of the file

/**
 * The routes for the Angular application.
 */
const appRoutes: Routes = [
   { path: 'welcome', component: WelcomePageComponent },
   { path: 'movies', component: MovieCardComponent },
   { path: 'profile', component: ProfilePageComponent},
   { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

/**
 * The main application module, responsible for setting up the application's components, services, and modules.
 */
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    ProfilePageComponent,
    SynopsisComponent,
    DirectorInfoComponent,
    GenreComponent,
    ConfirmationDialogComponent,
    DeleteUserComponent,
    UpdateUserFormComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
        MatToolbarModule,
        MatMenuModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    FlexLayoutModule
  ],
  providers: [FetchApiDataService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }