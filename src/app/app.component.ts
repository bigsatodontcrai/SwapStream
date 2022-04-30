import { Component, AfterViewChecked, ViewChild, Renderer2, ElementRef, QueryList, Inject, ViewContainerRef, Injectable } from '@angular/core';
import { NService } from './n.service'
import { WindowComponent } from './window/window.component'
import { LoginPageDirective } from './login-page.directive'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiServiceService } from './api-service.service';
import { HttpHeaders } from '@angular/common/http';
import { SearchModuleComponent } from './search-module/search-module.component'
import * as jose from 'jose';
import { AppleMusicKitComponent } from './apple-music-kit/apple-music-kit.component';
declare var MusicKit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SwapStream';
  userlogin = false;
  item: any;
  privateKeystring = '-----BEGIN PRIVATE KEY----- MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg8OljcWCOgxqqeqfDzxLQhGi5ibIscIGvyBYMD76VuNCgCgYIKoZIzj0DAQehRANCAATcbMVuB26hZ81i8E0KuzMD3HmXgXSIXV2NXDaqeuQgRapIRwHTOAVkI5nERowNgODqDL1DXRmyOpUNgjXEsbWs -----END PRIVATE KEY-----';
  appleMusicKit: any;
  isAM = false;

  @ViewChild('div') div!: ElementRef;
  @ViewChild(LoginPageDirective, { static: true }) appLoginPage !: LoginPageDirective;
  @ViewChild(SearchModuleComponent, { static: true }) searchModule !: SearchModuleComponent;
  @ViewChild(AppleMusicKitComponent, { static: true}) amk !: AppleMusicKitComponent;
  // @ViewChild(LoaderDirective) appLoader !: LoaderDirective;

  //@ViewChildren('child', {read: ElementRef}) childComp:QueryList<ElementRef>
  constructor(public http: HttpClient, private renderer: Renderer2, private host: ElementRef) {

  }

  ngOnInit(): void {
    this.createAppleDevToken();
  }

  initializeSpotify() {
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    const url: string = 'http://127.0.0.1:5000/spotify';

    return this.http.get(url, { responseType: 'json', headers: headers });
  }

  initializeSpotifyPlaylists() {
    const headers = new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    const url: string = 'http://127.0.0.1:5000/spotify/playlists';

    return this.http.get(url, { responseType: 'json', headers: headers });
  }

  async createAppleDevToken() {
    let datetime = Date.parse(Date()) / 1000;
    const ecPrivateKey = await jose.importPKCS8(this.privateKeystring, 'ES256')

    await new jose.SignJWT({})
      .setProtectedHeader({ alg: 'ES256', kid: "W3SZPD32QC" })
      .setIssuer("QTM38LJQ3P")
      .setIssuedAt(datetime)
      .setExpirationTime('1d')
      .sign(ecPrivateKey)
      .then((jwt: string) => {
        this.initializeAppleMusicKit(jwt);
      });
  }

  initializeAppleMusicKit(devToken: string) {
    MusicKit.configure({
      developerToken: devToken,
      app: {
        name: 'Swapstream',
        build: '1.0.0',
      },
      storefrontId: 'us'
    }).then((instance: any) => {
      this.setMusicKitInstance(instance);
    });
    
  }

  setMusicKitInstance(kit: any) {
    this.appleMusicKit = kit;
    
  }

  loadApple() {
    this.isAM = true;
    console.log(this.appleMusicKit)
    this.appleMusicKit.authorize()
      .then(() => {
        console.log("Apple Music Authorized Successfully");
        this.userlogin = true;
      })
      .catch((error: string) => console.error('Apple music failed to authorize' + error));
  }

  loadSpotify() {
    this.isAM = false;
    let thing = this.initializeSpotify();
    let item: any;
    thing.subscribe({
      next: (response: any) => {
        this.userlogin = true;
        console.log(item);
      },
      error: (error: any) => {
        console.error('Request failed bozo!: ' + error);
      }
    });
    this.loadSpotifyPlaylists()
  }

  loadSpotifyPlaylists() {
    let thing = this.initializeSpotifyPlaylists();
    let item: any;
    thing.subscribe({
      next: (response: any) => {
        
        item = response;
        console.log(item);
        this.item = item;
        this.userlogin = true;
      },
      error: (error: any) => {
        console.error('Request failed bozo!: ' + error);
      }
    }
    );
  }
}
