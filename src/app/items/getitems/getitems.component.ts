import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-getitems',
  templateUrl: './getitems.component.html',
  styleUrls: ['./getitems.component.css']
})
export class GetitemsComponent implements OnInit {

  displayedColumns: string[] = ['Item_Id', 'Item_Name', 'Item_Available_At', 'Item_Price', 'Edit', 'Delete'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private router: Router, private itemservice: ItemService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.itemservice.getItemsBelongsToVendor()
      .subscribe(res => {
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
  editItem(id) {
    console.log(id);
    this.router.navigate(['../vendor/items/edititem', id]);
  }
  deleteItem(id) {
    console.log(id);
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['saveprofile-snackbar'];
    config.verticalPosition = 'top';
    this.itemservice.deleteItem(id).subscribe(res => {
      this.snackBar.open('Item Deleted Successfully!!!', null, config);
      this.ngOnInit();
      console.log('vendor profile updated');
      console.log('deleted');
    })
  }
  getallitems() {
    this.itemservice.getItemsBelongsToVendor()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
      }, (err) => {
        console.log(err);
      });
  }
}

