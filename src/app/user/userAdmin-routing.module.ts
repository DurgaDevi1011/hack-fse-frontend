import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAuthGuard } from './guards/userAuth-guard.service';
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
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: MainLayoutComponent,
    canActivate: [UserAuthGuard],
    data: {
      title: 'User'
    },
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      
      {
        path: 'profile',
        component: ProfileComponent,
      }
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdminRoutingModule { }
