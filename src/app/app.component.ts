import { Component } from '@angular/core';
import {BaseRequestsService} from "./base-requests.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Canvasify';
  constructor(request: BaseRequestsService){
      request.get("https://canvas.ubc.ca/api/v1/courses");
  }
}
