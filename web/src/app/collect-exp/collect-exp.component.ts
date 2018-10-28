import { Component, OnInit } from '@angular/core';
import { CanvasService } from '../canvas.service';
import { Submission } from '../interfaces/submission';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-collect-exp',
  templateUrl: './collect-exp.component.html',
  styleUrls: ['./collect-exp.component.less']
})
export class CollectExpComponent implements OnInit {

  constructor(public canvasService: CanvasService) {}

  ngOnInit() {
  }

  public getSubmissions(): Observable<Submission[]> {
    return this.canvasService.getAllSubmissionsObservable();
  }

  public onClick(submission: Submission): void {
    this.canvasService.setExperiencePoints(submission.score);
  }

}
