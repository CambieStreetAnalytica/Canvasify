import {Component, OnInit} from '@angular/core';
import {CanvasService} from "../canvas.service";
import {Observable, of, concat} from "rxjs";
import {map, delay} from "rxjs/operators";
import {MilestoneModel} from "../milestone/milestoneModel";

@Component({
    selector: 'app-milestone-list',
    templateUrl: './milestone-list.component.html',
    styleUrls: ['./milestone-list.component.less']
})
export class MilestoneListComponent implements OnInit {
    public numPostsObservable: Observable<boolean>;
    public numLikesObservable: Observable<boolean>;
    public submitAssignmentObservable: Observable<boolean>;
    public markObservable: Observable<boolean>;
    public numPostsTitle: string = "Post 5 Times In Discussion";
    public numLikesTitle: string = "Get Three Upvotes";
    public marksTitle: string = "Get 90% Or Above On A Quiz Or Test";
    public submitEarlyTitle: string = "Submit An Assignment A Week Before The Deadline";
    public numPostModel: MilestoneModel;
    public numLikeModel: MilestoneModel;
    public submitModel: MilestoneModel;
    public markModel: MilestoneModel;
    public mileStones: MilestoneModel[];
    constructor(public canvasService: CanvasService) {
        this.numPostsObservable =  concat(of(false), canvasService.getNumberOfPostsByUserObservable().pipe(
            map((posts: number) => posts >= 5)
        ));
        this.numLikesObservable =  concat(of(false), canvasService.getNumberOfUpVotesObservable().pipe(
            map((likes: number) => likes >= 3)
        ));
        this.submitAssignmentObservable = of(true);
        this.markObservable = of(true);
        this.numLikeModel = new MilestoneModel(this.numLikesObservable, this.numLikesTitle);
        this.numPostModel = new MilestoneModel(this.numPostsObservable, this.numPostsTitle);
        this.submitModel = new MilestoneModel(this.submitAssignmentObservable, this.submitEarlyTitle);
        this.markModel = new MilestoneModel(this.markObservable, this.marksTitle);
        this.mileStones = [this.numPostModel, this.numLikeModel, this.submitModel, this.markModel];
    }

    ngOnInit() {
    }

}
