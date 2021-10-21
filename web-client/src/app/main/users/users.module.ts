import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from "@ngxs/store";

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { UsersService } from './users.service';
import { UsersState } from './users.state';
import { SharedModule } from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UsersComponent,
    SearchComponent,
    FavouritesComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxsModule.forFeature([UsersState]),
    SharedModule,
    FormsModule,
  ],
  providers: [UsersService],
})
export class UsersModule { }
