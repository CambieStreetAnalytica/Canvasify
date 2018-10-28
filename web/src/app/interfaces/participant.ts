export interface Participant {
    id: number;
    display_name: string;
    avatar_image_url: string;
    html_url: string;
}

export interface ParticipantPost {
    id: number;
    user_id: number;
    message: string;
    replies: ParticipantPost[];
}

