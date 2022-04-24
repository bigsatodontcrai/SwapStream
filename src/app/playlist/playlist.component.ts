import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit, OnChanges {
  
  @Input() public set json(val: string){
    this.title = val;
    this.owner = "dog";
    this.source = "king";
    console.log(val)
  }
  title : string = '';
  owner : string = '';
  source : string = '';

  
 
  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    
  }

}
