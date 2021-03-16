import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url : string;
  public identity;
  public token;
  public name : string
  constructor( private http : HttpClient) { 
    this.url = GLOBAL.url;
    
  }
  
  

  signIn(userLogin, gethash = null): Observable<any>{
    if(gethash != null){
      userLogin.gethash = gethash;
    }
    let json = JSON.stringify(userLogin);
    let params = json;

    let headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.post(this.url+'login',params,{headers : headers})
  }
  register(userRegister) : Observable<any>{
    
    let json = JSON.stringify(userRegister);
    let params = json;

    let headers = new HttpHeaders({'Content-Type' : 'application/json'});

    return this.http.post(this.url+'register',params,{headers : headers})
  }
  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }
  getToken(){
    let token = localStorage.getItem('token');
    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  updateUser(user_to_update) : Observable<any>{
    let json = JSON.stringify(user_to_update);
    let params = json;

    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': this.getToken()});

    return this.http.put(this.url+'/update-user/'+user_to_update._id,params,{headers : headers})

  }
  
}
