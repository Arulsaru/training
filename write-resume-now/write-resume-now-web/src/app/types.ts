export type Resume = {
    first_name: string | null |undefined,
    last_name: string | null | undefined,
    phone_number: string | null | undefined,
    date_of_birth: string | null | undefined,
    email: string | null | undefined,
    state: string | null | undefined,
    city: string | null | undefined,
    pin_code: string | null | undefined,
    qualification: string | null | undefined,
    college_name: string | null | undefined,
    year_of_passed: string | null | undefined,
    field_of_study: string | null | undefined,
    cgpa: string | null | undefined,
    hsc_percentage: string | null | undefined,
    sslc_percentage: string | null | undefined,
    hsc_year_of_passed: string | null | undefined,
    sslc_year_of_passed: string | null | undefined,
    school_name: string | null | undefined,
    company_name: string | null | undefined,
    position: string | null | undefined,
    experience_start_date: string | null | undefined,
    experience_end_date: string | null | undefined,
    job_experience: string | null | undefined,
    skills: Array<string> | null | undefined,
    summary: string | null | undefined,
    languages: string[] | null | undefined,
    git_hub: string | null | undefined,
    linked_in: string | null | undefined,
    hobbies: Array<string> | null | undefined
}

export type ResumeCreateResponse = {
  message: string,
  data: Resume
}


export default Resume;
