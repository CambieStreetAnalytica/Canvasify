import { Injectable } from '@angular/core';
import {BaseRequestsService} from './base-request.service';
import {Course} from './interfaces/course';
import {combineLatest, Observable} from 'rxjs';
import {map, flatMap, mergeAll} from "rxjs/operators";
import {Assignment} from "./interfaces/assigment";
import {Submission} from "./interfaces/submission";

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  constructor(private _request: BaseRequestsService) { }

  public getAllCourses(): Observable<Course[]> {
      return this._request.get<Course[]>('courses');
  }

  public getAllAssignments(): Observable<Assignment[]> {
     let courseIds: Observable<number[]> = this.getAllCourses().pipe(
         map((courses: Course[]) => courses.map((course: Course) => course.id))
     );
      let allAssignments: Observable<Assignment[]> = courseIds.pipe(
          flatMap((courseIds: number[]) => {
              let assignmentObservables: Observable<Assignment[]>[] = courseIds.map((courseId: number) => this.getAssignmentsForCourse(courseId.toString()));
              return combineLatest(assignmentObservables).pipe(
                  map((arrayOfAssignments: Assignment[][]) => {
                      let assignments: Assignment[] = [].concat(...arrayOfAssignments);
                      return assignments;
                  })
              );
          })
      );
     return allAssignments;
  }

  public getSubmissionForAssignment(courseId: string, assignmentId: string): Observable<Submission> {
      return this._request.get<Submission>('courses/' + courseId + "/assignments/" + assignmentId + "/submissions/self");
  }

  public getAllSubmission(): Observable<Submission[]> {
      return this.getAllAssignments().pipe(
          flatMap((assignments: Assignment[]) => {
              let submissionObservables: Observable<Submission>[] = assignments
                  .filter((assignment: Assignment) => assignment.id !== undefined && assignment.course_id !== undefined)
                  .map((assignment: Assignment) => this.getSubmissionForAssignment(assignment.course_id.toString(), assignment.id.toString()));
              return combineLatest(submissionObservables)
          })
      )
  }

  public getAssignmentsForCourse(courseId: string): Observable<Assignment[]> {
      return this._request.get<Assignment[]>("courses/" + courseId + "/assignments");
  }
}
