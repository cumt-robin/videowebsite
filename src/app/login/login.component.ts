import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login } from '../share/services/interface';
import { EventService } from '../share/services/event.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public showErrorInfo = false;
  constructor(
    private router: Router,
    private _notification: NzNotificationService
  ) {
    let isLogin = localStorage.getItem('isProfileLogin');
    if (isLogin && isLogin === 'true') {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    (() => {
      this._notification.create('info', '温馨提示', '请使用测试账号登录，账号test，密码0', {nzDuration: 10000});
    })();
  }

  doLogin() {
    let req = {
      name: this.username,
      password: this.password
    };
    login(req).then(resp => {
      this.showErrorInfo = false;
      this.router.navigate(['home']);
      localStorage.setItem('isProfileLogin', 'true');
      localStorage.setItem('User_Name', this.username);
      EventService.emit('Login_Succeeded');
    }, resp => {
      this.showErrorInfo = true;
    });
  }

}
