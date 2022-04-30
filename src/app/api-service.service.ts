import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  public getSpotifyAuth() {
    const url: string = 'http://127.0.0.1:5000/senditem/'
    return this.http.get(url)
  }

  public getQuery(query: string) {
    const url: string = `https://api.spotify.com/v1/'${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_TOKEN'
    })

    return this.http.get(url, { headers })
  }
}
