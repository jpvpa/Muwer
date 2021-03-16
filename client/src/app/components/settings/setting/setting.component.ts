import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/user';
import {GLOBAL } from '../../../services/global';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers: [UserService]
})
export class SettingComponent implements OnInit {
  showDiv = {
    account : true,
    email : false,
    password : false
  }
  //@Output() userChange =new EventEmitter();
  public  user: User;
  public identity;
  public token;
  public errorMessage;
  public alertMessage;
  public url:string;
  constructor(private userService: UserService) {
    this.user = this.identity;
   }
   name : any;
   infoData : any;
   subscription: Subscription;
   ngOnInit() {
     this.identity = this.userService.getIdentity();
     this.token = this.userService.getToken();
     this.user = this.identity;
     this.url = GLOBAL.url;
    }
    
  onSubmit(){ 
    console.log(this.user)
    this.userService.updateUser(this.user).subscribe(
      response =>{
       console.log(this.user.name);

        if(!this.user._id){
          this.errorMessage = "User has not been updated";
        }else{
          //this.user = response.user;
          localStorage.setItem('identity', JSON.stringify(this.user));
          document.getElementById("identity_name").innerHTML = this.user.name;
          if(!this.filesToUpload){
            //Redireccion

          }else{
            this.makeFileRequest(this.url+'upload-image-user/'+this.user._id,[],this.filesToUpload)
            .then(
              (result:any) =>{
                this.user.image = result.image;

                localStorage.setItem('identity', JSON.stringify(this.user));
                let imagePath = this.url+'get-image-user/'+this.user.image;
                document.getElementById("identity_image").setAttribute("src",imagePath);
              }
            );
          }
          this.alertMessage = 'User has been correctly updated';
        }
      },error =>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body)
          this.errorMessage = body.message;
        }
      }
    )
  }

  public filesToUpload : Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
    console.log(this.filesToUpload);
  }
  makeFileRequest(url:string, params:Array<string>, files:Array<File>){
    var token =  this.token;

    return new Promise(function(resolve,reject){
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i< files.length;i++){
        formData.append('image',files[i],files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', url,true);
      xhr.setRequestHeader('Authorization',token);
      xhr.send(formData);
    });
  }

}


