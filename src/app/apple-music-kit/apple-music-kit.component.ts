import { Component, OnInit } from '@angular/core';
let music: MusicKit.MusicKitInstance;


@Component({
  selector: 'app-apple-music-kit',
  templateUrl: './apple-music-kit.component.html',
  styleUrls: ['./apple-music-kit.component.css']
})
export class AppleMusicKitComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setupapple();
  }
  
  setupapple() {
    document.addEventListener('musickitloaded', function () {
        // MusicKit global is now defined.
    
        // Call configure() to configure an instance of MusicKit JS.
        music = MusicKit.configure({
        developerToken: '',
        app: {
            name: 'My Cool Web App',
            build: '2022.4.11',
        },
        storefrontId: '1'
        })
    });
  }
}
