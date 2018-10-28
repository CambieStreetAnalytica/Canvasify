export interface Course {
    id: number; // id is the only field that always has a value;
    uuid: string; // use uuid for persistence
    name: string;
    course_code: string;
    account_id: number;
    enrollment_term_id: number;
    grading_standard_id: number;
    start_at: string;
    end_at: string;
    locale: string;
    total_students: number;
    is_public: boolean;
    public_description: string;
    access_restricted_by_date: boolean; // if true, will not have data outside id, else usually undefined
}
