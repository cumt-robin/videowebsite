import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LivetvComponent } from './livetv.component';

export const ROUTES: Routes = [
  { path: 'livetv', component: LivetvComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [LivetvComponent]
})
export class LivetvModule { }
