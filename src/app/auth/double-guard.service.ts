import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class DoubleGuardService implements CanActivate {
  signedIn = true;

  constructor(
    private afAuth: AngularFireAuth
  ) {}

  canActivate() {
    this.afAuth.authState.subscribe(state => {
      this.signedIn = !!state;
    });
    return !this.signedIn;
  }
}
