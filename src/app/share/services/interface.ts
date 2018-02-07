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
