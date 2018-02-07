// import './polyfills.ts';

// import { enableProdMode } from '@angular/core';
// import { platformBrowser } from '@angular/platform-browser';

// import { AppModule } from './app/app.module';

// import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

// enableProdMode();

// platformBrowser().bootstrapModuleFactory(AppModule);

import './polyfills.ts';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
