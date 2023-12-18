import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Add this line

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      if (this.authService.getRole() === 'hr') {
        this.router.navigate(['/hr-dashboard']);
      } else {
        this.router.navigate(['/employee-dashboard']);
      }

      // Display success alert
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'You are now logged in.',
        timer: 2000,  // Automatically close after 2 seconds
        showConfirmButton: false
      });
    } else {
      console.log('Invalid credentials. Authentication failed.');
      Swal.fire({
        icon: 'error',
        title: 'Invalid credentials',
        text: 'Please try again.'
      });
    }
  }
}
