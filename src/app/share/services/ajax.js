import { Config } from '../../../../config/system.config';
import { EventService } from './event.service';
var Ajax = (function () {
    function Ajax() {
    }
    Ajax.prototype.ajax = function (interfaceName, data) {
        var options = {
            url: Config.serverUrl + '/' + interfaceName,
            method: 'POST',
            async: true,
            data: data,
            contentType: 'application/json'
        };
        return this.processAjax(options);
    };
    Ajax.prototype.processAjax = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.withCredentials = true;
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    var resp = JSON.parse(xmlhttp.responseText);
                    if (xmlhttp.status === 200 && resp.retCode === '00000') {
                        resolve(resp);
                    }
                    else {
                        reject(resp);
                        _this.errorHandler(resp);
                    }
                }
            };
            xmlhttp.open(options.method, options.url, options.async);
            xmlhttp.setRequestHeader('Content-Type', options.contentType);
            xmlhttp.send(JSON.stringify(options.data));
        });
    };
    Ajax.prototype.errorHandler = function (resp) {
        if (resp['retCode'] === '00001') {
            localStorage.removeItem('isProfileLogin');
            EventService.emit('Login_Cookie_Expired');
        }
    };
    return Ajax;
}());
export var AjaxHandler = new Ajax();
