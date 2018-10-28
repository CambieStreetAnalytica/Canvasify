import { Injectable } from '@angular/core';
import {BaseRequestsService} from './base-request.service';
import {Course} from './interfaces/course';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  constructor(private _request: BaseRequestsService) { }

  public getCourses(): Observable<Course[]> {
      return this._request.get<Course[]>('courses');
  }
}
