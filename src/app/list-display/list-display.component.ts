import { Component, OnInit, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { SearchModuleComponent } from '../search-module/search-module.component'
import { playlist } from "../playlist"
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit, OnChanges {
  @Input() source?: string;
  @Input() search = false;
  @Input() song_display = false;
  @ViewChild(SearchModuleComponent, { static: true }) searchModule !: SearchModuleComponent;
  @Input() json: any | object;
  isAM = false;
  selected_list = 0;
  selected_owner = '';
  selected_img = '';
  song_list: any[] = [];
  @Input() song_list2: any[] = [];
  playlist = [];
  navigate = false;
  @Output() newItemEvent = new EventEmitter<any[]>()
  @Output() newCreateEvent = new EventEmitter<boolean>()
  @Output() updateLibraryEvent = new EventEmitter<boolean>()

  @Input() create = false; // activates create mode
  @Input() song_urls: string[] = []; // will use ngFor in create mode
  create_playlist_name = '';

  @Input() most_recent: any[] = [];

  constructor(public http:HttpClient) { }

  Playlist: playlist[] = []

  ngOnInit(): void {
  }

  clear(): void {
    this.song_list = [];
  }

  setName(event: any): void {
    this.create_playlist_name = event;
    console.log(this.create_playlist_name)
  }

  ngOnChanges(): void {
    console.log("list-display change detected. New json value: " + JSON.stringify(this.json))
    if(this.create==true){
      if(this.navigate==true){
        this.navigate = false;
      }
    }
    console.log(this.song_list)
    if(this.create && this.most_recent!=[]){
      this.song_list.push(this.most_recent)
      this.most_recent = []
      this.song_list = this.song_list.filter((songs)=>{
        return songs.length != 0
      })
      console.log(this.song_list)
    }
  }

  setSongList(item: any[]){
    this.song_list.push(item)

  }

  sendBackIndices(event: any): void {
    let item: any[] = [];
    item.push(this.selected_list)
    item.push(event)
    this.newItemEvent.emit(item)
  }

  select(index: number): void {
    this.selected_list = index;
    this.song_list = this.json.playlists[this.selected_list]
    //console.log(this.json.playlists[this.selected_list])
    this.navigate = true;
    const item = this.song_list[1]
    //console.log(item.info)
    this.selected_owner = item.info[0].name
    this.selected_img = item.image
  }

  set(): void {
    //this.song_list2 = this.json.query
    //console.log(this.song_list2)
  }

  done(): void {
    //console.log(this.json.playlists)
    this.playlist = this.json.playlists
  }

  spotifyAdd(){
    console.log("sending")
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    let item = { name: this.create_playlist_name, songs: this.song_list}
    const url: string = 'http://127.0.0.1:5000/spotify/add';
    
    return this.http.post<object>(url, item);
  }

  appleAdd(){

  }

  onSubmit(name: any){
    this.create_playlist_name = name
    if(name==''){
      console.error("No Name")
      return;
    }
    if(!this.isAM){
      const subscriber = this.spotifyAdd();
      subscriber.subscribe({
        next: (response: any)=>{
          this.clear()
          console.log(response)//response will be the new playlist info to push to the front of the list.
        }, error: () => {
          console.error("ting")
        }
      })
    } else {
      this.appleAdd();
    }
    this.newCreateEvent.emit(false)
  }

  itemTest(): void {

  }

  goBack(): void {
    this.navigate = false;
  }

  createPlaylist(): void {

  }

}
