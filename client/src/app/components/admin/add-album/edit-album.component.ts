import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from 'src/app/models/album';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumService } from 'src/app/services/album.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class EditAlbumComponent implements OnInit {

  public album : Album;
  public artist : Artist
  public titulo : string;
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
    private _uploadService: UploadService) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('','',0,'','','','');
    this.is_edit =true;
  }

  ngOnInit() {
    this.titulo = 'Edit album';
    this.getAlbum();
  }
  getAlbum(){
    this._route.params.forEach((params:Params) =>{
        let id = params['id'];
        this.album.artist = id;
        this._albumService.getAlbum(this.token,id).subscribe(
            response => {
                if(!response.album){
                  console.log('Error en el servidor');
                  this._router.navigate(['/for-you'])
                }else{
                  this.album = response.album;
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
    console.log(this.album)
    console.log(this.album.artist["_id"])
    this._route.params.forEach((params:Params) =>{
      let id = params['id'];
      
      this._albumService.editAlbum(this.token,id,this.album).subscribe(
        response => {
          if(!this.album){
            console.log('Error en el servidor');
            this.errorMessage = 'Error in server';
          }else{
            this.alertMsg = 'Album has been correctly updated';
            if(!this.filesToUpload){
                console.log(this.album.artist["_id"])
                this._router.navigate(['/artist-detail',this.album.artist["_id"]]);
            }else{
                this._uploadService.makeFileRequest(this.url+'upload-image-album/'+id,[],this.filesToUpload,this.token,'image')
                .then(
                  (result) =>{
                    this._router.navigate(['/artist-detail',this.album.artist["_id"]]);
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