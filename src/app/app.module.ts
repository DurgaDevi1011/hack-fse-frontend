import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NguCarouselModule } from '@ngu/carousel';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SearchrestaurantsComponent } from './searchrestaurants/searchrestaurants.component';
import { Globals } from './globals';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { DeliveryBoyModule } from './deliveryboy/deliveryboy.module';
import { UserAdminModule } from './user/userAdmin.module';
import { VendorModule } from './vendor/vendor.module';
import { ItemModule } from './items/item.module';
import { AuthGuard } from '../app/dashboard/guards/auth-guard.service';
import { DeliveryboyAuthGuard } from '../app/deliveryboy/guards/auth-guard.service';
import { UserAuthGuard } from './user/guards/userAuth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RestaurantsComponent,
    SearchrestaurantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    DeliveryBoyModule,
    UserAdminModule,
    VendorModule,
    ItemModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaf7aJ5o0MZZxRoYklT6MBCvrcFbCAKM4',
      libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule,
    NguCarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],

  exports: [FormsModule, ReactiveFormsModule],

  providers: [AuthGuard, DeliveryboyAuthGuard, UserAuthGuard, Globals, SearchrestaurantsComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
