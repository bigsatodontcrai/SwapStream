import { Component, OnInit, Input } from '@angular/core';
import {playlist} from "../playlist"

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  @Input() source?:string;
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

}
