import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';
import { AdditemsComponent } from './additems/additems.component';
import { GetitemsComponent } from './getitems/getitems.component';
import { AppMaterialModule } from '../vendor/app.material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemService } from './services/item.service';

@NgModule({
  declarations: [AdditemsComponent, GetitemsComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  providers: [ItemService]
})
export class ItemModule { }
