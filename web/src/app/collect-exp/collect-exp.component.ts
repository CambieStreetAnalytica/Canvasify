import {Component, OnInit} from '@angular/core';
import {CanvasService} from '../canvas.service';
import {Submission} from '../interfaces/submission';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-collect-exp',
    templateUrl: './collect-exp.component.html',
    styleUrls: ['./collect-exp.component.less']
})
export class CollectExpComponent implements OnInit {
    public mockSubmissions: Submission[];
    public submissions: Observable<Submission[]>;

    constructor(public canvasService: CanvasService) {
    }

    ngOnInit() {
        this.mockSubmissions = [
            {name: "Midterm 1", score: 30} as Submission,
            {name: "Quiz 6", score: 20} as Submission,
            {name: "Assignment 4", score: 15} as Submission
        ];
        this.submissions = this.canvasService.getAllSubmissionsObservable();
    }

    public onClick(submission: Submission): void {
        this.canvasService.setExperiencePoints(submission.score);
    }

}
