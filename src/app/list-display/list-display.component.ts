import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchModuleComponent } from '../search-module/search-module.component'
import {playlist} from "../playlist"

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  @Input() source?:string;
  @ViewChild(SearchModuleComponent, { static: true }) searchModule !: SearchModuleComponent;
  @Input() json : any;
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

  done(): void {
    console.log(this.json.playlists)
    this.playlist = this.json.playlists
  }

}
