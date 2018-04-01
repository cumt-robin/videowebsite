import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LoginComponent } from './login.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ShareModule,
    NgZorroAntdModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
