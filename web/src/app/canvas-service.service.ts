import { Injectable } from '@angular/core';
import {BaseRequestsService} from "./base-request.service";

@Injectable({
  providedIn: 'root'
})
export class CanvasServiceService {

  constructor(private _request: BaseRequestsService) { }
}
