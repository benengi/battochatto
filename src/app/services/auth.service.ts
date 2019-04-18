import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.user = afAuth.authState;
  }

  get currentUserId(): string {
    console.log(this.authState);

    return this.authState !== null ? this.authState.user.uid : '';
  }

  authUser() {
    return this.user;
  }

  authenticate() {
    return this.afAuth.auth.currentUser;
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      this.authState = user;
    });
  }

  logout() {
    const uid = this.authenticate().uid;
    const status = 'offline';
    this.setStatus(uid, status);
    this.afAuth.auth.signOut()
    .then(() => this.router.navigate(['/']));
  }

  setStatus(uid: string, status: string) {
    const path = 'users/' + uid;
    const data = {
      status
    };
    this.db.object(path).update(data);
  }

  async signUpFire(email: string, password: string, displayName: string) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      user.user.updateProfile({ displayName });
      this.authState = user;
      const status = 'online';
      this.setUserData(email, displayName, status);
    });
  }

  setUserData(email: string, displayName: string, status: string) {
    const path = `users/${this.currentUserId}`;
    const data = {
      email,
      displayName,
      status
    };
    this.db.object(path).update(data);
  }

  setUserStatus(status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      status
    };
    this.db.object(path).update(data);
  }
}
