import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';

import { DetailComponent } from './detail.component';
import { VideoService } from './video.service';
import { VideoDragService } from './video-drag.service';

export const ROUTES: Routes = [
  { path: 'detail:id', component: DetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ShareModule
  ],
  declarations: [DetailComponent],
  providers: [VideoService, VideoDragService]
})
export class DetailModule { }
