
import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VendorService } from '../services/vendor.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
/*import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
 import { googlemaps } from '@types/googlemaps';
 import PlaceResult = google.maps.places.PlaceResult;*/
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


export interface Types {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-vendorprofile',
  templateUrl: './vendorprofile.component.html',
  styleUrls: ['./vendorprofile.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class VendorprofileComponent implements OnInit {
  /* public appearance = Appearance;
   public zoom: number;
   public latitude: number;
   public longitude: number;
   public selectedAddress: PlaceResult;*/
  submitted = false;

  localstorage = JSON.parse(localStorage.getItem('vendor'));
  /* vendor: Vendor = {
    restarunt_name: '',
    restarunt_id: '',
    description: '',
    restarunt_address: '',
    contact_number: '',
    restarunt_type: '',
    user_name: '',
    password: ''
  }; */
  isLinear = true;
  disabled = true;
  image_url = null;
  vendorProfileForm1: FormGroup;
  vendorProfileForm2: FormGroup;
  vendorProfileForm3: FormGroup;
  restaruntTypes: Types[] = [
    { value: 'Bakery-0', viewValue: 'Bakery' },
    { value: 'Hotel-1', viewValue: 'Hotel' },
    { value: 'Pizza Hurt-2', viewValue: 'Pizza Hurt' },
    { value: 'Juice Shop-3', viewValue: 'Juice Shop' }
  ];

  constructor(private router: Router, private auth: AuthService, private route: ActivatedRoute, private vendordetails: VendorService, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private domsanitizer: DomSanitizer) {


  }




  onFileChange($event) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.image_url = fileReader.result;
      this.vendorProfileForm3.controls['restarunt_image'].setValue(fileReader.result);
    }
    fileReader.readAsDataURL($event.target.files[0]);
    // this.vendorProfileForm3.controls['restarunt_image'].setValue($event.target.value)
  }
  /* reader.onload = function () {
    this.vendorProfileForm3.controls['restarunt_image'].setValue();
  } */
  /* private setCurrentPosition() {
     if ('geolocation' in navigator) {
       navigator.geolocation.getCurrentPosition((position) => {
         this.latitude = position.coords.latitude;
         this.longitude = position.coords.longitude;
         this.zoom = 12;
       });
     }
   }
 
   onAddressSelected(result: PlaceResult) {
     console.log('onAddressSelected: ', result);
   }
 
   onLocationSelected(location: Location) {
     console.log('onLocationSelected: ', location);
     this.latitude = location.latitude;
     this.longitude = location.longitude;
     this.vendorProfileForm1.controls['restarunt_address'].setValue(location);
 
   }*/
  get vf1() { return this.vendorProfileForm1.controls; }
  get vf2() { return this.vendorProfileForm2.controls; }
  get vf3() { return this.vendorProfileForm3.controls; }


  ngOnInit() {
    /* this.zoom = 50;
     this.latitude = 52.520008;
     this.longitude = 13.404954;
     this.setCurrentPosition();*/

    this.vendorProfileForm1 = this.formBuilder.group({
      restarunt_name: new FormControl('', [Validators.required]),
      restarunt_address: new FormControl('', [Validators.required]),
      restarunt_type: new FormControl('', [Validators.required])
    });
    this.vendorProfileForm2 = this.formBuilder.group({
      restarunt_id: new FormControl('', [Validators.required]),
      restarunt_contact_number: new FormControl('', [Validators.required]),
      restarunt_email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.vendorProfileForm3 = this.formBuilder.group({
      restarunt_description: new FormControl('', [Validators.required]),
      restarunt_opening_time: new FormControl('', [Validators.required]),
      restarunt_closing_time: new FormControl('', [Validators.required]),
      restarunt_image: new FormControl('', [Validators.required])
    });

    if (!localStorage.getItem('vendor')) {
      this.router.navigate(['login']);
      return;
    }

    //get values from server
    console.log(this.localstorage);
    this.vendordetails.getVendor(this.localstorage.user_name).subscribe((res: any[]) => {
      this.vendorProfileForm1.patchValue({
        restarunt_name: res['restarunt_name'],
        restarunt_address: res['restarunt_address'],
        restarunt_type: res['restarunt_type']
      })
      this.vendorProfileForm2.patchValue({
        restarunt_id: res['restarunt_id'],
        restarunt_contact_number: res['restarunt_contact_number'],
        restarunt_email: res['restarunt_email']
      })
      this.vendorProfileForm3.patchValue({
        restarunt_description: res['restarunt_description'],
        restarunt_opening_time: res['restarunt_opening_time'],
        restarunt_closing_time: res['restarunt_closing_time'],
        restarunt_image: res['restarunt_image']
      })
      this.image_url = this.vendorProfileForm3.controls['restarunt_image'].value;
    });
  }

  logout() {
    this.auth.logout();
  }
  profileform1(form: NgForm) {
    this.submitted = true;

    if (this.vendorProfileForm1.invalid) {
      let config = new MatSnackBarConfig();
      config.duration = 5000;
      config.panelClass = ['errprofile-snackbar'];
      config.verticalPosition = 'top';
      this.snackBar.open('Plese fill mandatory fileds', null, config);
      return;
    }

    this.vendordetails.updateVendor(this.localstorage.user_name, form)
      .subscribe(res => {
        let config = new MatSnackBarConfig();
        config.duration = 3000;
        config.panelClass = ['saveprofile-snackbar'];
        config.verticalPosition = 'top';
        this.snackBar.open('Your Details are Saved!!!', null, config);
        this.router.navigate(['/vendor/profile']);
        console.log('vendor profile updated');
      }, (err) => {
        console.log(err);
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['errprofile-snackbar'];
        config.verticalPosition = 'top';
        this.snackBar.open('Something Went wrong', null, config);
      });

  }
  profileform2(form: NgForm) {
    this.submitted = true;

    // stop here if Vendorform is invalid
    if (this.vendorProfileForm2.invalid) {
      let config = new MatSnackBarConfig();
      config.duration = 5000;
      config.panelClass = ['errprofile-snackbar'];
      config.verticalPosition = 'top';
      this.snackBar.open('Plese fill mandatory fileds', null, config);
      return;
    }

    this.vendordetails.updateVendor(this.localstorage.user_name, form)
      .subscribe(res => {
        console.log(res);
        let config = new MatSnackBarConfig();
        config.duration = 3000;
        config.panelClass = ['saveprofile-snackbar'];
        config.verticalPosition = 'top';
        this.snackBar.open('Your Details are Saved!!!', null, config);
        this.router.navigate(['/vendor/profile']);
        console.log('vendor profile updated');
      }, (err) => {
        console.log(err);
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['errprofile-snackbar'];
        config.verticalPosition = 'top';
        this.snackBar.open('Something Went wrong', null, config);
      });
  }

  profileform3(form: NgForm) {
    this.submitted = true;

    // stop here if Vendorform is invalid
    if (this.vendorProfileForm3.invalid) {
      let config = new MatSnackBarConfig();
      config.duration = 5000;
      config.panelClass = ['errprofile-snackbar'];
      config.verticalPosition = 'top';
      this.snackBar.open('Plese fill mandatory fileds', null, config);
      return;
    }

    this.vendordetails.updateVendor(this.localstorage.user_name, form)
      .subscribe(res => {
        console.log(res);
        let config = new MatSnackBarConfig();
        config.duration = 3000;
        config.panelClass = ['saveprofile-snackbar'];
        config.verticalPosition = 'top';
        this.snackBar.open('Your Details are Saved!!!', null, config);
        this.router.navigate(['/vendor/profile']);
        console.log('vendor profile updated');
      }, (err) => {
        console.log(err);
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['errprofile-snackbar'];
        config.verticalPosition = 'top';
        this.snackBar.open('Something Went wrong', null, config);
      });

  }
}

