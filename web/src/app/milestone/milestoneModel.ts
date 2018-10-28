import {Observable} from "rxjs";

export class MilestoneModel {
    constructor(
        public completed: Observable<boolean>,
        public title: string,
    ) {}
}
