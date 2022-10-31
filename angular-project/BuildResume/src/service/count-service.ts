import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class CountService {

    private countService = new BehaviorSubject(50);
    currentValue = this.countService.asObservable();

    constructor() {
    }

    changeValue(value: number) {
        console.log('call happend', value);
        this.countService.next(value);

    }
}