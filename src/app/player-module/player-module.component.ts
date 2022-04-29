import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-player-module',
  templateUrl: './player-module.component.html',
  styleUrls: ['./player-module.component.css']
})
export class PlayerModuleComponent implements OnInit {
  @Input() service = '';
  @Input() appleMusicKit: any;
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

}
