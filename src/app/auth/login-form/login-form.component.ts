import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login(valid: boolean) {
    if (valid) {
      this.authService
        .login(this.email, this.password)
        .then(res => {
          const status = 'online';
          this.authService.setUserStatus(status);
        })
        .then(() => this.router.navigate(['/chat']))
        .catch(err => (this.errorMessage = err.message));
    } else {
      this.errorMessage = 'Fatal error';
    }
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.validate();
    }
  }

  validate() {
    console.log(':P');

    const validEmail = !!this.email.match('[^@]+@[^.]+..+');
    const validPassword = !!this.password.match('.{6,}');
    let valid = false;

    if (!validEmail) {
      this.errorMessage = 'Invalid email format';
      return;
    } else if (!validPassword) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    } else {
      valid = validEmail && validPassword;
      this.login(valid);
    }
  }
}
