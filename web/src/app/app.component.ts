import { Component } from '@angular/core';
import {BaseRequestsService} from "./base-request.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Canvasify';
  constructor(private canvasRequest: BaseRequestsService) {
      this.canvasRequest.get<Object>('courses').subscribe(console.log);
  }

}
