import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';

import { LivetvComponent } from './livetv.component';

export const ROUTES: Routes = [
  { path: 'livetv', component: LivetvComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ShareModule
  ],
  declarations: [LivetvComponent]
})
export class LivetvModule { }
