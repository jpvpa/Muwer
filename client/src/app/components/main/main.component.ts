import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import {GLOBAL } from '../../services/global';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public identity :any;
  public token: any;
  public nombre: any;
  constructor(private userService: UserService, private router: Router) { this.url = GLOBAL.url; }
  public name: string;
  public userDetails : string;
  public userName : string;
  public url : string;
  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
  }

  logOut(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.router.navigate(['/home']);
  }


}
