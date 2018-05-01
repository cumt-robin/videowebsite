import { AjaxHandler } from './ajax';

export function login(requestData: Object) {
    return AjaxHandler.ajax('Login', requestData);
}
export function getHomeData(requestData?: Object) {
    return AjaxHandler.ajax('GetHomeData', requestData);
}
export function getVODDetail(requestData: Object) {
    return AjaxHandler.ajax('GetVODDetail', requestData);
}
export function getVodHomeData(requestData?: Object) {
    return AjaxHandler.ajax('GetVodHomeData', requestData);
}
export function logout(requestData: Object) {
    return AjaxHandler.ajax('Logout', requestData);
}
