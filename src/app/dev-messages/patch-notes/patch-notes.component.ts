import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-patch-notes',
  templateUrl: './patch-notes.component.html',
  styleUrls: ['./patch-notes.component.css']
})
export class PatchNotesComponent implements OnInit {
  pokeMe: number;

  constructor(
    private store: StorageService
  ) { }

  ngOnInit() {
    this.pokeMe = 0;
  }

  secret() {
    this.pokeMe++;
    if (this.pokeMe === 21) {
      console.log('excelcior');
    }
  }

}
