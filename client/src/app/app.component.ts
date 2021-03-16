import { Component, OnInit, Output } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import {GLOBAL } from './services/global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Muwer';
  public user : User;
  public identity :any;
  public token: any;
  public url : string;
  constructor(private userService: UserService){
    this.user = new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    console.log(this.identity);
    console.log(this.token);
    this.url = GLOBAL.url;
  }
  
}
