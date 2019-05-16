import { Component, OnInit } from '@angular/core';
import { MapserviceService } from '../services/mapservice.service';
import { Globals } from '../globals';
import { VendorService } from '../vendor/services/vendor.service';
@Component({
  selector: 'app-searchrestaurants',
  templateUrl: './searchrestaurants.component.html',
  styleUrls: ['./searchrestaurants.component.css']
})
export class SearchrestaurantsComponent implements OnInit {
  noOfUser: any;
  restaurantData: any;
  constructor(private _api: MapserviceService, private global: Globals, private _vendorService: VendorService) {

  }

  ngOnInit() {
    this.getRestaurant();
  }

  getRestaurant() {
    var username = '';
    this._vendorService.getVendor(username)
      .subscribe(res => {
        this.restaurantData = res;
      }, (err) => {

      });
  }

}
