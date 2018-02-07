import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

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
            return false;
        }
    }
}
