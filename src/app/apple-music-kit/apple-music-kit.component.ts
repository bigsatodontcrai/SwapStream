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
        let music: any;
        MusicKit.configure({
        developerToken: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IlczU1pQRDMyUUMifQ.eyJpc3MiOiJRVE0zOExKUTNQIiwiaWF0IjoxNjQ5NzI2OTgzLCJleHAiOjE2NTE0NTQ5ODN9.5NYNeKqUBJCRLKhRdqhD3lFdIH02tnbk8RrW6LpinjH-EpVDF3lRfBwjjsrleXjK2l0QRKtmLGwBigWuc5bTaA',
        app: {
            name: 'My Cool Web App',
            build: '2022.4.11',
        },
        storefrontId: 'us'
        }).then((result: any) => {
          music = MusicKit.getInstance();
          music.authorize()
          .then(() => {
            music.api.music('/v1/catalog/{{storefrontId}}/stations', {
              'filter[identity]': 'personal',
            }).then((output: any) => {
              let stationID = output['data']['data'][0]['id'];
              if (stationID) {
                music.setQueue({ station: stationID }).then((queue: any) => {
                  music.playNext({song: queue['_itemIDs'][0]})
                  .then(() => music.play())
                  .catch((error : any) => console.log(error));
                });
                
              } else {
                console.error("Unable to retrieve station data.");
              }
            });
          })
          .catch(function(error: any) {
            console.log(error);
          });
        });
  }
}
