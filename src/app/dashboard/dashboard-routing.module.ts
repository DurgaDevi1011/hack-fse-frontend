import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VendorComponent } from './vendor/vendor.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
//import { DeliveryComponent } from './delivery/delivery.component';
import { AuthGuard } from './guards/auth-guard.service';
import { P404Component } from './error/404.component';
import { P500Component } from './error/500.component';
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
    path: 'dashboard/login',
    component: LoginComponent
  },
  {
    path: 'dashboard/register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'dashboard'
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
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
