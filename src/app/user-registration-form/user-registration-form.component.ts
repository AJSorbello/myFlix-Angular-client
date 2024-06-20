/**
 * @description This component handles the user registration form, allowing new users to create an account.
 * 
 * @module UserRegistrationFormComponent
 * @component
 * @implements OnInit
 * 
 * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
 * @param {MatDialogRef} dialogRef - Reference to the dialog opened.
 * @param {MatSnackBar} snackBar - Service for displaying snack-bar notifications.
 */
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Fullname: '', Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * @description Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void { }

  /**
   * @description Registers a new user by calling the userRegistration method of the FetchApiDataService.
   * If the registration is successful, closes the dialog and displays a success message.
   * If the registration fails, displays a failure message.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open("User create success", 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open("User create fail", 'OK', {
        duration: 2000
      });
    });
  }

}
