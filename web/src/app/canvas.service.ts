import {Injectable} from '@angular/core';
import {BaseRequestsService} from './base-request.service';
import {Course} from './interfaces/course';
import {combineLatest, Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {Assignment} from './interfaces/assignment';
import {Submission} from './interfaces/submission';
import {DiscussionTopic, FullTopic} from './interfaces/discussionTopic';
import {Profile} from './interfaces/Profile';
import {Participant, ParticipantPost} from './interfaces/participant';

@Injectable({
    providedIn: 'root'
})
export class CanvasService {

    constructor(private _request: BaseRequestsService) {
    }

    public getAllCourses(): Observable<Course[]> {
        return this._request.get<Course[]>('courses');
    }

    public getAllAssignments(): Observable<Assignment[]> {
        const courseIds: Observable<number[]> = this.getAllCourses().pipe(
            map((courses: Course[]) => courses.map((course: Course) => course.id))
        );
        const allAssignments: Observable<Assignment[]> = courseIds.pipe(
            flatMap((courseIdNumbers: number[]) => {
                const assignmentObservables: Observable<Assignment[]>[] = courseIdNumbers
                    .map((courseId: number) => this.getAssignmentsForCourse(courseId.toString()));
                return combineLatest(assignmentObservables).pipe(
                    map((arrayOfAssignments: Assignment[][]) => {
                        let assignments: Assignment[] = [].concat(...arrayOfAssignments);
                        assignments = assignments.filter((assignment: Assignment) => this._authorized(<Object>assignment));
                        return assignments;
                    })
                );
            })
        );
        return allAssignments;
    }

    public getSubmissionForAssignment(courseId: string, assignmentId: string): Observable<Submission> {
        return this._request.get<Submission>('courses/' + courseId + '/assignments/' + assignmentId + '/submissions/self');
    }

    public getAllSubmission(): Observable<Submission[]> {
        return this.getAllAssignments().pipe(
            flatMap((assignments: Assignment[]) => {
                const submissionObservables: Observable<Submission>[] = assignments
                    .filter((assignment: Assignment) => assignment.id !== undefined && assignment.course_id !== undefined)
                    .map((assignment: Assignment) => {
                        return this.getSubmissionForAssignment(assignment.course_id.toString(), assignment.id.toString());
                    });
                return combineLatest(submissionObservables);
            })
        );
    }

    public getAssignmentsForCourse(courseId: string): Observable<Assignment[]> {
        return this._request.get<Assignment[]>('courses/' + courseId + '/assignments');
    }

    public getDiscussionTopicsForCourse(courseId: string): Observable<DiscussionTopic[]> {
        return this._request.get<DiscussionTopic[]>('courses/' + courseId + '/discussion_topics');
    }

    public getFullTopic(courseId: string, topicId: string): Observable<FullTopic> {
        return this._request.get<FullTopic>('courses/' + courseId + '/discussion_topics/' + topicId + '/view');
    }

    public getAllDiscussionTopics(): Observable<DiscussionTopic[]> {
        return this.getAllCourses().pipe(
            flatMap((courses: Course[]) => {
                const topicsObservables: Observable<DiscussionTopic[]>[] = courses.map((course: Course) => {
                    return this.getDiscussionTopicsForCourse(course.id.toString()).pipe(
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
                        return topics;
                    })
                );
            })
        );
    }

    public getAllFullTopics(): Observable<FullTopic[]> {
        return this.getAllDiscussionTopics().pipe(
            flatMap((discussionTopics: DiscussionTopic[]) => {
                return combineLatest(
                    discussionTopics
                        .filter((discussionTopic: DiscussionTopic) => {
                            return discussionTopic.course_id !== undefined && discussionTopic.id !== undefined;
                        })
                        .map((discussionTopic: DiscussionTopic) => {
                            return this.getFullTopic(discussionTopic.course_id.toString(), discussionTopic.id.toString());
                        }));
            })
        );
    }

    // don't overuse as its somewhat calculation and call heavy
    // tested by adding replies to discussion and replying to other replies
    public getNumberOfPostsByUser(): Observable<number> {
        return combineLatest(this.getAllFullTopics(), this.getSelf()).pipe(
            map(value => {
                const fullTopics: FullTopic[] = value[0];
                const self: Profile = value[1];
                return this._countAllEntries(fullTopics, self.id.toString());
            })
        );
    }

    public getSelf(): Observable<Profile> {
        return this._request.get<Profile>('users/self');
    }

    private _authorized(object: Object): boolean {
        return object['status'] !== 'unauthorized';
    }

    private _countAllEntries(fullTopics: FullTopic[], myId: string): number {
        return fullTopics
            .map((fullTopic: FullTopic) => {
                return this._countAllEntriesInTopic(fullTopic, myId);
            }).reduce((accumulator: number, current: number) => accumulator + current);

    }

    private _countAllEntriesInTopic(fullTopic: FullTopic, myId: string): number {
        const participatedInTopic: boolean = fullTopic.participants.some((participant: Participant) => {
            return participant.id.toString() === myId;
        });
        let currentCount: number = 0;
        if (!participatedInTopic) {
            return currentCount;
        }

        for (const post of fullTopic.view) {
            currentCount += this._countAllEntriesInParticipantPost(post, myId);
        }

        return currentCount;

    }

    private _countAllEntriesInParticipantPost(post: ParticipantPost, myId: string): number {
        const idMatch: boolean = post.user_id.toString() === myId;
        const areReplies: boolean = post.replies !== undefined && post.replies.length > 0;
        let currentValue: number = 0;

        if (idMatch) {
            currentValue++;
        }

        if (areReplies) {
            for (const reply of post.replies) {
                currentValue += this._countAllEntriesInParticipantPost(reply, myId);
            }
        }

        return currentValue;

    }
}
