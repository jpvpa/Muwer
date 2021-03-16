import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  public url : string;
  public identity;
  public token;
  public name : string
  constructor(private http : HttpClient) {
    this.url = GLOBAL.url;
   }

   makeFileRequest(url:string, params:Array<string>, files:Array<File>,token:string,name:string){

    return new Promise(function(resolve,reject){
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i< files.length;i++){
        formData.append(name,files[i],files[i].name);
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
