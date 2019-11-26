import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor( private formBuilder: FormBuilder, private router: Router ) { }

  ngOnInit() {
    if ( Auth.getLocalUser ) {
      this.router.navigate(['home']);
    }
    this.form = this.formBuilder.group({
      name: [ null, [Validators.required, Validators.minLength(1)] ]
    });
  }

  hasErrorForm( field: string ) {
    return this.form.get(field).errors;
  }

  onSubmit(){
    this.submitted = true;
    if ( this.form.valid ) {
      try {
        Auth.setLocalUser( this.form.value['name'] );
      } catch (error) {
        console.log(error);
      } finally {
        this.router.navigate(['home']);
      }
    }
  }

}
