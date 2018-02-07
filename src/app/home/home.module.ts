import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';

import { HomeComponent } from './home.component';
import { SlideComponent } from './slide/slide.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ShareModule
  ],
  declarations: [HomeComponent, SlideComponent]
})
export class HomeModule { }
