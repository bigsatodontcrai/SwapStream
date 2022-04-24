import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit, OnChanges {
  
  @Input() playlist = [];

  title = '';
  @Input() owner = '';
  @Input() source = '';
 
  constructor() { 
    
  }

  ngOnInit(): void {
    this.title = this.playlist[0];
  }

  ngOnChanges() {
    
  }

}
