import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MapserviceService } from '../services/mapservice.service';
import { Globals } from '../globals';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  itemData: any;
  vendorData: any;
  item: Array<Object> = [];
  cartprice:any = 0;
  itemprice: any;
  childmessage: number;
  cartstatus: boolean = false;
  public showmoreloader: boolean = false;
  private subscription: Subscription;
  private timer: Observable<any>;
  max: number = 5;
  noRecordsFound: boolean = false;
  itemCountFinish: boolean = false;
  constructor(private aroute: ActivatedRoute, private route: ActivatedRoute, private router: Router, private _itemService: MapserviceService, private cons: Globals) { }

  ngOnInit() {
    this.getvendor();
    this.getItem();
  }

  getvendor() {
    this._itemService.getData(this.cons.getVendor)
      .subscribe(res => {
        console.log(res);
        this.vendorData = res;
      }, (err) => {
        console.log(err);
      });
  }
  getItem() {
    this._itemService.getData(this.cons.getVendorItem + this.aroute.snapshot.url[1].path)
      .subscribe(res => {
        console.log(res);
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

  addCart(id, price) {
    this.item = JSON.parse(localStorage.getItem('itmes'));
    if (this.item && this.item != undefined && this.item.length > 0) {
      this.item.push({"id":id,'price':price});
      localStorage.setItem('itmes', JSON.stringify(this.item));
    } else {
      this.item = [];
      this.item.push({"id":id,'price':price});
      localStorage.setItem('itmes', JSON.stringify(this.item));
    }
    // for(var i=0;i<this.item.length;i++){
    //   this.cartprice += parseInt(this.itemprice[i]);
    // }
    // console.log(this.cartprice)
    // this.childmessage = this.item.length;
    // this.cartstatus = true;
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

}
