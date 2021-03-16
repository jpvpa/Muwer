import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';
@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  public url : string;
  public identity;
  public token;
  public name : string
  constructor(private http : HttpClient) {
    this.url = GLOBAL.url;
   }

   getArtists(token,page):Observable<any>{
    let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this.http.get(this.url+'artists/'+page, {headers : headers})
   }
   getArtist(token,id:string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };

    //let header = new  HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').set(Authorization,token);
    return this.http.get(this.url+'artist/'+id, httpOptions)
   }
   addArtist(token, artist : Artist):Observable<any>{
     let params = JSON.stringify(artist)
     let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});

     return this.http.post(this.url+'artist',params, {headers : headers})
   }
   editArtist(token,id:string, artist : Artist):Observable<any>{
    let params = JSON.stringify(artist)
    let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});

    return this.http.put(this.url+'artist/'+id,params, {headers : headers})
    }
    deleteArtist(token,id:string):Observable<any>{
      let headers = new  HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this.http.delete(this.url+'artist/'+id, {headers : headers})
     }
}
