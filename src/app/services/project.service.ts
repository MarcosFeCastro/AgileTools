import { Injectable } from '@angular/core';

import { Project } from './../models/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Array<Project>;
  private currentProject: Project;

  constructor() { }

  getAll() {
    if( localStorage.getItem( environment.projects ) == null ) {
      this.projects = [];
    } else {
      this.projects = JSON.parse( localStorage.getItem( environment.projects ) );
    }
    return this.projects;
  }

  insertProject( project: Project ) {
    this.projects.push( project );
    let projects = [];
    if ( localStorage.getItem( environment.projects ) == null ) {
      projects = [];
      projects.push( project );
      localStorage.setItem( environment.projects, JSON.stringify( projects ) );
    } else {
      projects = JSON.parse( localStorage.getItem( environment.projects ) );
      projects.push( project );
      localStorage.setItem( environment.projects, JSON.stringify( projects ) );
    }
  }

  updateProject( project: Project ) {
    for ( let i = 0; i < this.projects.length; i++ ) {
      if ( this.currentProject == this.projects[i] ) {
        this.projects[i] = project;
        localStorage.setItem( environment.projects, JSON.stringify( this.projects ) );
      }
    }
  }

  deleteProject( project: Project ) {
    for ( let i = 0; i < this.projects.length; i++ ) {
      if ( project == this.projects[i] ) {
        this.projects.splice( i, 1 );
        localStorage.setItem( environment.projects, JSON.stringify( this.projects ) );
      }
    }
  }

  getCurrentProject() {
    return this.currentProject;
  }

  setCurrentProject( project: Project ) {
    this.currentProject = project;
  }

}
