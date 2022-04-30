import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { songArtDataType } from 'src/app/apple-music-kit/song-art-data';
declare var Spotify: any;

@Component({
  selector: 'app-streaming-api',
  templateUrl: './streaming-api.component.html',
  styleUrls: ['./streaming-api.component.css']
})
export class StreamingAPIComponent implements OnInit {
  token = '';
  spotify: any;
  songArtData: songArtDataType;
  playButtonText = 'fa fa-play';
  musicPlaying = false;

  constructor(public http: HttpClient) {
    this.songArtData = {
      height: 50,
      width: 50,
      url: "/assets/images/sound_icon.jpg"
    }
  }

  getAuthToken() {
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    let add = "/getAuth";
    const url: string = 'http://127.0.0.1:5000' + add;

    return this.http.get(url, { responseType: 'json' });
  }

  saveToken() {
    let tokenizer = this.getAuthToken();
    let token: any;
    tokenizer.subscribe({
      next: (response: any) => {
        token = response;
        //console.log(token);
        this.token = token;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  ngOnInit(): void {
    //this.saveToken()
  }

  initPlayer(): void {
    //   this.spotify = new window.Spotify.Player({
    //     name: "SwapStream Player",
    //     getOAuthToken: (callback: (t: string)=> void) => {
    //       callback(this.token);
    //     },
    //     volume: 0.5
    //  })

  }

  async handlePreviousSongButtonClicked() {
    console.log("Previous song button clicked.");
  }

  async handlePlayButtonClicked() {
    console.log("Play/Pause button clicked.");
  }

  async handleNextSongButtonClicked() {
    console.log("Next song button clicked.");
    if (this.musicPlaying === true) {
      // pause music playback here
      this.musicPlaying = false;
      this.playButtonText = 'fa fa-play';
    } else {
      // play music here
      this.musicPlaying = true;
      this.playButtonText = 'fa fa-pause';
    }
  }


}
