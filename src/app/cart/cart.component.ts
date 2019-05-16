import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { MapserviceService } from '../services/mapservice.service';
import { Globals } from '../globals';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  item: Array<Object> = [];
  itemprice: any;
  cartData: any;
  cartprice: any = 0;
  bag: number;
  k: number;
  childmessage: number;
  cartstatus: boolean = false;

  constructor(private aroute: ActivatedRoute, private route: ActivatedRoute, private router: Router, private _itemService: MapserviceService, private cons: Globals) { }

  ngOnInit() {
    this.item = JSON.parse(localStorage.getItem('itmes'));
    this.itemprice = JSON.parse(localStorage.getItem('itemprice'));
    console.log(this.item)
    console.log(this.itemprice)
    for (this.k = 0; this.k < this.itemprice.length; this.k++) {
      this.cartprice += parseInt(this.itemprice[this.k]);
    }
    this.bag = this.item.length;
    this.getcart();
  }

  getcart() {
    // console.log(find_duplicate_in_array(this.item))
    this._itemService.getData1(this.cons.getCart, this.item)
      .subscribe(res => {
        this.cartData = res;
        var current = null;
        var cnt = 0;
        for (var i = 0; i < this.item.length; i++) {
          if (this.item[i] != current) {
            if (cnt > 0) {
              for (var j = 0; j < this.cartData.length; j++) {
                if (this.cartData[j]._id == current) {
                  this.cartData[j].count = cnt;
                }
              }
            }
            current = this.item[i];
            cnt = 1;
          } else {
            cnt++;
          }
        }
        if (cnt > 0) {
          for (var j = 0; j < this.cartData.length; j++) {
            if (this.cartData[j]._id == current) {
              this.cartData[j].count = cnt;
            }
          }
        }
      }, (err) => {
        console.log(err);
      });

  }

  removeFromCart(id, price, count) {
    let index = this.itemprice.indexOf(price);
    console.log(this.item)
    console.log(this.itemprice)

    if (index > -1) {
      console.log(count)
     // for (var k = 0; this.cartData.length > k; k++) {
        if (count > 1) {
          for (var v = 0; count > v; v++) {            
            this.itemprice.splice(this.item[index], 1);
           // this.item.splice(this.itemprice[index], 1);
            console.log(this.item[index])
            console.log(this.itemprice[index])
           // localStorage.setItem('itmes', JSON.stringify(this.item));
           // localStorage.setItem('itemprice', JSON.stringify(this.itemprice));
           // console.log(JSON.parse(localStorage.getItem('itmes')))  
         //   console.log(index)
          }
        } else {
          alert(4)
          this.item.splice(index, 1);
          this.itemprice.splice(this.item[index], 1);
          localStorage.setItem('itmes', JSON.stringify(this.item));
          console.log(JSON.parse(localStorage.getItem('itmes')))
        }
      //}
    }

  }

}
