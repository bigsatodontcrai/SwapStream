import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-streaming-api',
  templateUrl: './streaming-api.component.html',
  styleUrls: ['./streaming-api.component.css']
})
export class StreamingAPIComponent implements OnInit {

  
  


  constructor() { }

  ngOnInit(): void {
    // let data = this.__getToken()
    // console.log(data)
    
  }

  // async __getToken() {
    // const result = await fetch('https://accounts.spotify.com/api.token', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type' : 'application/x-www-form-urlencoded',
    //     'Authorization' : 'Basic' + btoa(this.client_id + ':' + this.client_secret)
    //   },
    //   body: 'grant-type=client_credentials'
    // })
    // const data = await result.json();
    // return data.access_token
  // }

}
