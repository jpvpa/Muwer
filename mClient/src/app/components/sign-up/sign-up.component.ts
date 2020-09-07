import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public userRegister : User;
  public errorMessage;
  constructor(private userService: UserService, private router: Router) {
    this.userRegister = new User('','','','','','ROLE_USER','');
  }
  ngOnInit() {
  }
  onSubmitRegister(){
   this.userService.register(this.userRegister).subscribe(
     response =>{
        let user = response.user;
        this.userRegister = user;
        if(!user._id){
          this.errorMessage='Error in register the user'
        }else{
          this.errorMessage = 'User succesullfy registered, identify with '+this.userRegister.email;
          /* this.userRegister = new User('','','','','','ROLE_USER',''); */
          console.log(this.userRegister);
          this.router.navigate(['/home']);
        }
     },error =>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.errorMessage = error.error.message;
          console.log(this.errorMessage);
        }
      }
   );
  }
}
