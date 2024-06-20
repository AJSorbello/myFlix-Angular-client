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
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      console.log(result);
      localStorage.setItem('token', result.token);  
      localStorage.setItem('Username', JSON.stringify(result.user)); // Store the entire user object
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open("User login success", 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);  
    }, 
    (result) => {
      this.snackBar.open("User login fail", 'OK', {
        duration: 2000
      });
    });
  }
}
