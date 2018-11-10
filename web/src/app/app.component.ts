import { Component } from '@angular/core';
import {CanvasService} from './canvas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public title = 'Canvasify';
  constructor(private _canvasService: CanvasService) {
      _canvasService.refreshAll();
      _canvasService.startPolling(10000);
  }

}
