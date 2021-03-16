import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
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
import { EditAlbumComponent } from './components/admin/add-album/edit-album.component';
import { AddSongComponent } from './components/admin/add-song/add-song.component';
import { EditSongComponent } from './components/admin/add-song/edit-song.component';
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: MainComponent, 
    children: [
      { path: 'for-you', component: ForYouComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'artist/:page', component: ArtistComponent },
      { path: 'artist-crud/:page', component: ArtistCrudComponent },
      { path: 'add-artist', component: AddArtistComponent },
      { path: 'edit-artist/:id', component: EditArtistComponent },
      { path: 'page-not-found', component: PageNotFoundComponent },
      { path: 'artist-detail/:id', component: ArtistDetailComponent },
      { path: 'add-album/:artist', component: AddAlbumComponent },
      { path: 'edit-album/:id', component: EditAlbumComponent },
      { path: 'add-song/:album', component: AddSongComponent },
      { path: 'edit-song/:id', component: EditSongComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
