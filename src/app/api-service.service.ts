import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  public getQuery(query: string){
    const url: string = `https://api.spotify.com/v1/'${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_TOKEN'
    })
  
    return this.http.get(url, { headers})
  }
}
