import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { GoogleMapService } from '../google-map.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  users = [];
  geo: any = {};
  elasticUsers = [];
  constructor(public afdb: AngularFireDatabase, private gms: GoogleMapService) {
    this.afdb.list(`contact`).valueChanges().subscribe(data => {
      data.forEach(user => {
        if (user.hasOwnProperty('address')) {
          this.users.push(user);
        }
      });
      console.log(this.users);
    });
  }

  ngOnInit() {

  }

  getGeo(user) {
    this.gms.getGeoCode(user.address).subscribe((data) => {
      const response = JSON.parse(data._body);
       this.geo['cord']  = response.results[0].geometry.location;
       this.geo['email']  = user.email;
    });
  }
  getGeoCord(user) {
    this.gms.getGeoCode(user.address).subscribe((data) => {
      const response = JSON.parse(data._body);
      const geoCord =   response.results[0].geometry.location;
         console.log(geoCord);

        //  {
        //   "name":     "Pala Pizza",
        //   "location": {
        //     "lat":     40.722,
        //     "lon":    -73.989
        //   }
        // }
        const loc =  {
              'lat':     geoCord.lat,
              'lon':    geoCord.lng
            };
      user['location']  = loc;
      this.elasticUsers.push(user);
    });
  }

  insertGeoCord() {
    this.users.forEach( user => {
           this.getGeoCord(user);
    });
    // this.gms.index(this.elasticUsers);
  }
  createIndex() {
    this.gms.index(this.elasticUsers);
  }

}
