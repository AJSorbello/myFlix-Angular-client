/**
 * @description This component represents the toolbar of the application, providing navigation and responsive design handling.
 * 
 * @module ToolbarComponent
 * @component
 * 
 * @param {BreakpointObserver} breakpointObserver - Service to observe media query breakpoints.
 * @param {Router} router - Service to navigate between routes.
 */
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {} // Inject Router service

  /**
   * @description Logs the user out by clearing local storage and redirecting to the welcome page.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']); // Redirect to welcome page
  }

  /**
   * @description Checks if the user is logged in by verifying the presence of a token in local storage.
   * @returns {boolean} True if the user is logged in, false otherwise.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Replace 'token' with the key you use to store the token
  }
}
