import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Client } from 'elasticsearch-browser';
// import * as Client from 'elasticsearch';
// import * as elasticsearch from 'elasticsearch-browser';
@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {
  private _client;
  private user;
  public connectionString = 'https://site:d81df12619fece0e733b67175bda3698@gloin-eu-west-1.searchly.com';

  _index = 'events';
  _type = 'users';


  constructor(private http: Http) {
      this._connect();
   }

   private _connect () {
     this._client =  new Client({
                        host: this.connectionString,
                        log: 'trace'
                     });

   }

   setUser(user) {
       this.user = user;
   }

   getUser() {
       return this.user;
   }
  getGeoCode(address): Observable<any> {
      const key = 'AIzaSyCXlzLSm5F9D0W16PcX-FQQGi9W51E2SLM';
      let url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=`;
      url = url + encodeURIComponent(address);

      return this.http.get(url);
  }

  getAllDocuments(index, type, distance, coord) {
    const queryalldocs = {
        'query': {
          'filtered': {
            'filter': {
              'geo_distance': {
                'distance': distance,
                'location': {
                  'lat':  coord.lat,
                  'lon': coord.lon
                }
              }
            }
          }
        }
  };
    return this._client.search({
        index: index,
        type: type,
        body: queryalldocs
      });
  }
  addToIndex(value): any {
    return this._client.create(value);
  }
}
