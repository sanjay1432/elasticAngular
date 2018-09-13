import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Client } from 'elasticsearch-browser';
import * as elasticsearch from 'elasticsearch-browser';
@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {
  private _client;

  public connectionString = 'https://site:d81df12619fece0e733b67175bda3698@gloin-eu-west-1.searchly.com';

  _index = 'events';
  _type = 'users';
  constructor(private http: Http) {
   }

   private _connect () {
     this._client =  new elasticsearch.Client({
                        host: this.connectionString,
                        log: 'trace'
                     });

   }

  getGeoCode(address): Observable<any> {
      const key = 'AIzaSyCXlzLSm5F9D0W16PcX-FQQGi9W51E2SLM';
      let url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=`;
      url = url + encodeURIComponent(address);

      return this.http.get(url);
  }

  index(data) {
    this._connect();
    console.log(data);
    // this._client.indices.delete({index: this._index});
    this._client.indices.create({
      index: this._index,
      body: {
      'mappings': {
        'users': {
            'properties': {
                'city': {
                    'type': 'text',
                    'fields': {
                        'raw': {'type': 'keyword'}
                    }
                },
                'country': {
                    'type': 'text',
                    'fields': {
                        'raw': {'type': 'keyword'}
                    }
                },
                'first': {
                    'type': 'text',
                    'fields': {
                        'autocomplete': {'type': 'text', 'analyzer': 'autocomplete'}
                    }
                },
                'last': {
                    'type': 'text'
                },
                'address': {
                    'type': 'keyword'
                },
                'email': {
                    'type': 'text',
                    'fields': {
                        'raw': {'type': 'keyword'}
                    }
                },
                'location': {
                  'type': 'geo_point'
                }
            }
        }
      }
      }
      , function (error, response) {

          if (error) {
            throw error;
          }

          const sampleDataSet = data;
console.log(sampleDataSet);
          // const body = [];

          // sampleDataSet.forEach(function (item) {
          //     body.push({'index': {'_index': this._index, '_type': this._type}});
          //     body.push(item);
          // });

          // this._client.index({
          //     body: body
          // }, function (err, resp) {
          //     // res.render('index', {result: 'Indexing Completed!'});
          //     if (err) {
          //       console.log(err);
          //     }
          //     console.log(resp);
          // });
        }
      });
  }
}
