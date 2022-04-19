import { Component, OnInit } from '@angular/core';
import * as jose from 'jose'
declare var MusicKit: any;

@Component({
  selector: 'app-apple-music-kit',
  templateUrl: './apple-music-kit.component.html',
  styleUrls: ['./apple-music-kit.component.css']
})
export class AppleMusicKitComponent implements OnInit {

  Devtoken = '';
  privateKeystring = '-----BEGIN PRIVATE KEY----- MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg8OljcWCOgxqqeqfDzxLQhGi5ibIscIGvyBYMD76VuNCgCgYIKoZIzj0DAQehRANCAATcbMVuB26hZ81i8E0KuzMD3HmXgXSIXV2NXDaqeuQgRapIRwHTOAVkI5nERowNgODqDL1DXRmyOpUNgjXEsbWs -----END PRIVATE KEY-----';
  appleMusicAPI : any;
  musicPlaying = false;
  constructor() { 
  }

  ngOnInit(): void {
    this.appleMusicAPI = {};
    this.createdevtoken();
  }

  setMusicKitInstance(kit: any): any {
    this.getMusicKitInstance = () => { return kit };
  }

  // This function is defined within setupapple
  getMusicKitInstance = () : any => {};

  handlePlayButtonClicked() {
    this.queueSongsFromUserStation(); // THIS IS ONLY HERE FOR NOW UNTIL WE FIGURE OUT HOW TO PICK SPECIFIC SONGS
    let music = this.getMusicKitInstance();
    if (this.musicPlaying === true) {
      music.pause();
    } else {
      music.play();
    }
  }

  queueSongsFromUserStation() {
    let music = this.getMusicKitInstance();
    music.api.music('/v1/catalog/{{storefrontId}}/stations', {
      'filter[identity]': 'personal',
    }).then((output: any) => {
      let stationID = output['data']['data'][0]['id'];
      if (stationID) {
        music.setQueue({ station: stationID }).then((queue: any) => {
          music.playNext({song: queue['_itemIDs'][0]})
          .then(() => {
            //music.play();
          })
          .catch((error : any) => console.error(error));
        });
        
      } else {
        console.error("Unable to retrieve station data.");
      }
    });
  }



  async createdevtoken()
  {
    let datetime = Date.parse(Date())/1000;
    const ecPrivateKey = await jose.importPKCS8(this.privateKeystring, 'ES256')

    await new jose.SignJWT({})
    .setProtectedHeader({ alg: 'ES256', kid: "W3SZPD32QC"})
    .setIssuer("QTM38LJQ3P")
    .setIssuedAt(datetime)
    .setExpirationTime('1d')
    .sign(ecPrivateKey)
    .then((jwt : string) => {
      this.setupapple(jwt);
    });
  }

  setupapple(devToken: string) {
    let music: any;
    MusicKit.configure({
    developerToken: devToken, //eyJhbGciOiJFUzI1NiIsImtpZCI6IlczU1pQRDMyUUMifQ.eyJpc3MiOiJRVE0zOExKUTNQIiwiaWF0IjoxNjQ5NzI2OTgzLCJleHAiOjE2NTE0NTQ5ODN9.5NYNeKqUBJCRLKhRdqhD3lFdIH02tnbk8RrW6LpinjH-EpVDF3lRfBwjjsrleXjK2l0QRKtmLGwBigWuc5bTaA
    app: {
        name: 'My Cool Web App',
        build: '2022.4.11',
    },
    storefrontId: 'us'
    }).then((instance: any) => {
      music = instance;
      music.authorize()
      .then(() => this.setMusicKitInstance(music))
      .catch(function(error: any) {
        console.error(error);
      });
    });
}
}
