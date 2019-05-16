import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorregistrationComponent } from './vendorregistration/vendorregistration.component';
import { VendorloginComponent } from './vendorlogin/vendorlogin.component';
import { VendorprofileComponent } from './vendorprofile/vendorprofile.component';
import { VendorhomeComponent } from './vendorhome/vendorhome.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './services/auth.guard.service';
import {ItemModule} from '../items/item.module';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component'
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';

const routes: Routes = [
  {
    path: 'vendor/registration',
    component: VendorregistrationComponent
  },
  {
    path: 'vendor/login',
    component: VendorloginComponent
  },
  {
    path: 'vendor/forgotpassword',
    component: ResetpasswordComponent
  },
  {
    path: 'vendor',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'vendor'
    },
    children: [
      {
        path: 'home',
        component: VendorhomeComponent,
      },
      {
        path: 'profile',
        component: VendorprofileComponent,
      },
      {
        path:'items',
        loadChildren:()=>ItemModule,
      },
      {
        path: 'orders',
        component: OrderdetailsComponent,
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
