import { Component, OnInit, Output, Input} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent implements OnInit {
  //@Output() logoff = new EventEmitter();
 /*  @Input() identity: any;
  @Input() token: any; */
  public identity;
  public token;
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    console.log(this.identity);
    console.log(this.token);
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
