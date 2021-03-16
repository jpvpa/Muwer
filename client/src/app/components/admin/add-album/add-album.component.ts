import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from 'src/app/models/album';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumService } from 'src/app/services/album.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {

  public album : Album;
  public artist : Artist
  public titulo : string;
  public identity;
  public token;
  public url: string;
  public alertMsg;
  public errorMessage;
  constructor(private _route : ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _albumService: AlbumService) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('','',0,'','','','');
  }

  ngOnInit() {
    this.titulo = 'Create new album';
  }
  
  onSubmit(){
    console.log(this.album)
    this._route.params.forEach((params:Params) =>{
      let id = params['artist'];
      this.album.artist = id;
      
      this._albumService.addAlbum(this.token,this.album).subscribe(
        response => {
          if(!response.album){
            console.log('Error en el servidor');
            this.alertMsg = 'Error in server';
          }else{
            this.alertMsg = 'Album has been correctly created';
            this.album = response.album;
            this._router.navigate(['/edit-album',response.album._id]);
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
    })
  }

}
