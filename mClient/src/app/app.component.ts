import { Component, OnInit, Output } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

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
  
  constructor(private userService: UserService){
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    console.log(this.identity);
    console.log(this.token);
  }
}
