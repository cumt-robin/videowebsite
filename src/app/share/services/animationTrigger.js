import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut, shrink, stretch, flyIn, flyOut, zoomIn, zoomOut, focusScale, blurScale } from '../animations/_animation';
// 动画时间曲线
var TIME_FUNC = {
    ease: 'ease',
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    stepStart: 'step-start',
    stepEnd: 'step-end',
    easeInOut: 'ease-in-out',
    faseOutSlowIn: 'cubic-bezier(0.4, 0, 0.2, 1)',
    inOutBack: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    inOutCubic: 'cubic-bezier(0.65, 0.05, 0.36, 1)',
    inOutQuadratic: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)',
    inOutSine: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
    tanxing: 'cubic-bezier(.8,-.5,.2,1.4)',
    sharpCurve: 'cubic-bezier(.33, .0, .67, 1)',
    forPicture: 'cubic-bezier(.42, 0, .58, 1)'
};
export var testAnim = [
    trigger('testAnim', [
        state('fadeInEnd', style({ opacity: 1 })),
        state('fadeOutEnd', style({ opacity: 0 })),
        state('shrinkEnd', style({ height: 0 })),
        state('stretchEnd', style({ height: '*' })),
        state('flyInEnd', style({ transform: '*' })),
        state('flyOutEnd', style({ transform: 'translateX(-100%)' })),
        state('zoomInEnd', style({ transform: '*' })),
        state('zoomOutEnd', style({ transform: 'scale(0)' })),
        transition('* => fadeInEnd', useAnimation(fadeIn, { params: {
                duration: '2000',
                delay: '0',
                timeFunc: TIME_FUNC.linear
            } })),
        transition('* => fadeOutEnd', useAnimation(fadeOut, { params: {
                duration: '2000',
                delay: '0',
                timeFunc: TIME_FUNC.linear
            } })),
        transition('* => shrinkEnd', useAnimation(shrink, { params: {
                duration: '2000',
                delay: '0',
                timeFunc: TIME_FUNC.linear
            } })),
        transition('* => stretchEnd', useAnimation(stretch, { params: {
                duration: '2000',
                delay: '0',
                timeFunc: TIME_FUNC.linear
            } })),
        transition('* => flyInEnd', useAnimation(flyIn, { params: {
                duration: '2000',
                delay: '0',
                timeFunc: TIME_FUNC.linear
            } })),
        transition('* => flyOutEnd', useAnimation(flyOut, { params: {
                duration: '2000',
                delay: '0',
                timeFunc: TIME_FUNC.linear
            } })),
        transition('* => zoomInEnd', useAnimation(zoomIn, { params: {
                duration: '2000',
                delay: '0',
                timeFunc: TIME_FUNC.linear
            } })),
        transition('* => zoomOutEnd', useAnimation(zoomOut, { params: {
                duration: '2000',
                delay: '0',
                timeFunc: TIME_FUNC.linear
            } }))
    ])
];
export var PosterScale = [
    trigger('posterScale', [
        state('focusEnd', style({ transform: 'scale3d(1.1,1.1,1)' })),
        state('blurEnd', style({ transform: 'scale3d(1,1,1)' })),
        transition('* => focusEnd', useAnimation(focusScale, { params: {
                duration: '300',
                delay: '0',
                timeFunc: TIME_FUNC.sharpCurve,
                middleScale: '1.15,1.15,1',
                endScale: '1.1,1.1,1'
            } })),
        transition('* => blurEnd', useAnimation(blurScale, { params: {
                duration: '300',
                delay: '0',
                timeFunc: TIME_FUNC.sharpCurve
            } }))
    ])
];
export var FadeInOut = [
    trigger('fadeInOut', [
        state('in', style({ opacity: 1 })),
        state('out', style({ opacity: 0 })),
        transition('out => in', useAnimation(fadeIn, { params: {
                duration: '1000',
                delay: '50',
                timeFunc: TIME_FUNC.linear
            } })),
        transition('in => out', useAnimation(fadeOut, { params: {
                duration: '600',
                delay: '50',
                timeFunc: TIME_FUNC.linear
            } }))
    ])
];
