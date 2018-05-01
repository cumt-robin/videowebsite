import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search.component';

import { AppCanActivate } from '../share/services/login.canactivate.service';

const SEARCH_ROUTES: Routes = [
  { path: 'search', component: SearchComponent, canActivate: [AppCanActivate] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SEARCH_ROUTES)
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
