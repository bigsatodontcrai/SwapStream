import { Component, OnInit } from '@angular/core';
import * as jose from 'jose'

//let music: MusicKit.MusicKitInstance;


@Component({
  selector: 'app-apple-music-kit',
  templateUrl: './apple-music-kit.component.html',
  styleUrls: ['./apple-music-kit.component.css']
})
export class AppleMusicKitComponent implements OnInit {

  Devtoken = '';
  privateKeystring = '-----BEGIN PRIVATE KEY----- MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg8OljcWCOgxqqeqfDzxLQhGi5ibIscIGvyBYMD76VuNCgCgYIKoZIzj0DAQehRANCAATcbMVuB26hZ81i8E0KuzMD3HmXgXSIXV2NXDaqeuQgRapIRwHTOAVkI5nERowNgODqDL1DXRmyOpUNgjXEsbWs-----END PRIVATE KEY-----';

  constructor() { }

  ngOnInit(): void {
    this.creatdevtoken()
    //this.setupapple();
  }

  async creatdevtoken()
  {
    let datetime = Date.parse(Date())/1000;
    const ecPrivateKey = await jose.importPKCS8(this.privateKeystring, 'ES256')

    const Devtoken = await new jose.SignJWT({})
    .setProtectedHeader({ alg: 'ES256', kid: "W3SZPD32QC"})
    .setIssuedAt(datetime)
    .setIssuer('QTM38LJQ3P')
    .setExpirationTime('20d')
    .sign(ecPrivateKey)

    console.log(Devtoken)
  }

  /*setupapple() {
    document.addEventListener('musickitloaded', function () {
        // MusicKit global is now defined.
    
        // Call configure() to configure an instance of MusicKit JS.
        music = MusicKit.configure({
        developerToken: '',
        app: {
            name: 'My Cool Web App',
            build: '2022.4.11',
        },
        storefrontId: 'us'
        })
    });
  }*/
  
}
