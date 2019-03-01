var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PostersComponent } from './components/posters/posters.component';
import { BannerComponent } from './components/banner/banner.component';
import { VerticalScroll } from './services/vertical-scroll.service';
import { HorizontalScroll } from './services/horizontal-scroll.service';
import { AppCanActivate } from './services/login.canactivate.service';
import { ColorDirective } from './directives/color.directive';
import { InnerHTMLDirective } from './directives/innerHtml.directive';
import { FocusDirective } from './directives/focus.directive';
import { AppendPipe } from './pipes/append.pipe';
var ShareModule = (function () {
    function ShareModule() {
    }
    ShareModule = __decorate([
        NgModule({
            imports: [
                TranslateModule,
                FormsModule,
                BrowserModule,
                CommonModule,
                NgZorroAntdModule
            ],
            exports: [
                TranslateModule,
                FormsModule,
                BrowserModule,
                CommonModule,
                PostersComponent,
                BannerComponent,
                ColorDirective,
                InnerHTMLDirective,
                AppendPipe
            ],
            declarations: [PostersComponent, BannerComponent, ColorDirective, InnerHTMLDirective, AppendPipe, FocusDirective],
            providers: [VerticalScroll, HorizontalScroll, AppCanActivate]
        })
    ], ShareModule);
    return ShareModule;
}());
export { ShareModule };
