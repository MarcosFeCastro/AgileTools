import { Injectable } from '@angular/core';

import { Note } from './../models/note';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Array<Note>;

  constructor() { }

  getAll() {
    if( localStorage.getItem( environment.notes ) == null ) {
      this.notes = [];
    } else {
      this.notes = JSON.parse( localStorage.getItem( environment.notes ) );
    }
    return this.notes;
  }

  insertNote( note: Note ) {
    this.notes.push( note );
    let notes = [];
    if ( localStorage.getItem( environment.notes ) == null ) {
      notes = [];
      notes.push( note );
      localStorage.setItem( environment.notes, JSON.stringify( notes ) );
    } else {
      notes = JSON.parse( localStorage.getItem( environment.notes ) );
      notes.push( note );
      localStorage.setItem( environment.notes, JSON.stringify( notes ) );
    }
  }

  updateNote( note: Note, updatedNote: Note) {

  }

  deleteNote( note: Note ) {
    for ( let i = 0; i < this.notes.length; i++ ) {
      if ( note == this.notes[i] ) {
        this.notes.splice( i, 1 );
        localStorage.setItem( environment.notes, JSON.stringify( this.notes ) );
      }
    }
  }

}
