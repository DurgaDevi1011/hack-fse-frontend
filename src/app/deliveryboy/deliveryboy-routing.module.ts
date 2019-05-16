import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VendorComponent } from './vendor/vendor.component';
import { UserComponent } from './user/user.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryboyAuthGuard } from './guards/auth-guard.service';
import {P404Component} from './error/404.component';
import {P500Component} from './error/500.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [

  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'deliveryboy/login',
    component: LoginComponent
  },
  {
    path: 'deliveryboy',
    component: MainLayoutComponent,
    canActivate: [DeliveryboyAuthGuard],
    data: {
      title: 'Delivery Boy'
    },
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'vendor',
        component: VendorComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'delivery',
        component: DeliveryComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryBoyRoutingModule { }
