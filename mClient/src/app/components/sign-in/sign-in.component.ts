import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserService]
})
export class SignInComponent implements OnInit {
  public user : User;
  public errorMessage;
  public identity;
  public token;
  constructor( private router: Router, private userService: UserService) { 
    this.user = new User('','','','','','ROLE_USER','');
  }
  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }
  onSubmit(){
    //conseguir los datos del usuario identificado
    this.userService.signIn(this.user).subscribe(
      response=>{
        let identity = response.user;
        this.identity = identity;
        if(!this.identity._id){
          console.log("User is not correctly identifed");
        }else{
          //Crear elemento en el localstorage para tener al usuario sesión
          localStorage.setItem('identity', JSON.stringify(identity));

          //Conseguir el token para enviarselo a cada peticion http
          this.userService.signIn(this.user, 'true').subscribe(
            response=>{
              let token = response.token;
              this.token = token;
              if(this.token.length <= 0){
                console.log("Token is not generated");
              }else{
                //Crear elemento en el localstorage para tener al token disponible
                localStorage.setItem('token', token);
                console.log(token);
                console.log(identity);
                this.router.navigate(['/for-you']);
              }
            },error =>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                this.errorMessage = error.error.message;
              }
            });
        }
    },error =>{
      var errorMessage = <any>error;
      if(errorMessage != null){
        this.errorMessage = error.error.message;
      }
    });

  }
} 
