import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';

import { OndemandComponent } from './ondemand.component';

export const ROUTES: Routes = [
  { path: 'ondemand', component: OndemandComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ShareModule
  ],
  declarations: [OndemandComponent]
})
export class OndemandModule { }
