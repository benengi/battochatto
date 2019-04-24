import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  user: Observable<firebase.User>;
  displayName: string;
  versionNumber = environment.appVersion;
  isGlowing: boolean;

  constructor(
    private authService: AuthService,
    private storeServe: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.displayName = user.displayName;
      }
    });
    this.isGlowing = this.storeServe.getGlowBool();
  }

  ngDoCheck() {
    this.isGlowing = this.storeServe.getGlowBool();
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }
}
