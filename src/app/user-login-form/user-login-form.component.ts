// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

    @Input() userData = { Username: '', Password: '' };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    // This is the function responsible for sending the form inputs to the backend
loginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((result) => {
    console.log(result);
    localStorage.setItem('Username', result.user.Username);
    localStorage.setItem('token', result.token);  
    localStorage.setItem('User', JSON.stringify(result.user)); // Store the entire user object
    this.dialogRef.close(); // This will close the modal on success!
    this.snackBar.open("User login success", 'OK', {
      duration: 2000
    });
    this.router.navigate(['movies']);  }, 
    (result) => {
    this.snackBar.open("User login fail", 'OK', {
      duration: 2000
    });
  });
}

}