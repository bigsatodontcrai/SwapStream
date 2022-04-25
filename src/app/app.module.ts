import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowComponent } from './window/window.component';
import { SearchModuleComponent } from './search-module/search-module.component';
import { ListDisplayComponent } from './list-display/list-display.component';
import { PlayerModuleComponent } from './player-module/player-module.component';
import { SongsComponent } from './songs/songs.component';
import { StreamingAPIComponent } from './streaming-api/streaming-api.component';
import { LoginPageDirective } from './login-page.directive';
import { LoaderDirective } from './loader.directive';
import { ListGeneratorDirective } from './list-generator.directive';
import { AppleMusicKitComponent } from './apple-music-kit/apple-music-kit.component';



@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    SearchModuleComponent,
    ListDisplayComponent,
    PlayerModuleComponent,
    SongsComponent,
    StreamingAPIComponent,
    LoginPageDirective,
    LoaderDirective,
    ListGeneratorDirective,
    AppleMusicKitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
