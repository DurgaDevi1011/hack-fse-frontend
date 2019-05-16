import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { VendorService } from '../services/vendor.service';
import { AuthService } from '../services/auth.service';
import { AbstractControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-vendorregistration',
  templateUrl: './vendorregistration.component.html',
  styleUrls: ['./vendorregistration.component.css']
})

export class VendorregistrationComponent implements OnInit {
  vendorForm: FormGroup;
  submitted = false;
  notSame = false;

  constructor(private router: Router, private vendor: VendorService, private formBuilder: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.vendorForm = this.formBuilder.group({
      user_name: new FormControl('', [Validators.required]),
      restarunt_email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      re_password: new FormControl('', [Validators.required])
    });
  }


  onChange($event) {
    console.log($event);
    return this.vendorForm.get('password') === $event.target.value ? { notSame: false } : { notSame: true }
  }
  // convenience getter for easy access to vendor form fields
  get vf() { return this.vendorForm.controls; }

  onFormSubmit(form: NgForm) {
    this.submitted = true;

    if (this.vendorForm.invalid) {
      return;
    }

    console.log(form);
    this.auth.postVendor(form)
      .subscribe(res => {
        let id = res['_id'];
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['success-snackbar'];
        config.verticalPosition = 'top';
        this.snackBar.open('Successfully Registered!!!', null, config);
        this.router.navigate(['/vendor/login']);
        console.log('registered successfully');
        console.log(id);
      }, (err) => {
        console.log(err);
      });
  }

}


