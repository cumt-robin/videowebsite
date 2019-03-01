import { AjaxHandler } from './ajax';
export function login(requestData) {
    return AjaxHandler.ajax('Login', requestData);
}
export function getHomeData(requestData) {
    return AjaxHandler.ajax('GetHomeData', requestData);
}
export function getVODDetail(requestData) {
    return AjaxHandler.ajax('GetVODDetail', requestData);
}
export function getVodHomeData(requestData) {
    return AjaxHandler.ajax('GetVodHomeData', requestData);
}
export function logout(requestData) {
    return AjaxHandler.ajax('Logout', requestData);
}
