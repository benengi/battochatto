import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class DoubleGuardService implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth
  ) {}

  canActivate() {
    const loggedIn = !!this.afAuth.auth.currentUser;
    return !loggedIn;
  }
}
