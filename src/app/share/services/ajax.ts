import { Config } from '../../../../config/system.config';
import { AjaxOption } from './dataType';
import { EventService } from './event.service';

class Ajax {

    ajax(interfaceName: string, data: Object) {
        let options: AjaxOption = {
            url: Config.serverUrl + '/' + interfaceName,
            method: 'POST',
            async: true,
            data: data,
            contentType: 'application/json'
        };
        return this.processAjax(options);
    }

    processAjax(options: AjaxOption) {
        return new Promise((resolve, reject) => {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.withCredentials = true;
            xmlhttp.onreadystatechange = () => {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    let resp = JSON.parse(xmlhttp.responseText);
                    if (xmlhttp.status === 200 && resp.retCode === '00000') {
                        resolve(resp);
                    } else {
                        reject(resp);
                        this.errorHandler(resp);
                    }
                }
            };
            xmlhttp.open(options.method, options.url, options.async);
            xmlhttp.setRequestHeader('Content-Type', options.contentType);
            xmlhttp.send(JSON.stringify(options.data));
        });
    }

    errorHandler(resp: Object) {
        if (resp['retCode'] === '00001') {
            localStorage.removeItem('isProfileLogin');
            EventService.emit('Login_Cookie_Expired');
        }
    }
}

export const AjaxHandler = new Ajax();
