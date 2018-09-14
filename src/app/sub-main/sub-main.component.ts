import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { GoogleMapService } from '../google-map.service';
@Component({
  selector: 'app-sub-main',
  templateUrl: './sub-main.component.html',
  styleUrls: ['./sub-main.component.css']
})
export class SubMainComponent implements OnInit {
  @Input() parentData: string;
  geoCord: any;
  _index = 'users';
  _type = 'users';
  constructor(private gms: GoogleMapService) { }

  ngOnInit() {
    const user  = this.gms.getUser();
    console.log(user);
    if (user) {
      this.gms.getGeoCode(user.address).subscribe((data) => {
        const response = JSON.parse(data._body);
        this.geoCord  = response.results[0].geometry.location;
      });
  }
  }

  getlocations() {
    const distance = '500km';
    const loc =  {
      'lat': this.geoCord.lat,
      'lon': this.geoCord.lng
    };

    this.gms.getAllDocuments(this._index, this._type, distance, loc)
    .then(response => {
      console.log(response);
    }, error => {
      console.error(error);
    }).then(() => {
      console.log('Show Customer Completed!');
    });
  }

}
