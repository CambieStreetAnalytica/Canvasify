import {FullTopic} from "./interfaces/discussionTopic";
import {Participant, ParticipantPost} from "./interfaces/participant";

export class DiscussionRollupHelper {
    // rolls up the number of posts the user has made given an array of FullTopic objects and a user ID
    public countAllEntries(fullTopics: FullTopic[], myId: string): number {
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

    // rolls up all the upvotes the user has received given an array full topic objects and a user ID
    public countAllUpvotes(topics: FullTopic[], myId: string): number {
        return topics
            .map((fullTopic: FullTopic) => {
                return this._countAllUpvotesInTopic(fullTopic, myId);
            }).reduce((accumulator: number, current: number) => accumulator + current);
    }

    private _countAllUpvotesInTopic(topic: FullTopic, myId: string): number {
        const participatedInTopic: boolean = topic.participants.some((participant: Participant) => {
            return participant.id.toString() === myId;
        });
        let currentCount: number = 0;
        if (!participatedInTopic) {
            return currentCount;
        }

        for (const post of topic.view) {
            currentCount += this._countAllUpvotesInParticipantPost(post, myId);
        }

        return currentCount;
    }

    private _countAllUpvotesInParticipantPost(post: ParticipantPost, myId: string): number {
        const idMatch: boolean = post.user_id.toString() === myId;
        const areReplies: boolean = post.replies !== undefined && post.replies.length > 0;
        let currentValue: number = 0;

        if (idMatch) {
            currentValue += post.rating_count !== undefined && post.rating_count !== null ? post.rating_count : 0;
        }

        if (areReplies) {
            for (const reply of post.replies) {
                currentValue += this._countAllEntriesInParticipantPost(reply, myId);
            }
        }

        return currentValue;
    }
}
