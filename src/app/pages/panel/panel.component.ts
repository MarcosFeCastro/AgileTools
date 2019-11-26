import { Component, OnInit } from '@angular/core';

import { LocalUser } from './../../models/local_user';
import { Auth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  name: LocalUser;

  constructor() { }

  ngOnInit() {
    this.name = Auth.getLocalUser();
  }

  save(){
    console.log("Salvando");
  }

}
