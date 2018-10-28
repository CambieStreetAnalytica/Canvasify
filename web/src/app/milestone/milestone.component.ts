import {Component, Input, OnInit} from '@angular/core';
import {MilestoneModel} from "./milestoneModel";

@Component({
    selector: 'app-milestone',
    templateUrl: './milestone.component.html',
    styleUrls: ['./milestone.component.less']
})
export class MilestoneComponent implements OnInit {
    @Input()
    public milestone: MilestoneModel;
    constructor() {
    }

    ngOnInit() {
    }

}
