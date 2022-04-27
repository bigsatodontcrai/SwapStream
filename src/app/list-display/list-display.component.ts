import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchModuleComponent } from '../search-module/search-module.component'
import {playlist} from "../playlist"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  @Input() source?:string;
  @Input() search = false;
  @Input() song_display = false;
  @ViewChild(SearchModuleComponent, { static: true }) searchModule !: SearchModuleComponent;
  @Input() json : any;
  selected_list = 0;
  playlist = [];
  constructor() { }

  Playlist: playlist[] = []

  ngOnInit(): void {
    if(this.source == "apple")
    {
      this.appleplaylist()
    }
    if(this.source == "spotify")
    {
      this.spotifyplaylist()
    }
  }

  select(index:number): void{
    this.selected_list = index;
  }

  done(): void {
    console.log(this.json.playlists)
    this.playlist = this.json.playlists
  }

  appleplaylist(){

    for (let i = 0; i < 11; i++) {
      this.Playlist.push({title: "pog"+i, owner: "josh", source: "apple"})
    }

    console.log("apple playlist created");
  }

  spotifyplaylist(){

    for (let i = 0; i < 11; i++) {
      this.Playlist.push({title: "nice"+i, owner: "josh", source: "spotify"})
    }

    console.log("spotify playlist created");
  }

}
