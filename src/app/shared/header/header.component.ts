import { Component, OnInit,Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone,Renderer2 } from '@angular/core';
import {ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/userAuth.service';
//import { RestaurantsComponent } from '../../restaurants/restaurants.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public href: string = "";  
  restData:any;
  registerForm: FormGroup;
  submitted = false;
  loggedStatus =false;
  userData:any={};
  message:string;
  loginClose:boolean= false;
  display='none';
  itemprice: any;
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('logclose') public logcloseElement: ElementRef;
  @Input() cartProduct: any;
  @Input() cartprices: any;
  @Input() cartStatus:boolean;
//  cartStatus:boolean = false;
  constructor(private formBuilder: FormBuilder,
    private authService: UserAuthService,
    private mapsAPILoader: MapsAPILoader, 
    private ngZone: NgZone,
    private route:ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.cartProduct = JSON.parse(localStorage.getItem('itmes'));
    this.cartprices = JSON.parse(localStorage.getItem('itemprice'));
    if(this.cartProduct && this.cartProduct != 'undefined' && this.cartProduct.length > 0){
      this.cartProduct = this.cartProduct.length;
      this.cartStatus = true;
    }
  //  console.log(this.cartprices.length);
    if (this.cartprices && this.cartprices != undefined && this.cartprices.length > 0) {
      let a = 0;
      for(var i=0;i<this.cartprices.length;i++){
        a += parseInt(this.cartprices[i]);
      }
    //  console.log(a)
      this.cartprices = a;
    }
    this.href = this.router.url;
    this.registerForm = this.formBuilder.group({
        userName: ['',[Validators.required,Validators.email]],
        password: ['', Validators.required]
    });

    if (this.authService.isAuthenticated()){
      this.loggedStatus = true;
      this.userData = JSON.parse(this.authService.isAuthenticated());
    }
      
    
}
get f() { return this.registerForm.controls; }



    onSubmit() {
      alert("hi");
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        console.log(this.registerForm.value)
        alert('SUCCESS!! :-)\n\n')
    }


    
  login() {

    if(this.registerForm.invalid){
      return;
    }

    this.authService.login(this.registerForm.value).subscribe(data => {
      console.log(data);
      this.loginClose =true;
       this.loggedStatus =true;
      localStorage.setItem('user', JSON.stringify(data));
      this.userData =data;
      this.display='none';
      this.logcloseElement.nativeElement.click();
    // this.renderer.removeClass(this.backdropElement,this.clasName);
    },
    error=>{
      this.message="Invalid username and password";
    });
  }

  logout(){
    this.authService.logout();
    this.loggedStatus =false;
    this.userData={};
  }

}
