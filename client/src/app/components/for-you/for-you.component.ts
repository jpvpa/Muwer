import { Component, OnInit, Output, Input} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventEmitter } from 'protractor';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import {GLOBAL } from '../../services/global';
@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent implements OnInit {
  public artists : Artist[];
  public titulo : string;
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;
  
  constructor(private _route : ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService) {
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.next_page = 1;
      this.prev_page = 1;
    }
    
    logOut(){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      localStorage.clear();
      this.identity = null;
      this.token = null;
      this._router.navigate(['/home']);
    }
  ngOnInit() {
    this.getArtist();
  }
  getArtist(){
    this._route.params.forEach((params: Params) =>{
      let page = +params['page'];
      if(!page){
        page = 1;
      }else{
        this.next_page = page +1;
        this.prev_page = page -1;
        if(this.prev_page == 0){
          this.prev_page = 1;
        }
      }
      this._artistService.getArtists(this.token,page).subscribe(
        response =>{
          if(!response.artists){
            this._router.navigate(['/for-you'])
          }else{
            this.artists = response.artists;
            console.log(this.artists)
            console.log("Everything's correct!");
          }
        },
        error => {
          var errorMessage = <any>error;
          if(errorMessage != null){
            var body = JSON.parse(error._body)
          }
        }
      )
    })
  }
}
