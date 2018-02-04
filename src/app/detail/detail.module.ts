import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './detail.component';

export const ROUTES: Routes = [
  { path: 'detail', component: DetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [DetailComponent]
})
export class DetailModule { }
