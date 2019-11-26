import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Note } from './../../../models/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  noteForm: FormGroup;
  submitted: boolean = false;

  notes: Array<Note>;

  notecard: string = 'notecard-white';

  constructor( private formBuilder: FormBuilder, private notesService: NotesService ) { }

  ngOnInit() {
    this.notes = this.notesService.getAll();
    this.createForm();
  }

  createForm() {
    this.noteForm = this.formBuilder.group({
      title: [ null, [Validators.required, Validators.minLength(1)] ],
      content: [ null, [Validators.required, Validators.minLength(1), Validators.maxLength(250)] ],
      color: [ 'notecard-white', [Validators.required] ],
      tag: [ null ],
      createdAt: [ Date.now(), [Validators.required] ],
      favorite: [ false, [Validators.required] ],
    });
  }

  hasErrorForm( field: string ) {
    return this.noteForm.get( field ).errors;
  }

  checkColor() {
    return this.noteForm.value.color;
  }

  setNoteColor( color: string ) {
    this.noteForm.controls['color'].patchValue( color );
  } 

  onSubmit() {
    this.submitted = true;
    if ( this.noteForm.valid ) {
      try {
        this.notesService.insertNote( this.noteForm.value );
      } catch( error ) {
        console.error( error );
      } finally {
        this.noteForm.reset();
        this.createForm();
        this.submitted = false;
        console.log( "Anotado!" );
      }
    }
  }

  deleteNote( note: Note ) {
    this.notesService.deleteNote( note );
  }

}
