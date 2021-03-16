import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from 'src/app/models/album';
import { Song } from 'src/app/models/song';
import { AlbumService } from 'src/app/services/album.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { SongService } from 'src/app/services/song.service';
@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  public album : Album;
  public song : Song;
  public title : string;
  public identity;
  public token;
  public url: string;
  public alertMsg;
  public errorMessage;
  constructor(private _route : ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService,
    private _songService: SongService) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(1,'','','',false,'','');
    console.log(this.song);
  }

  ngOnInit() {
    this.title = 'Add new song';
  }
  
  onSubmit(){
    console.log(this.song.explicit)
    console.log(this.song)
    this._route.params.forEach((params:Params) =>{
      let id = params['album'];
      this.song.album = id;
     this._songService.addSong(this.token,this.song).subscribe(
        response => {
          if(!response.song){
            console.log('Error en el servidor');
            this.alertMsg = 'Error in server';
          }else{
            this.alertMsg = 'Song has been correctly created';
            this.song = response.song;
            this._router.navigate(['/edit-song',response.song._id]);
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
