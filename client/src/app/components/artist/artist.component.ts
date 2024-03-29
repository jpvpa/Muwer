import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Artist } from 'src/app/models/artist';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import {GLOBAL } from '../../services/global';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
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
