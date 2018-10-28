export interface Submission {
    name: string;
    assignment_id: number;
    assignment: string;
    course: string;
    attempt: number;
    body: string;
    grade: string;
    grade_matches_current_submission: boolean;
    html_url: string;
    preview_url: string;
    score: number;
    submitted_at: string;
    url: string;
    user_id: number;
    grader_id: number;
    graded_at: string;
    user: string;
    late: false;
    workflow_state: string;
}
