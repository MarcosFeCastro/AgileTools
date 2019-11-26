import { Injectable } from '@angular/core';

import { LocalUser } from '../models/local_user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private constructor() { }

  static getLocalUser() : LocalUser {
    let user = localStorage.getItem( environment.localUser );
    if( user == null ) {
      return null;
    } else {
      return JSON.parse( user );
    }
  }

  static setLocalUser( obj: LocalUser ) {
    if( obj == null ) {
      localStorage.removeItem( environment.localUser );
    } else {
      localStorage.setItem( environment.localUser, JSON.stringify(obj) );
    }
  }

}
