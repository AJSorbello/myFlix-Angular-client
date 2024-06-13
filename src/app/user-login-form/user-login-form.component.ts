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

  ngOnInit(): void {
  }

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