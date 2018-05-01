import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { EventService } from './event.service';

@Injectable()
export class AppCanActivate implements CanActivate {
    /**
     * function used to decide whether the manage-page of sub profile is accessible.
     */
    canActivate() {
        let isProfileLogin = localStorage.getItem('isProfileLogin');
        if (isProfileLogin && isProfileLogin === 'true') {
            return true;
        } else {
            let params = {
                type: 'info',
                title: '温馨提示',
                content: '您还未登录或登录已超时'
            };
            EventService.emit('Notify', params);
            return false;
        }
    }
}
