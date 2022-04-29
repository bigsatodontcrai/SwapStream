import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowComponent } from './window/window.component';
import { SearchModuleComponent } from './search-module/search-module.component';
import { ListDisplayComponent } from './list-display/list-display.component';
import { PlayerModuleComponent } from './player-module/player-module.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SongsComponent } from './songs/songs.component';
import { StreamingAPIComponent } from './streaming-api/streaming-api.component';
import { LoginPageDirective } from './login-page.directive';
import { LoaderDirective } from './loader.directive';
import { ListGeneratorDirective } from './list-generator.directive';
import { AppleMusicKitComponent } from './apple-music-kit/apple-music-kit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'


@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    SearchModuleComponent,
    ListDisplayComponent,
    PlayerModuleComponent,
    PlaylistComponent,
    SongsComponent,
    StreamingAPIComponent,
    LoginPageDirective,
    LoaderDirective,
    ListGeneratorDirective,
    AppleMusicKitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatSliderModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule, 
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }