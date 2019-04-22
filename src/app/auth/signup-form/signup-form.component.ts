import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  signUp(valid: boolean) {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;
    if (displayName.toLowerCase().match('billy')) {
      this.errorMessage = 'THERE CAN ONLY BE ONE';
    } else if (!valid) {
      this.errorMessage = 'Fatal error';
      return;
    } else {
      this.errorMessage = '';
      this.authService.signUpFire(email, password, displayName)
      .then(resolve => {
        this.errorMessage = 'Success!';
        this.router.navigate(['/chat']);
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
    }
  }

  validate() {
    const validEmail = !!this.email.match('[^@]+@[^.]+..+');
    const validDisplayName = !!this.displayName.match('^[a-zA-Z0-9]+');
    const validPassword = !!this.password.match('.{6,}');
    let valid = false;

    if (!validEmail) {
      this.errorMessage = 'Invalid email format';
      return;
    } else if (!validDisplayName) {
      this.errorMessage = 'Display name may not include special characters';
      return;
    } else if (!validPassword) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    } else {
      valid = validDisplayName && validEmail && validPassword;
      this.signUp(valid);
    }
  }
}
