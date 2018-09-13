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

  constructor(public afdb: AngularFireDatabase, private gms: GoogleMapService) { 
    this.afdb.list(`contact`).valueChanges().subscribe(data => {
      console.log(data)
      data.forEach(user => {
        if(user.hasOwnProperty('address')){
          this.users.push(user);
        }
      });
    })
  }

  ngOnInit() {
    
  }

  getGeo(user) {
    console.log(user.address)
    this.gms.getGeoCode(user.address).subscribe((data)=>{
      let response = JSON.parse(data._body);
       this.geo['cord']  = response.results[0].geometry.location;
       this.geo['email']  = user.email
       console.log(this.geo)
    })
  }

}
