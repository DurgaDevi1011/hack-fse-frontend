import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { UserAuthService } from '../../services/userAuth.service';
import { VendorService } from './../../vendor/services/vendor.service';
import { SearchrestaurantsComponent } from '../../searchrestaurants/searchrestaurants.component';
import { UserAdminService } from '../../services/userAdmin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public href: string = "";
  restData: any;
  registerForm: FormGroup;
  loginForm: FormGroup;
  searchForm: FormGroup;
  submitted = false;
  loggedStatus = false;
  userData: any = {};
  message: string;
  loginClose: boolean = false;
  display = 'none';
  itemprice: any;
  user = JSON.parse(localStorage.getItem('user'));
  items = JSON.parse(localStorage.getItem('items'));
  cartdata: any;

  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('logclose') public logcloseElement: ElementRef;
  @Input() cartProduct: any;
  @Input() cartProductdetails: any;
  @Input() cartprices: any;
  @Input() cartStatus: boolean;


  //  cartStatus:boolean = false;
  constructor(private formBuilder: FormBuilder,
    private authService: UserAuthService,
    private vendorService: VendorService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private search: SearchrestaurantsComponent,
    private useradminservice: UserAdminService,
  ) { }

  ngOnInit() {
    this.cartStatus = true;

    this.href = this.router.url;
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.searchForm = this.formBuilder.group({
      location_name: [''],
      restaurant_name: [''],
      cuisine_name: [''],
    });

    if (this.authService.isAuthenticated()) {
      this.loggedStatus = true;
      this.userData = JSON.parse(this.authService.isAuthenticated());
    }


  }
  get rf() { return this.registerForm.controls; }

  get lf() { return this.loginForm.controls; }


  login(form: NgForm) {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(form).subscribe(data => {
      this.loginClose = true;
      this.loggedStatus = true;
      localStorage.setItem('user', JSON.stringify(data));
      this.userData = data;
      this.display = 'none';
      this.logcloseElement.nativeElement.click();
      if (this.userData && this.userData != undefined) {
        this.cartStatus = true;
        this.useradminservice.getcartData(this.userData._id)
          .subscribe(res => {
            console.log(res);
            this.cartdata = res;
            localStorage.setItem('items', JSON.stringify(res));
          }, (err) => {
            console.log(err);
          });
        if (this.cartStatus) {
          this.items = JSON.parse(localStorage.getItem('items'));
          if (this.items && this.items != undefined && this.items.length > 0) {
            console.log(this.items.length);
            this.cartProductdetails = this.items.length;
            for (var i = 0; i < this.items.length; i++) {
              this.cartprices += parseInt(this.items[i]['amount']);
            }
          }
        }
      }
    },
      error => {
        this.message = "Invalid username and password";
      });
  }

  register(form: NgForm) {

    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(form).subscribe(data => {
      console.log(data);
      this.loginClose = true;
      this.loggedStatus = true;
      localStorage.setItem('user', JSON.stringify(data));
      this.userData = data;
      this.display = 'none';
      this.logcloseElement.nativeElement.click();
    },
      error => {
        this.message = "Invalid username and password";
      });
  }

  logout() {
    this.authService.logout();
    this.loggedStatus = false;
    this.userData = {};
  }

  searchrestarunt(form: NgForm) {
    console.log(form);
    this.vendorService.getVendorbyRestaruntname(form['restaurant_name']).subscribe(data => {
      this.search.restaurantData = {};
      this.search.restaurantData = data;
    },
      error => {
        this.message = "Un expected error";
      });
  }
}
