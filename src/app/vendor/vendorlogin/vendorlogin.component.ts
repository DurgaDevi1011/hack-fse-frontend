import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { VendorService } from '../services/vendor.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Vendor } from '../vendor';
import { Time } from '@angular/common';
import { checkNoChangesView } from '@angular/core/src/view/view';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-vendorlogin',
  templateUrl: './vendorlogin.component.html',
  styleUrls: ['./vendorlogin.component.css']
})
export class VendorloginComponent implements OnInit {
  submitted = false;
  vendorLoginForm: FormGroup;
  user_name: string = '';
  password: string = '';
  vendorModule: Vendor = {
    restarunt_name: '',
    restarunt_id: '',
    restarunt_address: '',
    restarunt_contact_number: '',
    restarunt_email: '',
    restarunt_type: '',
    restarunt_description: '',
    restarunt_opening_time: null,
    restarunt_closing_time: null,
    user_name: '',
    password: ''
  };

  constructor(private router: Router, private vendor: VendorService, private formBuilder: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // alert('eee');
    // this.router.navigateByUrl('vendor/profile/d');
    this.vendorLoginForm = this.formBuilder.group({
      user_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
      // image: ['', Validators.required]
    });
  }
  get vf() { return this.vendorLoginForm.controls; }

  onFormSubmit(form: NgForm) {
    this.submitted = true;
    if (this.vendorLoginForm.invalid) {
      return "error";
    }

    this.auth.vendorLogin(form)
      .pipe()
      .subscribe(
      result => {
        console.log(result);
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['snackbar'];
        config.verticalPosition = 'top';
        this.snackBar.open('Welcome ' + result.vendorresponse.user_name, null, config);
        this.router.navigate(['vendor/profile']);
        localStorage.setItem('vendor', JSON.stringify(result.vendorresponse));
        console.log(localStorage.getItem('vendor'));
      },
      err => {
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['err-snackbar'];
        config.verticalPosition = 'top';
        this.snackBar.open('Invalid Credentials', null, config);
      }
      );
  }
}

