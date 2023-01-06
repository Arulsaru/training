import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import resume from './types';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000';

  public resumeValue: resume = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    contact_number: '',
    email: '',
    location: '',
    pin_code: '',
    institute_name: '',
    institute_location: '',
    qualification: '',
    field_of_study: '',
    year_of_graduation: '',
    company_name: '',
    job_title: '',
    comapany_location: '',
    years_of_experience: '',
    skills: [],
    summary: '',
  }
   
  public personalDetails: any = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    contact_number: 0,
    email: '',
    location: '',
    pin_code: 0,
  }

  public education: any = {
    institute_name: '',
    institute_location: '',
    qualification: '',
    field_of_study: '',
    year_of_graduation: 0,
  }

  public experience: any = {
    company_name: '',
    job_title: '',
    comapany_location: '',
    years_of_experience: 0,
  }

  public skills: any[] = [];

  public summary: any = '';

  sharePersonalData(personalData: any) {
    this.personalDetails.first_name = personalData.first_name;
    this.personalDetails.last_name = personalData.last_name;
    this.personalDetails.date_of_birth = personalData.date_of_birth;
    this.personalDetails.gender = personalData.gender;
    this.personalDetails.contact_number = personalData.contact_number;
    this.personalDetails.email = personalData.email;
    this.personalDetails.location = personalData.location;
    this.personalDetails.pin_code = personalData.pin_code;   
  }

  shareEducationData(educationData: any) {
    this.education.institute_name = educationData.institute_name;
    this.education.institute_location = educationData.institute_location;
    this.education.qualification = educationData.qualification;
    this.education.field_of_study = educationData.field_of_study;
    this.education.year_of_graduation = educationData.year_of_graduation;    
  }

  shareExperienceData(experienceData: any) {
    this.experience.company_name = experienceData.company_name;
    this.experience.job_title = experienceData.job_title;
    this.experience.comapany_location = experienceData.comapany_location;
    this.experience.years_of_experience = experienceData.years_of_experience;    
  }

  shareSkillsData(skillsData: any) {
    this.skills = skillsData;   
  }

  shareSummaryData(summaryData: any) {
    this.summary = summaryData;
    this.createJson();
  }

  createJson() {
    this.resumeValue.first_name = this.personalDetails.first_name;
    this.resumeValue.last_name = this.personalDetails.last_name;
    this.resumeValue.date_of_birth = this.personalDetails.date_of_birth;
    this.resumeValue.gender = this.personalDetails.gender;
    this.resumeValue.contact_number = this.personalDetails.contact_number;
    this.resumeValue.email = this.personalDetails.email;
    this.resumeValue.location = this.personalDetails.location;
    this.resumeValue.pin_code = this.personalDetails.pin_code;
    this.resumeValue.institute_name = this.education.institute_name;
    this.resumeValue.institute_location = this.education.institute_location;
    this.resumeValue.qualification = this.education.qualification;
    this.resumeValue.field_of_study = this.education.field_of_study;
    this.resumeValue.year_of_graduation = this.education.year_of_graduation;
    this.resumeValue.company_name = this.experience.company_name;
    this.resumeValue.job_title = this.experience.job_title;
    this.resumeValue.comapany_location = this.experience.comapany_location;
    this.resumeValue.years_of_experience = this.experience.years_of_experience;
    this.resumeValue.skills = this.skills;
    this.resumeValue.summary = this.summary;
  }

  pdfData() {        
    return this.http.post(this.url + '/download', this.resumeValue);
  }

  getResumeData(): Observable<resume> {
    return this.http.get<resume>(this.url);
  }
}