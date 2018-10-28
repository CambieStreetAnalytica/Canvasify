import { Component } from '@angular/core';
import {CanvasService} from './canvas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Canvasify';
  constructor(private canvasService: CanvasService) {
      // this.canvasService.getAllCourses().subscribe(x => x.map(y => {
      //     console.log("new course");
      //     console.log(y.id);
      //     console.log(y.uuid);
      //     console.log(y.access_restricted_by_date);
      //     console.log(y.name);
      //     console.log(y.account_id);
      //     console.log(y.total_students);
      // }));

      // this.canvasService.getAssignmentsForCourse("26149").subscribe(console.log);

      // this.canvasService.getAllAssignments().subscribe(console.log);
      // this.canvasService.getSubmissionForAssignment('26149', '223553').subscribe(console.log);
      // this.canvasService.getAllSubmission().subscribe(console.log);
      // this.canvasService.getDiscussionTopicsForCourse()

      // this.canvasService.getDiscussionTopicsForCourse("26149").subscribe(console.log);
      // this.canvasService.getFullTopic('26149','143732').subscribe(console.log);
      // this.canvasService.getSelf().subscribe(console.log);
      // this.canvasService.getAllFullTopics().subscribe(console.log);
      // setTimeout(() => {
      //     this.canvasService.getNumberOfUpVotesObservable().subscribe(console.log);
      // }, 5000);
      // this.canvasService.refreshDiscussionData();
      // this.canvasService.getNumberOfPostsByUser().subscribe(console.log); //returns number of posts and replies in discussion

  }

}
