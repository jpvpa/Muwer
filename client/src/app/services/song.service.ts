import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Album } from '../models/album';
import { Song } from '../models/song';
@Injectable({
  providedIn: 'root'
})
export class SongService {
  public url : string;
  public identity;
  public token;
  public name : string
  constructor(private http : HttpClient) {
    this.url = GLOBAL.url;
   }

   getSongs(token,albumId = null):Observable<any>{
    let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});
    if(albumId ==null){
      return this.http.get(this.url+'songss', {headers : headers})
    }else{
      return this.http.get(this.url+'songss/'+albumId, {headers : headers})
    }
   }
   getSong(token,id:string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    return this.http.get(this.url+'song/'+id, httpOptions)
   }
   addSong(token, song : Song):Observable<any>{
     let params = JSON.stringify(song)
     let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});

     return this.http.post(this.url+'song',params, {headers : headers})
   }
   editSong(token,id:string, song : Song):Observable<any>{
      let params = JSON.stringify(song)
      let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});

      return this.http.put(this.url+'song/'+id,params, {headers : headers})
    }
   /* deleteSong(token,id:string):Observable<any>{
      let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this.http.delete(this.url+'song/'+id, {headers : headers})
     }*/
}
