import { Component, OnInit } from '@angular/core';
declare var MusicKit: any;

@Component({
  selector: 'app-apple-music-kit',
  templateUrl: './apple-music-kit.component.html',
  styleUrls: ['./apple-music-kit.component.css']
})
export class AppleMusicKitComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setupapple();
  }
  
  setupapple() {
    // document.addEventListener('musickitloaded', function () {
        // MusicKit global is now defined.
  
        // Call configure() to configure an instance of MusicKit JS.
        let music: any;
        MusicKit.configure({
        developerToken: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IlczU1pQRDMyUUMifQ.eyJpc3MiOiJRVE0zOExKUTNQIiwiaWF0IjoxNjQ5NzI2OTgzLCJleHAiOjE2NTE0NTQ5ODN9.5NYNeKqUBJCRLKhRdqhD3lFdIH02tnbk8RrW6LpinjH-EpVDF3lRfBwjjsrleXjK2l0QRKtmLGwBigWuc5bTaA',
        app: {
            name: 'My Cool Web App',
            build: '2022.4.11',
        },
        storefrontId: '1'
        }).then((result: any) => {
          music = MusicKit.getInstance();
          music.authorize()
          .then(() => {
            music.player.play();
          })
          .catch(function(error: any) {
            console.log(error);
          });
        });
    // });
  }
}
