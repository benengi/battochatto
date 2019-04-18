import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password)
    .then(res => {
      const status = 'online';
      this.authService.setUserStatus(status);
    })
    .then(() => this.router.navigate(['/chat']))
    .catch(err => this.errorMessage = err.message);
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }
}
