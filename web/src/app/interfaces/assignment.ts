export interface Assignment {
    id: number;
    name: string;
    description: string;
    created_at: string; //times in format 'YYYY-MM-DDTHH:MM:SS-06:00'
    updated_at: string;
    due_at: string;
    lock_at: string; //null if not present
    course_id: number;
    html_url: string; //url to download all submissions as zip
    assignment_group_id: number;
    due_date_required: boolean;
    points_possible: number;
    grading_type: string //"points" "letter_drade" "gpa_scale"
    has_submitted_submissions: boolean;
    published: boolean;
}
