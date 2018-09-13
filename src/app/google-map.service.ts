import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client } from 'elasticsearch';
@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {
  private _client: Client;
  
  connectionString = 'https://site:ea070f764e629c711854c9e4504c5130@gloin-eu-west-1.searchly.com';
  client = new this._client.Client({
              host: this.connectionString,
              log: 'debug'
          });
  _index = "events";
  _type = 'users';
  constructor(private http: Http) { }

  getGeoCode(address): Observable<any>{
      const key = 'AIzaSyCXlzLSm5F9D0W16PcX-FQQGi9W51E2SLM';
      let url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=`;
      url = url + encodeURIComponent(address);

      return this.http.get(url);
  }
}
