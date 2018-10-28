import { Component } from '@angular/core';
import {CanvasService} from "./canvas.service";

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

      //this.canvasService.getAssignmentsForCourse("26149").subscribe(console.log);

      this.canvasService.getAllAssignments().subscribe(console.log);
      this.canvasService.getSubmissionForAssignment('26149', '223553').subscribe(console.log);
      this.canvasService.getAllSubmission().subscribe(console.log);


  }

}
