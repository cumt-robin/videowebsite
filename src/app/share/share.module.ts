import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { PostersComponent } from './components/posters/posters.component';

import { VerticalScroll } from './services/vertical-scroll.service';
import { HorizontalScroll } from './services/horizontal-scroll.service';
import { AppCanActivate } from './services/login.canactivate.service';

import { ColorDirective } from './directives/color.directive';
import { InnerHTMLDirective } from './directives/innerHtml.directive';
import { FocusDirective } from './directives/focus.directive';

import { AppendPipe } from './pipes/append.pipe';

@NgModule({
  imports: [
    TranslateModule,
    FormsModule,
    BrowserModule,
    CommonModule
  ],
  exports: [
    TranslateModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    PostersComponent,
    ColorDirective,
    InnerHTMLDirective,
    AppendPipe
  ],
  declarations: [PostersComponent, ColorDirective, InnerHTMLDirective, AppendPipe, FocusDirective],
  providers: [VerticalScroll, HorizontalScroll, AppCanActivate]
})
export class ShareModule { }
