import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  userData = {
    userName: '',
    password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    if (!this.userData.userName ||!this.userData.password) {
      this.snackBar.open('Please enter both username and password', 'OK', {
        duration: 2000
      });
      return;
    }

    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.dialogRef.close();
        this.snackBar.open('User login successful', 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      },
      (error) => {
        console.error(error);
        this.snackBar.open('User login failed', 'OK', {
          duration: 2000
        });
      }
    );
  }
}