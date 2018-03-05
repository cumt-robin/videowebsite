import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';

import { LivetvComponent } from './livetv.component';
import { TestAnimationComponent } from './test-animation/test-animation.component';
import { TestScrollComponent } from './test-scroll/test-scroll.component';
import { TestPreviewComponent } from './test-preview/test-preview.component';
import { HighlightComponent } from './highlight/highlight.component';
import { TestDirectiveComponent } from './test-directive/test-directive.component';
import { TestPipeComponent } from './test-pipe/test-pipe.component';
import { TestHostComponent } from './test-host/test-host.component';
import { ToggleClassDirective } from './test-host/test-host.component';

export const ROUTES: Routes = [
  { path: 'livetv', component: LivetvComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ShareModule
  ],
  declarations: [
    LivetvComponent,
    TestAnimationComponent,
    TestScrollComponent,
    TestPreviewComponent,
    HighlightComponent,
    TestDirectiveComponent,
    TestPipeComponent,
    TestHostComponent,
    ToggleClassDirective
  ]
})
export class LivetvModule { }
