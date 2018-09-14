import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  _index = 'users';
  _type = 'users';
  id = 0;
  constructor(public afdb: AngularFireDatabase, private gms: GoogleMapService,  private route: ActivatedRoute,
    private router: Router) {
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
    this.gms.setUser(user);
    this.router.navigate(['/user']);
    // this.gms.getGeoCode(user.address).subscribe((data) => {
    //   const response = JSON.parse(data._body);
    //    this.geo['cord']  = response.results[0].geometry.location;
    //    this.geo['email']  = user.email;
    // });
  }
  getGeoCord(user) {
    this.gms.getGeoCode(user.address).subscribe((data) => {
      const response = JSON.parse(data._body);
      const geoCord =   response.results[0].geometry.location;
      const loc =  {
              'lat':     geoCord.lat,
              'lon':    geoCord.lng
            };
      user['location']  = loc;
      this.createIndex(user);
    });
  }

  insertGeoCord() {
    this.users.forEach( user => {
           this.getGeoCord(user);
    });
  }
  createIndex(user) {
    this.id++;
    this.gms.addToIndex({
      index: this._index,
      type: this._type,
      id: this.id,
      body: user
    }).then((result) => {
      console.log(result);
    }, error => {
      console.error(error);
    });
  }

  getNearBy(data) {
    const distance = data.distance + 'km';
    const coord = data.coord;

    this.gms.getAllDocuments(this._index, this._type, distance, coord)
    .then(response => {
      console.log(response);
    }, error => {
      console.error(error);
    }).then(() => {
      console.log('Show Customer Completed!');
    });
  }

}
