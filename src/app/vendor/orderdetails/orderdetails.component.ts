import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from '../services/vendor.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { retry } from 'rxjs/operators';


@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})

export class OrderdetailsComponent implements OnInit {
  restaruntTypes = [
    { value: 'Bakery-0', viewValue: 'Bakery' },
    { value: 'Hotel-1', viewValue: 'Hotel' },
    { value: 'Pizza Hurt-2', viewValue: 'Pizza Hurt' },
    { value: 'Juice Shop-3', viewValue: 'Juice Shop' }
  ];

  displayedColumns: string[] = ['Order_Id', 'Item_Id', 'Item_Count', 'Item_Amount', 'Order_Placed_Date', 'Order_Delivered_Date', 'Item_Status', 'Accept', 'Delivered', 'Reject'];
  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private router: Router, private vendorservice: VendorService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.vendorservice.getOrdersBelongsToVendor()
      .subscribe(res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (err) => {
        console.log(err);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  acceptOrder(id) {
    console.log(id);
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['saveprofile-snackbar'];
    config.verticalPosition = 'top';
    let data = { 'active_status': 'Pending' };
    this.vendorservice.updateOrder(id, data).subscribe(res => {
      console.log(res);
      this.snackBar.open('Order Accepted!!!', null, config);
      this.ngOnInit();
      console.log('order accepted');
    })
  }

  rejectOrder(id) {
    console.log(id);
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['saveprofile-snackbar'];
    config.verticalPosition = 'top';
    let data = { 'active_status': 'Cancelled' };
    this.vendorservice.updateOrder(id, data).subscribe(res => {
      console.log(res);
      this.snackBar.open('Order Cancelled!!!', null, config);
      this.ngOnInit();
      console.log('order Rejected');
    })
  }
  deliveredOrder(id) {
    console.log(id);
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['saveprofile-snackbar'];
    config.verticalPosition = 'top';
    let data = { 'active_status': 'Delivered' };
    this.vendorservice.updateOrder(id, data).subscribe(res => {
      console.log(res);
      this.snackBar.open('Order Delivered!!!', null, config);
      this.ngOnInit();
      console.log('order Delivered');
    })
  }
}

