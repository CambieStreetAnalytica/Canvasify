import {Participant, ParticipantPost} from "./participant";

export interface DiscussionTopic {
    id: number;
    title: string;
    message: string;
    html_url: string;
    posted_at: string;
    last_reply_at: string;
    discussion_subentry_count: number;
    read_state: string;
    unread_count: number;
    subscribed: boolean;
    assignment_id: string;
    user_name: string;
    course_id: number; // manually added


}

export interface FullTopic {
    unreadEntries: number[];
    participants: Participant[];
    view: ParticipantPost[];
}
