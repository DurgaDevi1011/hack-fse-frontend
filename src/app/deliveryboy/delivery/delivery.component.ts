import { Component, OnInit } from '@angular/core';
import { PagerService } from '../services/pager.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
// array of all items to be paged
private allItems: any[];

// pager object
pager: any = {};

// paged items
pagedItems: any[];
buttonDisabled:boolean =false;

constructor(private adminService: AdminService, private pagerService: PagerService) { }


 ngOnInit() {
   this.adminService.getDeliveryBoy().subscribe(data => {
     // set items to json response
     this.allItems = data;

     // initialize to page 1
     this.setPage(1);
   });
 }

 
 getDeliveryBoy(){
   this.adminService.getDeliveryBoy().subscribe(data => {
     // set items to json response
     this.allItems = data;

     // initialize to page 1
     this.setPage(1);
   });
 }

 updateDeliveryBoy(id){
   let dataObject={
     active_status :this.buttonDisabled
   };

   this.adminService.updateDeliveryBoy(id,dataObject).subscribe(data => {
    
     this.getDeliveryBoy();
   });
   
 }

 deleteDeliveryBoy(id){
   this.adminService.deleteDeliveryBoy(id).subscribe(data => {
    alert("deleted Successfully");
     this.getDeliveryBoy();
   });
   
 }

 setPage(page: number) {
   // get pager object from service
   this.pager = this.pagerService.getPager(this.allItems.length, page);

   // get current page of items
   this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
 }

}
