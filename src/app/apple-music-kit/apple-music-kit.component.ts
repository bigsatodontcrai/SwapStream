import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as jose from 'jose';
import { songArtDataType } from './song-art-data';
import { ArtworkSource } from 'src/assets/artwork-source-enum'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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
  indices: any[] = [];
  hreflist: string[] = [];
  queue: any;
  obj: { [k: string]: any } = {}
  appleUsername: string | undefined;

  @Output() newItemEvent = new EventEmitter<any>();

  constructor(public http:HttpClient) {
    this.songArtData = {
      height: 2400,
      url: ' ',
      width: 2400
    }
  }

  ngOnInit(): void {
    const music = this.appleMusicKit;
    music.api.music('/v1/catalog/{{storefrontId}}/stations', {
      'filter[identity]': 'personal',
    })
      .then((output: any) => this.appleUsername = output.data.data[0].attributes.name.split('’')[0]) // super scuffed hacky way of getting the username because APPLE DOES NOT GIVE IT TO YOU
      .then(() => {
        this.getPlaylists()
          .catch((error: any) => {
            console.error("Couldn't get lists. Error: " + error)
          })
      })
      .catch((error: any) => console.error(error));
  }

  // This is called during initializeAppleMusicKit in order to give the component access the MusicKit
  setMusicKitInstance(kit: any) {
    this.appleMusicKit = kit;
  }

  async handlePlayButtonClicked() {
    if (!this.musicAlreadyQueued) {
      this.queueSongsFromUserStation(() => this.playPauseMusic()).catch((error: any) => console.error(error));
    } else {
      this.playPauseMusic();
    }
  }

  async handleNextSongButtonClicked() {
    const music = this.appleMusicKit;
    music.skipToNextItem()
      .then(() => {
        this.musicPlaying = true;
        this.playButtonText = 'fa fa-pause';
        if (!music.queue.isEmpty) {
          const currentSong = music.queue["_queueItems"][music.queue.position]["item"];
          this.displaySongArt(ArtworkSource.SONG, currentSong)
        }
      })
      .catch((error: any) => console.error(error));
  }

  async handlePreviousSongButtonClicked() {
    const music = this.appleMusicKit;
    music.skipToPreviousItem()
      .then(() => {
        this.musicPlaying = true;
        this.playButtonText = 'fa fa-pause';
        if (!music.queue.isEmpty) {
          const currentSong = music.queue["_queueItems"][music.queue.position]["item"];
          this.displaySongArt(ArtworkSource.SONG, currentSong)
        }
      })
      .catch((error: any) => console.error(error));
  }

  async queueSongsFromPlaylists(plist_id: string, song: number, _callback: () => void) {
    const music = this.appleMusicKit
    // const url = `https://itunes.apple.com/us/playlist/${plist_id}`;
    this.musicPlaying = false;
    music.setQueue({ playlist: plist_id, startPosition: song }).then((queue: any) => {
      this.musicAlreadyQueued = true;
      // console.log(music.queue)
      this.queue = music.queue
      // console.log(this.queue._dispatcher.events.nowPlayingItemDidChange)
      music.addEventListener('nowPlayingItemDidChange', () => {
        this.displaySongArt(ArtworkSource.SONG, this.queue.currentItem)
      })


      //console.log(queue._dispatcher.subscribe())
      music.playNext({ song: queue['_itemIDs'][0] })
        .then(_callback())
        .catch((error: any) => console.error(error))
    }).catch((error: any) => console.error(error))

  }

  playFromPlist(indices: any[]) {
    // console.log("WE in it")
    // console.log(indices)
    const plist_id = this.global_id_list[indices[0]]
    const song_id = indices[1]
    // console.log(plist_id)
    this.queueSongsFromPlaylists(plist_id, song_id, () => this.playPauseMusic())

  }

  playPauseMusic() {
    const music = this.appleMusicKit;
    if (!music.queue.isEmpty) {
      let pos = 0
      if (music.queue.position > 0) { // for some reason it goes to -1 sometimes
        pos = music.queue.position
      }
      const currentSong = music.queue["_queueItems"][pos]["item"];
      this.displaySongArt(ArtworkSource.SONG, currentSong)
    }
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
        // console.log(artworkData)
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

  async getPlaylistCover(plist_id: string) {

  }

  getUser(item: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    const url: string = 'http://127.0.0.1:5000/users/' + item;

    return this.http.get(url, { responseType: 'json', headers: headers })

  }

  postUser(id: string, name: string, service: string, pfp: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    const url: string = 'http://127.0.0.1:5000/add-user/';
    const item = {
      user_id: id,
      user_name: name,
      service: service,
      pfp: pfp
    }
    console.log(item)

    return this.http.post(url, item)
  }

  subscribeGetUser(item: any){
    let user = this.getUser(item.user);
    user.subscribe({
      next: (response: any) => {
        console.log(response)
      }, error: (error: any) => {
        let userPost = this.postUser(item.user, item.username, item.service, item.pfp)
        userPost.subscribe({
          next: (response: any) => {
            console.log(response)
          }, error: (error: any) => {
            console.error(error)
          }
        })
      }
    })
  }

  async getPlaylists() {
    const music = this.appleMusicKit;
    music.api.music('/v1/me/library/playlists').then((result: any) => {
      console.log("Playlists:");
      console.log(result);

      const playlists = result['data']['data'];
      playlists.forEach((value: any) => {
        // console.log(value)
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
        this.obj = {
          info: [
            {
              name: this.appleUsername !== undefined ? this.appleUsername : "Name",
              service: 'Apple Music',
              id: '0'
              
            }
          ],
          plist_id: value.id,
          image: '',
          profile_image: 'https://logos-world.net/wp-content/uploads/2020/11/Apple-Music-Logo-2015-present.png'
        }
        let tempObj = {
          username: this.appleUsername !== undefined ? this.appleUsername : "Name",
          service: 'Apple Music',
          user: '0',
          pfp: 'https://logos-world.net/wp-content/uploads/2020/11/Apple-Music-Logo-2015-present.png'
        }
        console.log(this.obj)
        this.subscribeGetUser(tempObj)
        temp.push(this.obj)
        this.playlists.push(temp)
      });

      return this.populatePlaylists().then(() => {

        this.json['playlists'] = this.playlists
      })

    }).catch((error: any) => {
      console.error(error)
    });
  }

  async populatePlaylists() {
    const music = this.appleMusicKit
    let promises: any[] = [];
    this.idlist.forEach((playlistID, index) => {
      promises.push(
        music.api.music(`/v1/me/library/playlists/${playlistID}/tracks`)
          .then((results: any) => {
            let songlist = results['data']['data']
            let songArt = songlist[0]['attributes']['artwork'];
            this.formatArtworkUrl(songArt);
            const url = songArt['url'];
            this.obj['image'] = url;
            this.playlists[index][1] = this.obj

            songlist.forEach((song: any, j: number) => {
              let item: string[] = []
              item.push(song.attributes.name)
              item.push(song.attributes.artistName)
              this.playlists[index].push(item)
            });
            //this.playlists[index].push(results)

          })
          .catch((error: any) => console.error(error))
      )
    })
    return Promise.all(promises).then(() => {
      // console.log(this.playlists)
      // console.log("event")
      this.newItemEvent.emit(this.json)
    })
  }

  searchAppleCatalog(searchTerm: string, searchType?: string, resultsLimit?: number) {
    const types = searchType !== undefined ? searchType : "songs,albums,artists";
    const limit = resultsLimit !== undefined && resultsLimit < 26 && resultsLimit > 1 ? resultsLimit : 25;
    const music = this.appleMusicKit;
    return new Promise((resolve, reject) => {
      music.api.music(`/v1/catalog/us/search?types=${types}&term=${searchTerm}&limit=${limit}`)
        .then((results: any) => resolve(results))
        .catch((error: any) => reject(error));
    });
  }

  createApplePlaylist(playlistData: any[]) {
    const music = this.appleMusicKit;
    const playlistName: string = playlistData[0] != "" ? playlistData[0] : "SwapStream Generated Playlist " + Date.prototype.toLocaleDateString();
    return new Promise((resolve, reject) => {
      const songData = playlistData.slice(2); // The first two items are playlist metadata
      let songIDs: any = [];
      this.findBestSongTitleMatchForAllSongs(songData, songIDs, 0)
        .then((ids: any) => {
          const songObjArray = songIDs.map((songID: any) => {
            return {
              id: songID,
              type: 'songs'
            };
          });

          const postRequestBody = {
            attributes: {
              name: playlistName,
              description: 'Playlist created using the SwapStream service.'
            },
            relationships: {
              tracks: {
                data: songObjArray
              }
            }
          };

          const headers = {
            'Authorization': `Bearer ${music.developerToken}`,
            'Music-User-Token': `${music.musicUserToken}`
          };

          const requestOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postRequestBody),
          }

          fetch(`https://api.music.apple.com/v1/me/library/playlists`, requestOptions)
            .then((response: any) => response.body)
            .then(rb => {
              const reader = rb.getReader();

              return new ReadableStream({
                start(controller) {
                  function push() {
                    reader.read().then((read: any) => {
                      if (read.done) {
                        controller.close();
                        return;
                      }
                      controller.enqueue(read.value);
                      push();
                    })
                  }
                  push();
                }
              });
            })
            .then(stream => {
              return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
            })
            .then(result => {
              const playlistCreationResponse = JSON.parse(result);
              resolve(playlistCreationResponse.data[0].id);
            })
            .catch((error: any) => reject(error));
        })
        .catch((error: any) => reject(error));
    });
  }

  findBestSongTitleMatchForAllSongs(songData: any, songIDs: any[], index: number) {
    return new Promise((resolve, reject) => {
      if (index == songData.length) {
        if (songIDs.length > 0) {
          resolve(songIDs);
        }
        reject('Failed to aquire any song IDs');
      }
      const searchTerm = songData[index][0]; // Song title
      this.searchAppleCatalog(searchTerm, "songs")
        .then((searchResults: any) => {
          const potentialMatches: any[] = searchResults.data.results.songs.data;
          this.findBestSongTitleMatch(searchTerm, potentialMatches, 0)
            .then(songID => songIDs.push(songID))
            .catch(error => console.error(error))
        })
        .catch((error: any) => console.error(error))
        .finally(() => {
          this.findBestSongTitleMatchForAllSongs(songData, songIDs, ++index)
            .then(resolution => resolve(resolution))
            .catch(rejection => reject(rejection));
        });
    })
  }

  findBestSongTitleMatch(searchTerm: string, potentialMatches: any, iteration: number) {
    return new Promise((resolve, reject) => {
      if (iteration == potentialMatches.length) {
        reject(`No match found for song title: ${searchTerm}`);
      }
      const song = potentialMatches[iteration];
      if (song.attributes.name.toLowerCase() == searchTerm.toLowerCase()) {
        resolve(song.id);
      }
      else {
        this.findBestSongTitleMatch(searchTerm, potentialMatches, ++iteration)
          .then(output => resolve(output))
          .catch(failure => reject(failure));
      }
    });
  }
  // EOF
}
