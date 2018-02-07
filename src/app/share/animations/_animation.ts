import { style, animate, animation, keyframes } from '@angular/animations';

export const fadeIn = animation([
    style({ opacity: 0 }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ opacity: 1 }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});

export const fadeOut = animation([
    style({ opacity: 1 }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ opacity: 0 }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});

export const shrink = animation([
    style({ height: '*' }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ height: 0 }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});

export const stretch = animation([
    style({ height: 0 }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ height: '*' }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});

export const flyIn = animation([
    style({ transform: 'translateX(-100%)' }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ transform: '*' }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});

export const flyOut = animation([
    style({ transform: '*' }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ transform: 'translateX(-100%)' }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});

export const zoomIn = animation([
    style({ transform: 'scale(0)' }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ transform: '*' }))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});

export const zoomOut = animation([
    style({ transform: '*' }),
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({ transform: 'scale(0)'}))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease'
    }
});

export const focusScale = animation([
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', keyframes([
        style({transform: 'scale3d({{middleScale}})', offset: 0.75}),
        style({transform: 'scale3d({{endScale}})', offset: 1})
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

export const blurScale = animation([
    animate('{{duration}}ms {{delay}}ms {{timeFunc}}', style({transform: 'scale3d(1,1,1)'}))
], {
    params: {
        duration: '300',
        delay: '0',
        timeFunc: 'ease',
    }
});
