import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForYouComponent } from './components/for-you/for-you.component';
import { SettingComponent } from './components/settings/setting/setting.component';
import { MainComponent } from './components/main/main.component';
import { ArtistComponent } from './components/artist/artist.component';
import { ArtistCrudComponent } from './components/admin/artist-crud/artist-crud.component';
import { AddArtistComponent } from './components/admin/add-artist/add-artist.component';
import { EditArtistComponent } from './components/admin/add-artist/edit-artist.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { AddAlbumComponent } from './components/admin/add-album/add-album.component';
import { ExtraCompComponent } from './components/extra-comp/extra-comp.component';
import { EditAlbumComponent } from './components/admin/add-album/edit-album.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { AddSongComponent } from './components/admin/add-song/add-song.component';
import { EditSongComponent } from './components/admin/add-song/edit-song.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    FooterComponent,
    ForYouComponent,
    SettingComponent,
    MainComponent,
    ArtistComponent,
    ArtistCrudComponent,
    AddArtistComponent,
    EditArtistComponent,
    PageNotFoundComponent,
    ArtistDetailComponent,
    AddAlbumComponent,
    EditAlbumComponent,
    ExtraCompComponent,
    AlbumDetailComponent,
    AddSongComponent,    
    EditSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
