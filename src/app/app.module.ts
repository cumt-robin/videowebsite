import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { HomeModule } from './home/home.module';
import { LivetvModule } from './livetv/livetv.module';
import { OndemandModule } from './ondemand/ondemand.module';
import { DetailModule } from './detail/detail.module';
import { LoginModule } from './login/login.module';

export const ROUTES: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    HomeModule,
    LivetvModule,
    OndemandModule,
    DetailModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
