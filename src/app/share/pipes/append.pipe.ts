import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'append'
})

export class AppendPipe implements PipeTransform {
    transform(value: string, param: string) {
        return value + param;
    }
}
