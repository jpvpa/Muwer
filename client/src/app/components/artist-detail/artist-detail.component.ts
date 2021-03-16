import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { UserService } from 'src/app/services/user.service';
import { ArtistService } from 'src/app/services/artist.service';
import { UploadService } from 'src/app/services/upload.service';
import {GLOBAL } from '../../services/global';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album';
@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
  public artist : Artist;
  public titulo : string;
  public albums : Album[];
  public album : Album;
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;
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
     }

  ngOnInit() {
    this.titulo = 'Artistas';
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
            this._albumService.getAlbums(this.token,response.artist._id).subscribe(
              response =>{
                this.albums = response.albums;
                if(!response.albums){
                  this.errorMessage = 'Artist does not count with albums'
                }else{
                  this.albums = response.albums;
                }
              },
              error => {
                var errorMessage = <any>error;
                if(errorMessage != null){
                  var body = JSON.parse(error._body)
                }
              }
            )
            
          }
        },
        error => {
          var errorMessage = <any>error;
          if(errorMessage != null){
            var body = JSON.parse(error._body)
          }
        }
      );
    })
  }

  public confirmado;
  onDelete(id){
    this.confirmado = id;
  }
  onCancelAlbum(){
    this.confirmado = null;
  }
  onDeleteAlbum(id){
    this._albumService.deleteAlbum(this.token,id).subscribe(
      response =>{
        if(!response.artists){
        }
        this.getArtist();
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body)
        }
      }  
    )
  }
  public albumSelect;
  albumSelected(id){
    this._albumService.getAlbum(this.token,id).subscribe(
      response =>{
        this.album = response.album;
        if(!response.album){
          this.errorMessage = 'Artist does not count with albums'
        }else{
          this.album = response.album;
          this.albumSelect = true;
        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body)
        }
      }
    )
  }
}
