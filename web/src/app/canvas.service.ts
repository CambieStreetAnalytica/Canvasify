import {Injectable} from '@angular/core';
import {BaseRequestsService} from './base-request.service';
import {Course} from './interfaces/course';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {flatMap, map, tap} from 'rxjs/operators';
import {Assignment} from './interfaces/assignment';
import {Submission} from './interfaces/submission';
import {DiscussionTopic, FullTopic} from './interfaces/discussionTopic';
import {Profile} from './interfaces/Profile';
import {DiscussionRollupHelper} from "./discussionRollupHelper";

@Injectable({
    providedIn: 'root'
})
export class CanvasService {
    private _allSubmissions: Subject<Submission[]> = new Subject<Submission[]>();
    private _numberOfPostsByUser: Subject<number> = new Subject<number>();
    private _numberOfUpvotesByUser: Subject<number> = new Subject<number>();
    private _allAssignments: Subject<Assignment[]> = new Subject<Assignment[]>();
    private _allFullTopic: Subject<FullTopic[]> = new Subject<FullTopic[]>();
    private _discussionRollupHelper: DiscussionRollupHelper;

    private _expPoints: Subject<number> = new Subject<number>();
    private _totalExpPoints: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(private _request: BaseRequestsService) {
        this._discussionRollupHelper = new DiscussionRollupHelper();
        this._expPoints.subscribe((points: number) => this._totalExpPoints.next(this._totalExpPoints.value + points));
    }

    // Refresh methods

    // refreshes data every frequency milliseconds -- first refresh after frequency milliseconds
    public startPolling(frequency: number): void {
        if (frequency < 1000) {
            throw new Error("polling too fast!!!");
        }
        window.setInterval(() => {
            this.refreshAll();
        }, frequency);
    }

    public endPolling(): void {
        window.clearInterval();
    }

    public refreshAll(): void {
        combineLatest(this._getAllCourses(), this._getSelf()).pipe(
            tap(value => {
                const courses: Course[] = value[0];
                const self: Profile = value[1];
                this.refreshDiscussionData(courses, self);
                this.refreshAssignmentData(courses);
            })
        ).subscribe();
    }

    public refreshDiscussionData(courses?: Course[], self?: Profile): void {
        if (courses !== undefined && self !== undefined) {
            this._getAllFullTopics(courses, self).subscribe();
        } else {
            combineLatest(this._getAllCourses(), this._getSelf()).pipe(
                tap(value => {
                    courses = value[0];
                    self = value[1];
                    this._getAllFullTopics(courses, self).pipe(
                        tap((fullTopics: FullTopic[]) => {
                            this._numberOfPostsByUser.next(this._getNumberOfPostsByUser(fullTopics, self));
                            this._numberOfUpvotesByUser.next(this._getNumberOfUpvotesByUser(fullTopics, self));
                        })
                    ).subscribe();
                })
            ).subscribe();
        }
    }

    public refreshAssignmentData(courses?: Course[]): void {
        if (courses !== undefined) {
            this._getAllSubmissions(courses).subscribe();
        } else {
            this._getAllCourses().pipe(
                tap((allCourses: Course[]) => {
                    this._getAllSubmissions(allCourses).subscribe();
                })
            ).subscribe();
        }
    }

    // Exposed Observables to get data from

    public getAllAssignmentsObservable(): Observable<Assignment[]> {
        return this._allAssignments.asObservable();
    }

    public getAllSubmissionsObservable(): Observable<Submission[]> {
        return this._allSubmissions.asObservable();
    }

    public getNumberOfPostsByUserObservable(): Observable<number> {
        return this._numberOfPostsByUser.asObservable();
    }

    public getNumberOfUpvotesObservable(): Observable<number> {
        return this._numberOfUpvotesByUser.asObservable();
    }

    public getAllFullTopicsObservable(): Observable<FullTopic[]> {
        return this._allFullTopic.asObservable();
    }

    // methods to get and set experience
    public setExperiencePoints(points: number): void {
        this._expPoints.next(points);
    }

    public getExperiencePoints(): Observable<number> {
        return this._totalExpPoints;
    }

    // methods to get data from Canvas

    private _getAllCourses(): Observable<Course[]> {
        return this._request.get<Course[]>('courses');
    }

    private _getAllAssignments(courses: Course[]): Observable<Assignment[]> {
        const courseIds: number[] = courses.map((course: Course) => course.id);
        const assignmentObservables: Observable<Assignment[]>[] = courseIds
            .map((courseId: number) => this._getAssignmentsForCourse(courseId.toString()));
        return combineLatest(assignmentObservables).pipe(
            map((arrayOfAssignments: Assignment[][]) => {
                let assignments: Assignment[] = [].concat(...arrayOfAssignments);
                assignments = assignments.filter((assignment: Assignment) => this._authorized(<Object>assignment));
                this._allAssignments.next(assignments);
                return assignments;
            })
        );
    }

    private _getSubmissionForAssignment(courseId: string, assignmentId: string): Observable<Submission> {
        return this._request.get<Submission>('courses/' + courseId + '/assignments/' + assignmentId + '/submissions/self');
    }

    private _getAllSubmissions(courses: Course[]): Observable<Submission[]> {
        return this._getAllAssignments(courses).pipe(
            flatMap((assignments: Assignment[]) => {
                const submissionObservables: Observable<Submission>[] = assignments
                    .filter((assignment: Assignment) => assignment.id !== undefined && assignment.course_id !== undefined)
                    .map((assignment: Assignment) => {
                        return this._getSubmissionForAssignment(assignment.course_id.toString(), assignment.id.toString());
                    });
                return combineLatest(submissionObservables).pipe(tap(
                    (submissions: Submission[]) => {
                        this._allSubmissions.next(submissions);
                    }
                ));
            })
        );
    }

    private _getAssignmentsForCourse(courseId: string): Observable<Assignment[]> {
        return this._request.get<Assignment[]>('courses/' + courseId + '/assignments');
    }

    private _getDiscussionTopicsForCourse(courseId: string): Observable<DiscussionTopic[]> {
        return this._request.get<DiscussionTopic[]>('courses/' + courseId + '/discussion_topics');
    }

    private _getFullTopic(courseId: string, topicId: string): Observable<FullTopic> {
        return this._request.get<FullTopic>('courses/' + courseId + '/discussion_topics/' + topicId + '/view');
    }

    private _getAllDiscussionTopics(courses: Course[]): Observable<DiscussionTopic[]> {
        const topicsObservables: Observable<DiscussionTopic[]>[] = courses.map((course: Course) => {
            return this._getDiscussionTopicsForCourse(course.id.toString()).pipe(
                map((discussionTopics: DiscussionTopic[]) => {
                    if (this._authorized(<Object>discussionTopics)) {
                        return discussionTopics.map((discussionTopic: DiscussionTopic) => {
                            const topic: DiscussionTopic = discussionTopic;
                            topic.course_id = course.id;
                            return topic;
                        });
                    }
                    return discussionTopics;
                })
            );
        });
        return combineLatest(topicsObservables).pipe(
            map((topicsArrays: DiscussionTopic[][]) => {
                const topics: DiscussionTopic[] = [].concat(...topicsArrays);
                console.log(topics);
                return topics;
            })
        );
    }

    private _getAllFullTopics(courses: Course[], self: Profile): Observable<FullTopic[]> {
        return this._getAllDiscussionTopics(courses).pipe(
            flatMap((discussionTopics: DiscussionTopic[]) => {
                return combineLatest(
                    discussionTopics
                        .filter((discussionTopic: DiscussionTopic) => {
                            return discussionTopic.course_id !== undefined && discussionTopic.id !== undefined;
                        })
                        .map((discussionTopic: DiscussionTopic) => {
                            return this._getFullTopic(discussionTopic.course_id.toString(), discussionTopic.id.toString());
                        })).pipe(
                    tap((topics: FullTopic[]) => {
                            this._allFullTopic.next(topics);
                        }
                    )
                );
            })
        );
    }

    private _getNumberOfPostsByUser(fullTopics: FullTopic[], self: Profile): number {
        return this._discussionRollupHelper.countAllEntries(fullTopics, self.id.toString());
    }

    private _getNumberOfUpvotesByUser(fullTopics: FullTopic[], self: Profile): number {
        return this._discussionRollupHelper.countAllUpvotes(fullTopics, self.id.toString());
    }

    private _getSelf(): Observable<Profile> {
        return this._request.get<Profile>('users/self');
    }

    private _authorized(object: Object): boolean {
        return object['status'] !== 'unauthorized';
    }

}
