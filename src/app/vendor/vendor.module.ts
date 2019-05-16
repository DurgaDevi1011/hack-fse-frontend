import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorregistrationComponent } from './vendorregistration/vendorregistration.component';
import { VendorloginComponent } from './vendorlogin/vendorlogin.component';
import { VendorprofileComponent } from './vendorprofile/vendorprofile.component';
import { VendorhomeComponent } from './vendorhome/vendorhome.component';
import { AuthService } from "./services/auth.service";
/* import { JwtModule } from '@auth0/angular-jwt';
 */import { VendorService } from './services/vendor.service';
import { AppMaterialModule } from './app.material.module';
import { AuthGuard } from './services/auth.guard.service';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component'
import {FileInputAccessorModule} from "file-input-accessor";
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';

@NgModule({
  declarations: [VendorregistrationComponent, VendorloginComponent, VendorprofileComponent, VendorhomeComponent, MainLayoutComponent,ResetpasswordComponent,OrderdetailsComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbakL6y0tIZHqbV0yAJ_YrMiQ35KguxSs'
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
    FileInputAccessorModule
  ],
  providers: [VendorService, AuthService, AuthGuard]
})


export class VendorModule { }
