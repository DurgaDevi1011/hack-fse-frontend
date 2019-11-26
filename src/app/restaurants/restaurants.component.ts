import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MapserviceService } from '../services/mapservice.service';
import { Globals } from '../globals';
import { Observable, Subscription, timer } from 'rxjs';
import { ItemService } from '../items/services/item.service';
import { UserAdminService } from '../services/userAdmin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  //  cartProductdetails: any = 15;
  itemData: any;
  vendorData: any;
  carttotal: any = 0;
  itemprice: any;
  message: string;
  cartstatus: boolean = false;
  public showmoreloader: boolean = false;
  private subscription: Subscription;
  private timer: Observable<any>;
  max: number = 5;
  noRecordsFound: boolean = false;
  itemCountFinish: boolean = false;
  cartProductdetails: any = 0;
  cartdata: any;
  user = JSON.parse(localStorage.getItem('user'));
  items = JSON.parse(localStorage.getItem('items'));

  constructor(private aroute: ActivatedRoute, private route: ActivatedRoute, private router: Router, private _itemService: MapserviceService, private useradminservice: UserAdminService, private cons: Globals, private toastr: ToastrService) { }

  ngOnInit() {
    this.getvendor();
    this.getItem();
    if (this.user && this.user != undefined) {
      this.cartstatus = true;
      this.useradminservice.getcartData(this.user._id)
        .subscribe(res => {
          console.log('user cart data');
          console.log(res);
          this.cartdata = res;
          localStorage.setItem('items', JSON.stringify(res));
        }, (err) => {
          console.log(err);
        });
      if (this.cartstatus) {
        this.items = JSON.parse(localStorage.getItem('items'));
        this.carttotal = 0;
        this.cartProductdetails = 0;
        if (this.items && this.items != undefined && this.items.length > 0) {
          for (var i = 0; i < this.items.length; i++) {
            this.carttotal += parseInt(this.items[i]['amount']);
            this.cartProductdetails += this.items[i]['item_count'];

          }
        }
      }
    }
  }
  getvendor() {
    this._itemService.getData(this.cons.getVendor)
      .subscribe(res => {
        this.vendorData = res;
      }, (err) => {
        console.log(err);
      });
  }
  getItem() {
    this._itemService.getData(this.cons.getVendorItem + this.aroute.snapshot.url[1].path)
      .subscribe(res => {
        this.itemData = res;
        if (this.itemData.length >= this.max) {
          this.itemCountFinish = true;
        }
        console.log(this.itemData.length)
        if (this.itemData.length == 0) {
          this.noRecordsFound = true;
        }
      }, (err) => {
        console.log(err);
      });
  }

  addCart(item) {
    console.log('welcome');
    if (this.user && this.user._id != undefined) {
      /*if (this.items && this.items != undefined && this.items.length > 0) {
        this.items.push({ "id": item._id, 'amount': item.item_price, 'user_id': this.user._id });
        localStorage.setItem('items', JSON.stringify(this.items));
      } else {
        this.item = [];
        this.item.push({ "id": item._id, 'amount': item.item_price, 'user_id': this.user._id });
        localStorage.setItem('items', JSON.stringify(this.item));
      }*/
      // console.log(this.cons.getuser["_id"]);
      //  console.log(userdetails._id);
      var order = { "item_id": item._id, 'amount': item.item_price, 'user_id': this.user._id };
      //   console.log(order);
      this.useradminservice.addtocart(order).subscribe(data => {
        //  console.log(data);
        this.items.push(data);
      },
        error => {
          this.message = "Invalid username and password";
        });
      this.cartstatus = true;
      this.useradminservice.getcartData(this.user._id)
        .subscribe(res => {
          console.log('user cart data');
          console.log(res);
          this.cartdata = res;
          localStorage.setItem('items', JSON.stringify(res));
        }, (err) => {
          console.log(err);
        });
      if (this.cartstatus) {
        this.carttotal = 0;
        this.cartProductdetails = 0;
        if (this.items && this.items != undefined && this.items.length > 0) {
          for (var i = 0; i < this.items.length; i++) {
            this.carttotal += parseInt(this.items[i]['amount']);
            this.cartProductdetails += this.items[i]['item_count'];
          }
        }
      }
    }
    else {
      this.toastr.error("User login required", 'Error')
    }

  }
  toggle(): void {
    console.log(this.itemData.length)
    if (this.itemData.length >= this.max) {
      this.showmoreloader = true;
      this.timer = timer(5000);
      this.subscription = this.timer.subscribe(() => {
        this.showmoreloader = false;
        this.itemCountFinish = true;
        this.max = this.max + 5;
        if (this.max >= this.itemData.length) {
          this.itemCountFinish = false;
        }
      });
    } else {
      this.itemCountFinish = false;
    }
  }

  getStars = function () {
    // Get the value
    var val = parseFloat('1.3');
    // Turn value into number/100
    var size = val / 5 * 100;
    return size + '%';
  }

}
