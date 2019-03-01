var UtilServices = (function () {
    function UtilServices() {
    }
    UtilServices.prototype.preventDefault = function (e) {
        e = e || window.event;
        if (e['preventDefault']) {
            e['preventDefault']();
        }
        else {
            e['returnValue'] = false;
        }
    };
    UtilServices.prototype.addEvent = function (element, eventType, callback) {
        if (element['addEventListener']) {
            element['addEventListener'](eventType, callback, false);
        }
        else if (element['attachEvent']) {
            element['attachEvent']('on' + eventType, callback);
        }
    };
    UtilServices.prototype.removeEvent = function (element, eventType, callback) {
        if (!element) {
            return;
        }
        if (element['removeEventListener']) {
            element['removeEventListener'](eventType, callback, false);
        }
        else if (element['detachEvent']) {
            element['detachEvent']('on' + eventType, callback);
        }
    };
    return UtilServices;
}());
export var UtilService = new UtilServices();
