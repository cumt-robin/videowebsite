var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { AppCanActivate } from '../share/services/login.canactivate.service';
export var ROUTES = [
    { path: 'livetv', component: LivetvComponent, canActivate: [AppCanActivate] }
];
var LivetvModule = (function () {
    function LivetvModule() {
    }
    LivetvModule = __decorate([
        NgModule({
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
    ], LivetvModule);
    return LivetvModule;
}());
export { LivetvModule };
