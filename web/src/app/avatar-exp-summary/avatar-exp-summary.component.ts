import { Component, OnInit } from '@angular/core';
import { CanvasService } from '../canvas.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Assignment } from '../interfaces/assignment';
import { Submission } from '../interfaces/submission';

@Component({
  selector: 'app-avatar-exp-summary',
  templateUrl: './avatar-exp-summary.component.html',
  styleUrls: ['./avatar-exp-summary.component.less']
})
export class AvatarExpSummaryComponent implements OnInit {

  constructor(private _canvasService: CanvasService) {
    /*
    this._submissionScores = this._canvasService.getAllSubmissionsObservable().pipe(
      map((submissions: Submission[]) => {
        let scores: number[] = submissions.map((submission: Submission) => submission.score === null ? 0 : submission.score);
        return scores.reduce((acc: number, score: number) => acc + score);
      })
    );
    */
  }

  ngOnInit() {
  }

  public getExperiencePoints(): Observable<number> {
    return this._canvasService.getExperiencePoints();
  }

  // allAssignments, allFullTopics
}
