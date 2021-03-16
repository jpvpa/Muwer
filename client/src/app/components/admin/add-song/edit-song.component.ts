import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from 'src/app/models/album';
import { Song } from 'src/app/models/song';
import { AlbumService } from 'src/app/services/album.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { SongService } from 'src/app/services/song.service';
import { UploadService } from 'src/app/services/upload.service';
@Component({
  selector: 'app-edit-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class EditSongComponent implements OnInit {
  public album : Album;
  public song : Song;
  public title : string;
  public identity;
  public token;
  public url: string;
  public alertMsg;
  public errorMessage;
  public is_edit;
  constructor(private _route : ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _albumService: AlbumService,
    private _songService: SongService,
    private _uploadService: UploadService) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(1,'','','',false,'','');
    this.is_edit = true;
  }

  ngOnInit() {
    this.title = 'Edit song';
    this.is_edit = true;
    this.getSong()
  }
  getSong(){
    this._route.params.forEach((params:Params) =>{
        let id = params['id'];
        this._songService.getSong(this.token,id).subscribe(
            response => {
                if(!response.song){
                  console.log('Error en el servidor');
                  this._router.navigate(['/for-you'])
                }else{
                  this.song = response.song;
                  //this._router.navigate(['/edit-artist',response.album._id]);
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
  onSubmit(){
    console.log(this.song)
    this._route.params.forEach((params:Params) =>{
      let id = params['id'];
      this._songService.editSong(this.token,id,this.song).subscribe(
        response => {
          if(!response.song){
            console.log('Error en el servidor');
            this.alertMsg = 'Error in server';
          }else{
            this.alertMsg = 'Song has been correctly updated';
            //Subir el ifchero de audio
            if(!this.filesToUpload){
              this._router.navigate(['/artist-detail',this.song.album["artist"].artist["_id"]]);
            }else{
              this._uploadService.makeFileRequest(this.url+'upload-file-song/'+id,[],this.filesToUpload,this.token,'file')
                  .then(
                    (result) =>{
                      console.log(this.song.album["artist"].artist["_id"])
                      this._router.navigate(['/artist-detail',this.song.album["artist"].artist["_id"]]);
                    },error =>{
                      console.log(error);
                    }

                  )
            }
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
  public filesToUpload : Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
    console.log(this.filesToUpload);
  }

}
