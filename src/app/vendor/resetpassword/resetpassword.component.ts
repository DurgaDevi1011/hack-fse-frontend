import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { VendorService } from '../services/vendor.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  vendorpasswordresetForm1: FormGroup;
  vendorpasswordresetForm2: FormGroup;
  public show_dialog: boolean = false;
  public show_dialog1: boolean = false;

  submitted = false;
  localstorage = JSON.parse(localStorage.getItem('vendor'));


  constructor(private router: Router, private vendor: VendorService, private formBuilder: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.vendorpasswordresetForm1 = this.formBuilder.group({
      restarunt_email: new FormControl('', [Validators.required])
    })
    this.vendorpasswordresetForm2 = this.formBuilder.group({
      otp: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
    })
  }
  get vf() { return this.vendorpasswordresetForm1.controls; }
  get vf1() { return this.vendorpasswordresetForm2.controls; }

  onFormSubmit(form: NgForm) {
    this.submitted = true;
    if (this.vendorpasswordresetForm1.invalid) {
      return "error";
    }
    this.auth.resetpassword(form)
      .subscribe(res => {
        console.log(res);
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['success-snackbar'];
        config.verticalPosition = 'top';
        this.snackBar.open('Password send to your registered email!!!', null, config);
        localStorage.setItem('otp', JSON.stringify(res));
        console.log(localStorage.getItem('otp'));
        this.show_dialog = !this.show_dialog;
      }, (err) => {
        console.log(err);
      });
  }
  validateotp(data) {
    var otpdata = localStorage.getItem('otp');
    if (otpdata['otp'] == data) {
      this.show_dialog1 = !this.show_dialog1;
    }
  }

  onFormSubmit1(form: NgForm) {
    console.log(form);
    this.submitted = true;
    const otpdata = JSON.parse(localStorage.getItem('otp'));
    console.log(otpdata.user_name);
    if (this.vendorpasswordresetForm2.invalid) {
      console.log('invalid form');
      return;
    }
    if (this.vf1['password'].value === this.vf1['confirm_password'].value) {
      this.vendor.updateVendor(otpdata.user_name, form)
        .subscribe(res => {
          console.log(res);
          let config = new MatSnackBarConfig();
          config.duration = 5000;
          config.panelClass = ['success-snackbar'];
          config.verticalPosition = 'top';
          this.snackBar.open('Password changed Succesfully!!!', null, config);
          this.router.navigate(['/vendor/login']);
          console.log('Password changed Succesfully');
        })
      localStorage.clear();
    }
    else {
      let config = new MatSnackBarConfig();
      config.duration = 5000;
      config.panelClass = ['err-snackbar'];
      config.verticalPosition = 'top';
      this.snackBar.open('Password shouldmatch with confirm password!!!', null, config);

    }
  }
  
}
