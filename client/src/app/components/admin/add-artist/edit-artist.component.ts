import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { UserService } from 'src/app/services/user.service';
import { ArtistService } from 'src/app/services/artist.service';
import { UploadService } from 'src/app/services/upload.service';
import {GLOBAL } from '../../../services/global';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-edit-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class EditArtistComponent implements OnInit {
  public alertMsg;
  public errorMessage;
  public artist : Artist;
  public url: string;
  public identity;
  public token;
  public is_edit;
  public title : string;
  constructor(private _route : ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _uploadService: UploadService
    ) {
      this.url = GLOBAL.url;
      
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.artist = new Artist('','','');
      this.is_edit = true;
     }

  ngOnInit() {
    this.title = "Edit Artist";
    this.getArtist();
  }
  getArtist(){
    this._route.params.forEach((params:Params) =>{
      let id = params['id'];
      this._artistService.getArtist(this.token,id).subscribe(
        response =>{
          this.artist=response.artist;
          if(!this.artist){
            this._router.navigate(['/artist-crud',1])
          }else{
            this.artist = response.artist;
            console.log("Everything's correct!");
          }
        },
        error => {
          var errorMessage = <any>error;
          if(errorMessage != null){
            var body = JSON.parse(error._body)
          this.errorMessage = body.message;
          }
        }
      );
    })
  }
  
  onSubmit(){
    console.log(this.artist)
    this._route.params.forEach((params:Params) =>{
      let id = params['id'];
      this._artistService.editArtist(this.token,id,this.artist).subscribe(
        response =>{
          if(!this.artist){
            console.log('Error en el servidor');
            this.alertMsg = 'Error in server';
          }else{
            //this.artist = response.artist;
            this.alertMsg = 'Artist has been correctly updated';
            //subir imagen del artista
            this._uploadService.makeFileRequest(this.url+'upload-image-artist/'+id,[],this.filesToUpload,this.token,'image')
            .then(
              (result) =>{
                this._router.navigate(['artist-crud',1])
              },error =>{
                console.log(error);
              }
            )
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
    })
    
  }
  public filesToUpload : Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
    console.log(this.filesToUpload);
  }
}
