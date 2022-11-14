type ts = {    
    first_name: string | null | undefined;
    last_name: string | null | undefined;
    phone_number: number | null | undefined;
    email: string | null | undefined;
    birthday: string | null | undefined;
    field_of_study: string | null | undefined;
    gender: string | null | undefined;
    languages_known: string[] | null | undefined;
    state: string | null | undefined;
    city: string | null | undefined;
    pin_code: number | null | undefined;
    college_name: string | null | undefined;
    college_location: string | null | undefined;
    college_start_period: number | null | undefined;
    college_end_period: number | null | undefined;
    college_cgpa: number | null | undefined;
    school_name: string | null | undefined;
    school_location: string | null | undefined;
    hsc_percentage: number | null | undefined;
    sslc_percentage: number | null | undefined;

    companies: [
        {
            company_name: string | null | undefined;
            company_location: string | null | undefined;
            company_start_year: string | null | undefined;
            company_end_year: string | null | undefined;
        }
    ]

    projects: [
        {
            project_name: string | null | undefined;
            project_domain: string | null | undefined;
            project_description: string | null | undefined;
        }
    ]

    // company_name: string | null | undefined;
    // company_location: string | null | undefined;
    // project_name: string | null | undefined;
    // project_domain: string | null | undefined;
    // project_description: string | null | undefined;


    technical_skills: string[] | null | undefined;
    non_technical_skills: string[] | null | undefined;
    hobbies: string[] | null | undefined;
    user_profiles: string[] | null | undefined;
    github_url: string | null | undefined;
    linikedIn_url: string | null | undefined;
    description: string | null | undefined;
    profile_picture: File | null;
}


export type ResumeCreateResponse = {
    message: string,
    data: ts
}

export default ts;