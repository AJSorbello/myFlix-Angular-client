/**
 * @description This component handles the user login form, allowing users to log in to their account.
 * 
 * @module UserLoginFormComponent
 * @component
 * @implements OnInit
 * 
 * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
 * @param {MatDialogRef} dialogRef - Reference to the dialog opened.
 * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
 * @param {Router} router - Service to navigate between routes.
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>, // Uncommented MatDialogRef
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * @description Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void { }

  /**
   * @description Logs in the user by calling the userLogin method of the FetchApiDataService.
   * If the login is successful, stores the token and user information in local storage, closes the dialog, displays a success message, and navigates to the movies page.
   * If the login fails, displays a failure message.
   */
loginUser(event?: Event): void {
  if (event) {
    event.preventDefault();
  }
  this.fetchApiData.userLogin(this.userData).subscribe(
    (response) => {
      // Logic for a successful user login goes here!
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      console.log('response.user:', response.user);
      console.log('response.user.Username:', response.user.Username);
      if (response.user && response.user.Username) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.snackBar.open('User login successful', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      } else {
        console.error('No user found in response');
      }      
    },
    (error) => {
      // Directly set the message to "User not found" for any login error, ignoring specific status codes
            event?.preventDefault(); // Attempt to prevent any default browser behavior (though may not be effective here).

      this.snackBar.open("User not found. Please check your credentials.", 'OK', {
        duration: 2000
      });
    }
  );
}}