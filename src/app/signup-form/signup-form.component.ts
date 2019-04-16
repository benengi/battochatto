import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  email: string;
  password: string;
  displayName: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  signUp() {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    this.authService.signUpFire(email, password, displayName)
    .then(resolve => this.router.navigate(['chat']))
    .catch(error => this.errorMessage = error.message);
  }

}
