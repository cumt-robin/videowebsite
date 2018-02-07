class UtilServices {
    preventDefault(e: Object) {
        e = e || window.event;
        if (e['preventDefault']) {
            e['preventDefault']();
        } else {
            e['returnValue'] = false;
        }
    }

    addEvent(element: Object, eventType: string, callback: Function) {
        if (element['addEventListener']) {
            element['addEventListener'](eventType, callback, false);
        } else if (element['attachEvent']) {
            element['attachEvent']('on' + eventType, callback);
        }
    }

    removeEvent(element: Object, eventType: string, callback: Function) {
        if (element['removeEventListener']) {
            element['removeEventListener'](eventType, callback, false);
        } else if (element['detachEvent']) {
            element['detachEvent']('on' + eventType, callback);
        }
    }
}

export const UtilService = new UtilServices();
