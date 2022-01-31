import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowComponent } from './window/window.component';
import { SearchModuleComponent } from './search-module/search-module.component';
import { ListDisplayComponent } from './list-display/list-display.component';
import { PlayerModuleComponent } from './player-module/player-module.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SongsComponent } from './songs/songs.component';
import { StreamingAPIComponent } from './streaming-api/streaming-api.component';

@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    SearchModuleComponent,
    ListDisplayComponent,
    PlayerModuleComponent,
    PlaylistComponent,
    SongsComponent,
    StreamingAPIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
