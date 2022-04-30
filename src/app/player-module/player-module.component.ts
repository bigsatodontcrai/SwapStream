import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-player-module',
  templateUrl: './player-module.component.html',
  styleUrls: ['./player-module.component.css']
})
export class PlayerModuleComponent implements OnInit {
  @Input() service = '';
  @Input() appleMusicKit: any;
  @Output() newItemEvent = new EventEmitter<any>();
  json : any;
  toggleSpotify = false;
  toggleApple = false;
  constructor() { }

  ngOnInit(): void {
    if(this.service == 'Spotify'){
      this.toggleSpotify = true;
    } else if(this.service == 'Apple') {
      this.toggleApple = true;
    }
  }

  getAppleList(json: any){
    this.json = json
    this.sendAppleList()
  }

  sendAppleList(){
    this.newItemEvent.emit(this.json)
  }

}
