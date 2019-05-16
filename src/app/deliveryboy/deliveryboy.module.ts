import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { VendorComponent } from './vendor/vendor.component';
import { UserComponent } from './user/user.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { HomeComponent } from './home/home.component';
import { P404Component } from './error/404.component';
import { P500Component } from './error/500.component';
import { DeliveryBoyRoutingModule } from './deliveryboy-routing.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@NgModule({
  declarations: [LoginComponent, VendorComponent, UserComponent, DeliveryComponent, HomeComponent, P404Component, P500Component, SidebarComponent, HeaderComponent, MainLayoutComponent],
  imports: [
    CommonModule,
    DeliveryBoyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DeliveryBoyModule { }
