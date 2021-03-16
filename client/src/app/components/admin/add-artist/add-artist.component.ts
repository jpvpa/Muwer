import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ArtistService } from 'src/app/services/artist.service';
import {GLOBAL } from '../../../services/global';
import { Artist } from 'src/app/models/artist';
@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent implements OnInit {
  public artist : Artist;
  public title : string;
  public identity;
  public token;
  public url: string;
  public alertMsg;
  public errorMessage;
  constructor(private _route : ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService) { 
    this.title = 'Create Artist';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('','','');
  }

  ngOnInit() {
    this.title = 'Create Artist';
  }
  
  onSubmit(){
    console.log(this.artist)
    this._artistService.addArtist(this.token,this.artist).subscribe(
      response =>{
        if(!response.artist){
          console.log('Error en el servidor');
          this.alertMsg = 'Error in server';
        }else{
          //this.artist = response.artist;
          this.alertMsg = 'Artist has been correctly created';
          this._router.navigate(['/edit-artist',response.artist._id]);
        }
      },
      error =>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body)
         this.errorMessage = body.message;
        }
      }
    )
  }
}
