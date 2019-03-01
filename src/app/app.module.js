var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';
import { ShareModule } from './share/share.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LivetvModule } from './livetv/livetv.module';
import { OndemandModule } from './ondemand/ondemand.module';
import { DetailModule } from './detail/detail.module';
import { LoginModule } from './login/login.module';
import { SearchModule } from './search/search.module';
export var APPROUTES = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
export function createTranslateLoader(http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                HttpModule,
                RouterModule.forRoot(APPROUTES, { useHash: true }),
                HomeModule,
                LivetvModule,
                OndemandModule,
                DetailModule,
                LoginModule,
                SearchModule,
                ShareModule,
                TranslateModule.forRoot({
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [Http]
                }),
                NgZorroAntdModule.forRoot()
            ],
            providers: [
                {
                    provide: NZ_NOTIFICATION_CONFIG, useValue: { nzMaxStack: 3, nzDuration: 3000 }
                }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
