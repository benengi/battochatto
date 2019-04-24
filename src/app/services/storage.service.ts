import * as firebase from 'firebase/storage';

import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnInit {

  constructor(
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
  }

  goodStuff() {
    console.log('reached');
    const storageRef = 'ugh';
    console.log(storageRef);
  }
}
