import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditemsComponent } from './additems/additems.component';
import { GetitemsComponent } from './getitems/getitems.component';

const routes: Routes = [
  {
    path: 'additem',
    component: AdditemsComponent
  },
  {
    path: 'getitems',
    component: GetitemsComponent
  },
  {
    path: 'edititem/:id',
    component: AdditemsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
