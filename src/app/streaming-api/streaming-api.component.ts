import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

///  <reference types="@types/spotify-web-playback-sdk"/>

@Component({
  selector: 'app-streaming-api',
  templateUrl: './streaming-api.component.html',
  styleUrls: ['./streaming-api.component.css']
})
export class StreamingAPIComponent implements OnInit {

  
  
  token = '';
  spotify : any;

  constructor(public http:HttpClient) { }

  getAuthToken() {
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    let add = "/getAuth";
    const url: string = 'http://127.0.0.1:5000' + add;

    return this.http.get(url, { responseType: 'json' });
  }

  saveToken() {
    let tokenizer = this.getAuthToken();
    let token: any;
    tokenizer.subscribe(
      (response: any) => {
        token = response;
        console.log(token);
        this.token = token;
      },
      () => {
        console.error('Request failed bozo!');

      }
    );
  }

  ngOnInit(): void {
    this.saveToken()
    
  }

  initPlayer(): void{
  //   this.spotify = new window.Spotify.Player({
  //     name: "SwapStream Player",
  //     getOAuthToken: (callback: (t: string)=> void) => {
  //       callback(this.token);
  //     },
  //     volume: 0.5
  //  })

  }
  

}
