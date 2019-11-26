import { Component, OnInit, Input } from '@angular/core';
import { MapserviceService } from '../services/mapservice.service';
import { Globals } from '../globals';
import { VendorService } from '../vendor/services/vendor.service';
@Component({
  selector: 'app-searchrestaurants',
  templateUrl: './searchrestaurants.component.html',
  styleUrls: ['./searchrestaurants.component.css']
})
export class SearchrestaurantsComponent implements OnInit {
  cartProductdetails: any = 0;
  cartstatus: boolean = false;
  carttotal: any = 0;
  total: any;
  noOfUser: any;
  restaurantData: any;
  user = JSON.parse(localStorage.getItem('user'));
  items = JSON.parse(localStorage.getItem('items'));
  constructor(private _api: MapserviceService, private global: Globals, private _vendorService: VendorService) {

  }

  ngOnInit() {
    this.getRestaurant();
    if (this.user && this.user != undefined) {
      this.cartstatus = true;
      /* if (this.cartstatus) {
         this.items = JSON.parse(localStorage.getItem('items'));
         if (this.items && this.items != undefined && this.items.length > 0) {
           //  this.cartProductdetails = this.items.length;
           for (var i = 0; i < this.items.length; i++) {
             this.carttotal += parseInt(this.items[i]['amount']) * parseInt(this.items[i]['item_count']);
             this.cartProductdetails += this.items[i]['item_count'];
           }
         }
       }*/
      if (this.cartstatus) {
        this.items = JSON.parse(localStorage.getItem('items'));
        if (this.items && this.items != undefined && this.items.length > 0) {
          console.log(this.items.length);
          for (var i = 0; i < this.items.length; i++) {
            this.carttotal += parseInt(this.items[i]['amount']) * parseInt(this.items[i]['item_count']);
            this.cartProductdetails += this.items[i]['item_count'];
          }
        }
      }
    }
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
