import { Component, Input, OnInit } from '@angular/core';
import * as jose from 'jose';
import { songArtDataType } from './song-art-data';
import { ArtworkSource } from 'src/assets/artwork-source-enum'
declare var MusicKit: any;

@Component({
  selector: 'app-apple-music-kit',
  templateUrl: './apple-music-kit.component.html',
  styleUrls: ['./apple-music-kit.component.css']
})
export class AppleMusicKitComponent implements OnInit {

  privateKeystring = '-----BEGIN PRIVATE KEY----- MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg8OljcWCOgxqqeqfDzxLQhGi5ibIscIGvyBYMD76VuNCgCgYIKoZIzj0DAQehRANCAATcbMVuB26hZ81i8E0KuzMD3HmXgXSIXV2NXDaqeuQgRapIRwHTOAVkI5nERowNgODqDL1DXRmyOpUNgjXEsbWs -----END PRIVATE KEY-----';
  @Input() appleMusicKit: any;
  musicPlaying = false;
  musicAlreadyQueued = false;
  playButtonText = 'fa fa-play';
  songArtData: songArtDataType;
  currentQueue: any;

  constructor() {
    this.songArtData = {
      height: 2400,
      url: ' ',
      width: 2400
    }
  }

  ngOnInit(): void {
    // this.createdevtoken();
  }

  // This is called during initializeAppleMusicKit in order to give the component access the MusicKit
  setMusicKitInstance(kit: any) {
    this.appleMusicKit = kit;
  }

  async handlePlayButtonClicked() {
    if (!this.musicAlreadyQueued) {
      this.queueSongsFromUserStation(() => this.playPauseMusic());
    } else {
      this.playPauseMusic();
    }
  }

  playPauseMusic() {
    this.testAppleFunctions();
    const music = this.appleMusicKit;
    if (this.musicPlaying === true) {
      music.pause();
      this.musicPlaying = false;
      this.playButtonText = 'fa fa-play';
    } else {
      music.play();
      this.musicPlaying = true;
      this.playButtonText = 'fa fa-pause';
    }
  }

  testAppleFunctions() {
    const music = this.appleMusicKit;
    music.api.music('/v1/me/library/songs').then((result: any) => {
      console.log("Songs:");
      console.log(result);
    }).catch((error: any) => console.error(error));
    music.api.music('/v1/me/library/playlists').then((result: any) => {
      console.log("Playlists:");
      console.log(result);
      const playlistID = result['data']['data'][0]['id'];
      music.api.music(`/v1/me/library/playlists/${playlistID}/tracks`)
        .then((results: any) => {
          music.playNext({ song: results.data.data[0].id }).catch((error: any) => console.error(error));
          music.playNext({ song: results.data.data[1].id })
            .then((queue: any) => {
              console.log("Queue:");
              console.log(queue);
              this.displaySongArt(ArtworkSource.SONG, queue._queueItems[0].item);
            })
            .catch((error: any) => console.error(error));
        })
        .catch((error: any) => {
          console.error(error);
        });
    })
      .catch((error: any) => console.error(error));
  }

  displaySongArt(sourceType: ArtworkSource, payload: any) {
    let artworkData: songArtDataType;
    switch (sourceType) {
      case ArtworkSource.SONG:
        artworkData = payload['attributes']['artwork'];
        if (artworkData !== undefined) {
          this.formatArtworkUrl(artworkData);
          this.songArtData = artworkData;
        }
        else {
          console.warn(`Something went wrong when retrieving the artwork for the current song: ${payload['attributes']['name']}.`);
        }
        break;
      case ArtworkSource.ALBUM:
        break;
      case ArtworkSource.STATION:
        artworkData = payload['data']['data'][0]['attributes']['artwork'];
        if (artworkData !== undefined) {
          this.formatArtworkUrl(artworkData);
          this.songArtData = artworkData;
        }
        else {
          console.warn(`Something went wrong when retrieving the artwork for the current station: ${payload['data']['data'][0]['id']}.`);
        }
        break;

      default:
        break;
    }
  }

  formatArtworkUrl(artData: songArtDataType): void {
    artData.url = artData.url.replace('{w}x{h}', `${artData.width}x${artData.height}`);
  }

  async queueSongsFromUserStation(_callback: () => void) {
    const music = this.appleMusicKit;
    music.api.music('/v1/catalog/{{storefrontId}}/stations', {
      'filter[identity]': 'personal',
    }).then((output: any) => {
      this.displaySongArt(ArtworkSource.STATION, output);
      const stationID = output['data']['data'][0]['id'];
      if (stationID !== undefined) {
        music.setQueue({ station: stationID }).then((queue: any) => {
          this.musicAlreadyQueued = true;
          music.playNext({ song: queue['_itemIDs'][0] })
            .then(_callback())
            .catch((error: any) => console.error(error));
        });

      } else {
        console.error("Unable to retrieve station data.");
      }
    })
      .catch((error: any) => console.error(error));
  }

  // async createdevtoken() {
  //   let datetime = Date.parse(Date()) / 1000;
  //   const ecPrivateKey = await jose.importPKCS8(this.privateKeystring, 'ES256')

  //   await new jose.SignJWT({})
  //     .setProtectedHeader({ alg: 'ES256', kid: "W3SZPD32QC" })
  //     .setIssuer("QTM38LJQ3P")
  //     .setIssuedAt(datetime)
  //     .setExpirationTime('1d')
  //     .sign(ecPrivateKey)
  //     .then((jwt: string) => {
  //       this.initializeAppleMusicKit(jwt);
  //     });
  // }

  // initializeAppleMusicKit(devToken: string) {
  //   let music: any;
  //   MusicKit.configure({
  //     developerToken: devToken,
  //     app: {
  //       name: 'My Cool Web App',
  //       build: '2022.4.11',
  //     },
  //     storefrontId: 'us'
  //   }).then((instance: any) => {
  //     music = instance;
  //     music.authorize()
  //       .then(() => this.setMusicKitInstance(music))
  //       .catch(function (error: any) {
  //         console.error(error);
  //       });
  //   });
  // }
}
