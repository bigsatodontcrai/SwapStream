import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  idlist: string[] = [];
  global_id_list: string[] = [];
  namelist: string[] = [];
  playlists: any[][] = [];
  json: { [k: string]: any } = {}
  indices:any[] = [];
  hreflist: string[] = [];

  @Output() newItemEvent = new EventEmitter<any>();

  constructor() {
    this.songArtData = {
      height: 2400,
      url: ' ',
      width: 2400
    }
  }

  ngOnInit(): void {
    // this.createdevtoken();
    this.onLoad()
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

  async queueSongsFromPlaylists(plist_id:string, song: number, _callback: () => void){
    const music = this.appleMusicKit
    const url = `https://itunes.apple.com/us/playlist/${plist_id}`;
    this.musicPlaying = false;
    music.setQueue({playlist: plist_id, startPosition: song}).then((queue: any)=>{
      this.musicAlreadyQueued = true;
      console.log("hi")
      console.log(music.queue)
      queue = music.queue
      this.displaySongArt(ArtworkSource.SONG, queue.currentItem)
      queue._dispatcher.subscribe(queue._dispatcher.events.nowPlayingItemDidChange, ()=>{
        this.displaySongArt(ArtworkSource.SONG, queue.currentItem)
      })
      //console.log(queue._dispatcher.subscribe())
      music.playNext({song: queue['_itemIDs'][0]})
        .then(_callback())
        .catch((error: any) => console.error(error))
    }).catch((error: any) => console.error(error))
      
  }

  playFromPlist(indices: any[]){
    console.log("WE in it")
    console.log(indices)
    const plist_id = this.global_id_list[indices[0]]
    const song_id = indices[1]
    console.log(plist_id)
    this.queueSongsFromPlaylists(plist_id, song_id, ()=>this.playPauseMusic())
  
  }

  

  playPauseMusic() {
    //this.testAppleFunctions();
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
          console.log(results)
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

  async getPlaylistCover(plist_id: string){

  }

  async getPlaylists() {
    const music = this.appleMusicKit;
    music.api.music('/v1/me/library/playlists').then((result: any) => {
      console.log("Playlists:");
      console.log(result);
      const playlistID = result['data']['data'][0]['id'];
      const playlists = result['data']['data'];
      playlists.forEach((value:any)=>{
        console.log(value)
        this.hreflist.push(value.href)
        //console.log(value.href)
        //console.log(value.id)
        //console.log(value.attributes.playParams.globalId)
        this.global_id_list.push(value.attributes.playParams.globalId)
        this.idlist.push(value.id)
        //console.log(value.attributes.name)

        this.namelist.push(value.attributes.name)
        let temp: any[] = []
        temp.push(value.attributes.name)
        let my_obj = {
          info: [
            {
              name: 'Name',
              service: 'Apple Music',
              id: 0
            }
          ],
          image: '',
          profile_image: ''
        }
        temp.push(my_obj)
        this.playlists.push(temp)
      });
      
      return this.populatePlaylists().then(()=>{
        
        this.json['playlists'] = this.playlists
      })
      
    }).catch((error: any) => {
      console.error(error)
    });
  }

  async populatePlaylists(){
    const music = this.appleMusicKit
    let promises:any[] = [];
    this.idlist.forEach((playlistID, index)=>{
      promises.push(
      music.api.music(`/v1/me/library/playlists/${playlistID}/tracks`)
        .then((results: any)=>{
          //console.log(results)
          const songlist = results['data']['data']
          songlist.forEach((song:any) => {
            let item:string[] = []
            item.push(song.attributes.name)
            item.push(song.attributes.artistName)
            this.playlists[index].push(item)
          });
          //this.playlists[index].push(results)
          
        })
        .catch((error: any) => console.error(error))
      )
    })
    return Promise.all(promises).then(()=>{
      console.log(this.playlists)
      console.log("event")
      this.newItemEvent.emit(this.json)
    })
  }

  onLoad(){
    this.getPlaylists().then(()=>{
      console.log("here")
      console.log(this.json)
      
    }).catch(()=>{
      console.error("Couldn't get lists")
    })
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
