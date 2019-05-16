import { Component, OnInit } from '@angular/core';
import { PagerService } from '../services/pager.service';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  buttonDisabled:boolean =false;

  constructor(private adminService: AdminService, private pagerService: PagerService) { }

  ngOnInit() {
    
    this.adminService.getVendor().subscribe(data => {
      // set items to json response
      this.allItems = data;

      // initialize to page 1
      this.setPage(1);
    });
  }

  getVendor(){
    this.adminService.getVendor().subscribe(data => {
      // set items to json response
      this.allItems = data;

      // initialize to page 1
      this.setPage(1);
    });
  }
  updateVendor(userName){
    let dataObject={
      active_status :this.buttonDisabled
    };

    this.adminService.updateVendor(userName,dataObject).subscribe(data => {
     
      this.getVendor();
    });
    
  }

  deleteVendor(id){
    this.adminService.deleteVendor(id).subscribe(data => {
     alert("deleted Successfully")
      this.getVendor();
    });
    
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
