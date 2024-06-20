# MyFlixAngularClient

This project is an Angular application that serves as a client for the MyFlix movie database. It allows users to register, log in, view movie details, add movies to their favorites list, and update their user profile. The application features a responsive design and utilizes Angular Material for a sleek user interface.

## Development server

To run the development server, use `ng serve`. Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

## Code scaffolding

You can use Angular CLI to generate various components, directives, pipes, services, classes, guards, interfaces, and enums. For example, to generate a new component, use `ng generate component component-name`.

## Build

To build the project, use `ng build`. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

To run unit tests, use `ng test`. This will execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

To run end-to-end tests, use `ng e2e`. This will execute the end-to-end tests via a platform of your choice. Note that you need to first add a package that implements end-to-end testing capabilities.

## Additional Components and Features

- **Toolbar Component**: The toolbar component provides navigation links and user authentication options.
- **User Registration Form Component**: Allows users to register with the application.
- **User Login Form Component**: Allows registered users to log in to the application.
- **Movie Card Component**: Displays information about a movie, including its title, release year, genre, and a brief synopsis. Users can click on a movie card to view more details.
- **Welcome Page Component**: The welcome page provides a brief introduction to the application and its features.
- **Profile Page Component**: Displays user profile information and allows users to update their profile.
- **Synopsis Component**: Displays a detailed synopsis of a selected movie.
- **Director Info Component**: Displays information about the director of a selected movie.
- **Genre Component**: Displays movies categorized by genre.
- **Confirmation Dialog Component**: Provides a confirmation dialog for user actions, such as deleting a user account.
- **Delete User Component**: Allows users to delete their account.
- **Update User Form Component**: Allows users to update their profile information.

## Dependencies

This project uses Angular Material for UI components and styling, HttpClientModule for HTTP requests, and FormsModule for two-way data binding in forms.

## Further help

For more help on the Angular CLI, use `ng help` or visit the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
