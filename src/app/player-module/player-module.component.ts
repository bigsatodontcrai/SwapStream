import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { AppleMusicKitComponent } from '../apple-music-kit/apple-music-kit.component';


@Component({
  selector: 'app-player-module',
  templateUrl: './player-module.component.html',
  styleUrls: ['./player-module.component.css']
})
export class PlayerModuleComponent implements OnInit, OnChanges {
  @Input() service = '';
  @Input() appleMusicKit: any;
  @Output() newItemEvent = new EventEmitter<any>();
  @ViewChild(AppleMusicKitComponent, {static: false}) kitModule !: AppleMusicKitComponent;
  json : any;
  toggleSpotify = false;
  toggleApple = false;
  @Input() indices:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    
  }

  getAppleList(json: any){
    this.json = json
    this.sendAppleList()
  }

  sendAppleList(){
    
    this.newItemEvent.emit(this.json)
    
      
  }

  playAppleList(indices:any[]){
    console.log(indices)
    this.kitModule.playFromPlist(indices)
  }



}
