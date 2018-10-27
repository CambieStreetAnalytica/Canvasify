import { Component } from '@angular/core';
import {BaseRequestsService} from "./base-request.service";
import {CanvasService} from "./canvas.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Canvasify';
  constructor(private canvasService: CanvasService) {
      this.canvasService.getCourses().subscribe(x => x.map(y => console.log(y.id)));
  }

}
