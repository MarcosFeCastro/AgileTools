import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ProjectService } from './../../../services/project.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectForm: FormGroup;
  submitted: boolean = false;

  projects: Array<Project>;

  constructor( private formBuilder: FormBuilder, private projectService: ProjectService, private router: Router ) { }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: [ null, [Validators.required, Validators.minLength(1)] ],
      content: [ null, [Validators.maxLength(250)] ],
      createdAt: [ Date.now(), [Validators.required] ],
      favorite: [ false, [Validators.required] ]
    });
    this.projects = this.projectService.getAll();
  }

  hasErrorForm( field: string ) {
    return this.projectForm.get( field ).errors;
  }

  onSubmit() {
    this.submitted = true;
    if ( this.projectForm.valid ) {
      try {
        this.projectService.insertProject( this.projectForm.value );
      } catch( error ) {
        console.error( error );
      } finally {
        console.log( "Projeto criado!" );
      }
    }
  }

  deleteProject( project: Project ) {
    this.projectService.deleteProject( project );
  }

  openProject( project: Project ) {
    this.projectService.setCurrentProject( project );
    this.router.navigate(['/kanban']);
  }

}
