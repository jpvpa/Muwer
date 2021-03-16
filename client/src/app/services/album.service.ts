import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';
import { Album } from '../models/album';
@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public url : string;
  public identity;
  public token;
  public name : string
  constructor(private http : HttpClient) {
    this.url = GLOBAL.url;
   }

   getAlbums(token,artistId = null):Observable<any>{
    let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});
    if(artistId ==null){
      return this.http.get(this.url+'albums', {headers : headers})
    }else{
      return this.http.get(this.url+'albums/'+artistId, {headers : headers})
    }
   }
   getAlbum(token,id:string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    //let header = new  HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set(Authorization,token);
    return this.http.get(this.url+'album/'+id, httpOptions)
   }
   addAlbum(token, album : Album):Observable<any>{
     let params = JSON.stringify(album)
     let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});

     return this.http.post(this.url+'album',params, {headers : headers})
   }
   editAlbum(token,id:string, album : Album):Observable<any>{
      let params = JSON.stringify(album)
      let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});

      return this.http.put(this.url+'album/'+id,params, {headers : headers})
    }
    deleteAlbum(token,id:string):Observable<any>{
      let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this.http.delete(this.url+'album/'+id, {headers : headers})
     }
}
