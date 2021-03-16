import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { UserService } from 'src/app/services/user.service';
import { ArtistService } from 'src/app/services/artist.service';
import {GLOBAL } from '../../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {
  public alertMsg;
  public errorMessage;
  public artist : Artist;
  public url: string;
  public identity;
  public token;
  public is_edit;
  constructor(private _route : ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService) {
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.artist = new Artist('','','','');
      this.is_edit = true;
     }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.artist)
    this._artistService.addArtist(this.token,this.artist).subscribe(
      response =>{
        if(!this.artist){
          console.log('Error en el servidor');
          this.alertMsg = 'Error in server';
        }else{
          //this.artist = response.artist;
          this.alertMsg = 'Artist has been correctly created';
          //this._router.navigate(['/edit-artist',this.artist._id]);
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
  fileChangeEvent($event){

  }
}
