import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SearchrestaurantsComponent } from './searchrestaurants/searchrestaurants.component';
import { CheckoutComponent } from './checkout/checkout.component'
import { CartComponent } from './cart/cart.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurants/:id', component: RestaurantsComponent },
  { path: 'restaurant', component: SearchrestaurantsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }