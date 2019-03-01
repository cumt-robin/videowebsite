import { style, animate, animation, keyframes } from '@angular/animations';
export var fadeIn = animation([
    style({ opacity: 0 }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ opacity: 1 }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});
export var fadeOut = animation([
    style({ opacity: 1 }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ opacity: 0 }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});
export var shrink = animation([
    style({ height: '*' }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ height: 0 }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});
export var stretch = animation([
    style({ height: 0 }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ height: '*' }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});
export var flyIn = animation([
    style({ transform: 'translateX(-100%)' }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ transform: '*' }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});
export var flyOut = animation([
    style({ transform: '*' }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ transform: 'translateX(-100%)' }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});
export var zoomIn = animation([
    style({ transform: 'scale(0)' }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ transform: '*' }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});
export var zoomOut = animation([
    style({ transform: '*' }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ transform: 'scale(0)' }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});
export var focusScale = animation([
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', keyframes([
        style({ transform: 'scale3d({{middleScale}})', offset: 0.75 }),
        style({ transform: 'scale3d({{endScale}})', offset: 1 })
    ]))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease',
        middleScale: '1.2,1.2,1',
        endScale: '1.1,1.1,1'
    }
});
export var blurScale = animation([
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ transform: 'scale3d(1,1,1)' }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease',
    }
});
