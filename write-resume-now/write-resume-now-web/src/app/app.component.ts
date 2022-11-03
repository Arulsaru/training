import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import jsPDF from 'jspdf';
import {ResumeApiService} from './service/resume-api.service';
import details from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  @ViewChild('skillsList') skillsList: any;
  @ViewChild('hobbiesList') hobbiesList: any;
  title: string = 'write-resume-now';
  step: number = 0;
  skillsArray: string[] = ['Java', 'C++', 'Python', 'Javascript'];
  LanguagesKnownList: string[] = ['Tamil', 'English', 'Arabic', 'Chinese', 'French', 'Russian', 'Spanish'];
  hobbies: string[] = [];

  detail: details = {
    first_name: '',
    last_name: '',
    phone_number: '',
    date_of_birth: '',
    email: '',
    state: '',
    city: '',
    pin_code: '',
    qualification: '',
    college_name: '',
    year_of_passed: '',
    field_of_study: '',
    cgpa: '',
    hsc_percentage: '',
    hsc_year_of_passed: '',
    sslc_percentage: '',
    sslc_year_of_passed: '',
    school_name: '',
    company_name: '',
    position: '',
    experience_start_date: '',
    experience_end_date: '',
    job_experience: '',
    skills: [],
    summary: '',
    languages: null,
    git_hub: '',
    linked_in: '',
    hobbies: [],
  };

  mainContentY: number = 10;
  sideNavY: number = 50;

  image = '/9j/4AAQSkZJRgABAQEBLAEsAAD/4QDTRXhpZgAASUkqAAgAAAABAA4BAgCxAAAAGgAAAAAAAABOZXV0cmFsIGFic3RyYWN0IGJhY2tncm91bmQuIE1pbmltYWwgcG9zdGVyIHRlbXBsYXRlIHdpdGggZGlhZ29uYWwgc2hhcGVzLiBDYWxtIGRlc2lnbiB3aXRoIGdyYWRpZW50IGVsZW1lbnRzLiBXaGl0ZSB3ZWJzaXRlIHdhbGxwYXBlci4gTW9kZXJuIHNvZnQgdGV4dHVyZS4gVmVjdG9yIGlsbHVzdHJhdGlvbi7/4QXVaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj4KCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CgkJPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpJcHRjNHhtcENvcmU9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iICAgeG1sbnM6R2V0dHlJbWFnZXNHSUZUPSJodHRwOi8veG1wLmdldHR5aW1hZ2VzLmNvbS9naWZ0LzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIHBob3Rvc2hvcDpDcmVkaXQ9IkdldHR5IEltYWdlcy9pU3RvY2twaG90byIgR2V0dHlJbWFnZXNHSUZUOkFzc2V0SUQ9IjEzNzA4NTgwNjciIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9sZWdhbC9saWNlbnNlLWFncmVlbWVudD91dG1fbWVkaXVtPW9yZ2FuaWMmYW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybCIgPgo8ZGM6Y3JlYXRvcj48cmRmOlNlcT48cmRmOmxpPkVnb3IgU3V2b3JvdjwvcmRmOmxpPjwvcmRmOlNlcT48L2RjOmNyZWF0b3I+PGRjOmRlc2NyaXB0aW9uPjxyZGY6QWx0PjxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+TmV1dHJhbCBhYnN0cmFjdCBiYWNrZ3JvdW5kLiBNaW5pbWFsIHBvc3RlciB0ZW1wbGF0ZSB3aXRoIGRpYWdvbmFsIHNoYXBlcy4gQ2FsbSBkZXNpZ24gd2l0aCBncmFkaWVudCBlbGVtZW50cy4gV2hpdGUgd2Vic2l0ZSB3YWxscGFwZXIuIE1vZGVybiBzb2Z0IHRleHR1cmUuIFZlY3RvciBpbGx1c3RyYXRpb24uPC9yZGY6bGk+PC9yZGY6QWx0PjwvZGM6ZGVzY3JpcHRpb24+CjxwbHVzOkxpY2Vuc29yPjxyZGY6U2VxPjxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPjxwbHVzOkxpY2Vuc29yVVJMPmh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9waG90by9saWNlbnNlLWdtMTM3MDg1ODA2Ny0/dXRtX21lZGl1bT1vcmdhbmljJmFtcDt1dG1fc291cmNlPWdvb2dsZSZhbXA7dXRtX2NhbXBhaWduPWlwdGN1cmw8L3BsdXM6TGljZW5zb3JVUkw+PC9yZGY6bGk+PC9yZGY6U2VxPjwvcGx1czpMaWNlbnNvcj4KCQk8L3JkZjpEZXNjcmlwdGlvbj4KCTwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InciPz4K/+0BAFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAADkHAJQAAxFZ29yIFN1dm9yb3YcAngAsU5ldXRyYWwgYWJzdHJhY3QgYmFj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'

  personalDetailsForm = new FormGroup({
    first_name: new FormControl('Keerthick', Validators.required),
    last_name: new FormControl('Subramaniyam', Validators.required),
    phone_number: new FormControl('9150500151', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    date_of_birth: new FormControl('22/12/2002', Validators.required),
    email: new FormControl('keerthick@gmail.com', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    state: new FormControl('TamilNadu', Validators.required),
    city: new FormControl('Tirupur', Validators.required),
    pin_code: new FormControl('641602', Validators.required),
  })

  education = this.formBulider.group({
    qualification: new FormControl('Bachelor of Engineering', Validators.required),
    college_name: new FormControl('Sri Shakthi College', Validators.required),
    year_of_passed: new FormControl('2022', Validators.required),
    field_of_study: new FormControl('Computer Science and Engineering', Validators.required),
    cgpa: new FormControl('8', Validators.required),
    hsc_percentage: new FormControl('80', Validators.required),
    hsc_year_of_passed: new FormControl('2017', Validators.required),
    sslc_percentage: new FormControl('95', Validators.required),
    sslc_year_of_passed: new FormControl('2015', Validators.required),
    school_name: new FormControl('Kongu Matric School', Validators.required),
  })

  experience = this.formBulider.group({
    company_name: new FormControl('Amazon', Validators.required),
    position: new FormControl('Software Engineer', Validators.required),
    experience_start_date: new FormControl('10/10/2010', Validators.required),
    experience_end_date: new FormControl('11/11/2022', Validators.required),
    job_experience: new FormControl('We are looking for a skilled software engineer who, along with our excellent software development team, will be responsible for working on projects that are currently being developed on by our company. Duties will include but are not limited to developing and directing software system validation and testing methods, as well as directing our software programming initiatives. You will also be working closely with clients and cross-functional departments to communicate project statuses and proposals.', Validators.required)
  })

  summary = this.formBulider.group({
    text_area: new FormControl('Diligent software engineer with 5+ years of experience in commercial application and software development. Eager to join Cyclone Inc. to build innovative and cutting-edge business solutions for the impressive suite of clients within its global reach. In previous roles, slashed downtime by 25% and ensured 98% on-time project completion. Also identified and dealt with a significant process bottleneck that boosted coding efficiency by 35% when resolved.', Validators.required),
  })

  skills = this.formBulider.group({
    skill: new FormControl('', [Validators.required])
  })

  additionalDetails = this.formBulider.group({
    languagesKnown: new FormControl(null),
    hobbie: new FormControl('', [Validators.required]),
    linked_in: new FormControl('https://in.linkedin.com/in/keerthi-a74b5534?trk=people-guest_people_search-card'),
    git_hub: new FormControl('https://github.com/KeerthickS'),
  })

  constructor(private formBulider: FormBuilder, private resumeApiService: ResumeApiService) {
  }

  addSkillInput(event: MatChipInputEvent) {

    if (event.value && !this.skillsArray.includes(event.value)) {
      this.skillsArray.push(event.value);
      this.skillsList.errorState = false;
    } else {
      this.skillsList.errorState = true;
    }
    event.chipInput!.clear();
  }

  addHobbieInput(event: MatChipInputEvent) {

    if (event.value && !this.hobbies.includes(event.value)) {
      this.hobbies.push(event.value);
      this.hobbiesList.errorState = false;
    } else {
      this.hobbiesList.errorState = true;
    }
    event.chipInput!.clear();
  }

  removeSkill(skill: string) {
    const index: number = this.skillsArray.indexOf(skill);

    if (index >= 0) {
      this.skillsArray.splice(index, 1);
    }
  }

  removeHobbie(hobbie: string) {
    const index: number = this.hobbies.indexOf(hobbie);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  formAllInputs() {
    this.detail.first_name = this.personalDetailsForm.value.first_name;
    this.detail.last_name = this.personalDetailsForm.value.last_name;
    this.detail.phone_number = this.personalDetailsForm.value.phone_number;
    this.detail.date_of_birth = this.personalDetailsForm.value.date_of_birth;
    this.detail.email = this.personalDetailsForm.value.email;
    this.detail.state = this.personalDetailsForm.value.state;
    this.detail.city = this.personalDetailsForm.value.city;
    this.detail.pin_code = this.personalDetailsForm.value.pin_code;
    this.detail.qualification = this.education.value.qualification;
    this.detail.college_name = this.education.value.college_name;
    this.detail.year_of_passed = this.education.value.year_of_passed;
    this.detail.field_of_study = this.education.value.field_of_study;
    this.detail.cgpa = this.education.value.cgpa;
    this.detail.hsc_percentage = this.education.value.hsc_percentage;
    this.detail.hsc_year_of_passed = this.education.value.hsc_year_of_passed;
    this.detail.sslc_percentage = this.education.value.sslc_percentage;
    this.detail.sslc_year_of_passed = this.education.value.sslc_year_of_passed;
    this.detail.school_name = this.education.value.school_name;
    this.detail.company_name = this.experience.value.company_name;
    this.detail.position = this.experience.value.position;
    this.detail.experience_start_date = this.experience.value.experience_start_date;
    this.detail.experience_end_date = this.experience.value.experience_end_date;
    this.detail.job_experience = this.experience.value.job_experience;
    this.detail.skills = this.skillsArray;
    this.detail.summary = this.summary.value.text_area;
    this.detail.languages = this.additionalDetails.value.languagesKnown;
    this.detail.git_hub = this.additionalDetails.value.git_hub;
    this.detail.linked_in = this.additionalDetails.value.linked_in;
    this.detail.hobbies = this.hobbies;

    this.resumeApiService.createUser(this.detail).subscribe(response => {
      this.detail = response.data;
    });

    // this.resumeApiService.getUserDetails().subscribe(response => {
    //   this.detail = response;
    // });
  }

  generatePDF() {
    let summary = '';
    const doc = new jsPDF();
    doc.setFillColor(8, 124, 99);
    doc.rect(0, 0, 70, 300, 'F');
    doc.addImage(this.image, 'JPEG', 20, 4, 35, 40, 'profile-photo');

    doc.setTextColor(237, 237, 237).setFont('Helvetica', 'bold').setFontSize(13);
    doc.text('Contact', 13, this.sideNavY += 10);
    doc.setDrawColor(237, 237, 237);
    doc.line(12, this.sideNavY + 1.5, 65, this.sideNavY + 1.5);

    if (this.detail.email && this.detail.phone_number && this.detail.linked_in && this.detail.git_hub
      && this.detail.city && this.detail.state) {
      doc.setFontSize(13);
      doc.setFont('Helvetica', 'bold');
      doc.text('Email', 13, this.sideNavY += 10);
      doc.setFontSize(11);
      doc.text(this.detail.email, 13, this.sideNavY += 5);
      doc.setFontSize(13);
      doc.setFont('Helvetica', 'bold');
      doc.text('Phone', 13, this.sideNavY += 10);
      doc.setFontSize(11);
      doc.text(this.detail.phone_number, 13, this.sideNavY += 5);
      doc.setFontSize(13);
      doc.setFont('Helvetica', 'bold');
      doc.text('Git Hub', 13, this.sideNavY += 10);
      doc.setFontSize(11);
      summary = doc.splitTextToSize(this.detail.git_hub, 55);
      doc.text(summary, 13, this.sideNavY += 5);
      doc.setFontSize(13);
      doc.setFont('Helvetica', 'bold');
      doc.text('Address', 13, this.sideNavY += 10);
      doc.setFontSize(11);
      doc.text(this.detail.city + ' ' + this.detail.state, 13, this.sideNavY += 5);
    }

    doc.setFontSize(13)
    doc.setTextColor(237, 237, 237);
    doc.setFont('Helvetica', 'bold');
    doc.text('Education', 13, this.sideNavY += 20);
    doc.setDrawColor(237, 237, 237);
    doc.line(12, this.sideNavY + 1.5, 65, this.sideNavY + 1.5);

    if (this.detail.hsc_year_of_passed && this.detail.sslc_year_of_passed && this.detail.college_name
      && this.detail.school_name && this.detail.qualification && this.detail.year_of_passed) {
      doc.setFontSize(11)
      doc.text(this.detail.year_of_passed, 13, this.sideNavY += 10);
      doc.setFontSize(13)
      doc.text(this.detail.college_name, 13, this.sideNavY += 5);
      doc.setFontSize(11)
      doc.text(this.detail.qualification, 13, this.sideNavY += 5);

      doc.text(this.detail.hsc_year_of_passed, 13, this.sideNavY += 10);
      doc.setFontSize(13)
      doc.text(this.detail.school_name, 13, this.sideNavY += 5);
      doc.setFontSize(11)
      doc.text('Higher Secondary School', 13, this.sideNavY += 5);

      doc.text(this.detail.sslc_year_of_passed, 13, this.sideNavY += 10);
      doc.setFontSize(13)
      doc.text(this.detail.school_name, 13, this.sideNavY += 5);
      doc.setFontSize(11)
      doc.text('Secondary School', 13, this.sideNavY += 5);
    }

    doc.setFontSize(13)
    doc.setTextColor(237, 237, 237);
    doc.setFont('Helvetica', 'bold');
    doc.text('Skills', 13, this.sideNavY += 20);
    doc.setDrawColor(237, 237, 237);
    doc.line(12, this.sideNavY + 1.5, 65, this.sideNavY + 1.5);

    if (this.detail.skills) {
      doc.setFontSize(11);
      doc.text('', 13, this.sideNavY += 5)
      for (let i = 0; i < this.detail.skills.length; i++) {
        doc.text('\u2022 ' + this.detail.skills[i], 13, this.sideNavY += 5);
      }
    }

    doc.setFontSize(13)
    doc.setTextColor(237, 237, 237);
    doc.setFont('Helvetica', 'bold');
    doc.text('Languages', 13, this.sideNavY += 20);
    doc.setDrawColor(237, 237, 237);
    doc.line(12, this.sideNavY + 1.5, 65, this.sideNavY + 1.5);

    if (this.detail.languages) {
      doc.setFontSize(11);
      doc.text('', 13, this.sideNavY += 5)
      for (let i = 0; i < this.detail.languages.length; i++) {
        doc.text(this.detail.languages[i], 13, this.sideNavY += 5);
      }
    }

    doc.setFillColor(207, 207, 188);
    doc.rect(71, 0, 138, 36, 'F');

    if (this.detail.first_name && this.detail.last_name) {
      doc.setFont('Helvetica-Bold', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(20, 79, 66);
      doc.text(this.detail.first_name + ' ' + this.detail.last_name, 80, this.mainContentY);
    }

    if (this.detail.position && this.detail.qualification && this.detail.field_of_study) {
      doc.setFont('Helvetica-Bold', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(20, 79, 66);
      doc.text('- ' + this.detail.position, 85, this.mainContentY += 10);
      doc.text('- ' + this.detail.field_of_study, 85, this.mainContentY += 10);
    }

    doc.setFontSize(15).setTextColor(52, 92, 78).setFont('Courier-Bold');
    doc.text('Profile Summary', 80, this.mainContentY += 20);

    if (this.detail.summary) {
      doc.setTextColor(38, 41, 40).setFont('Time-Italic', 'normal').setFontSize(11);
      summary = doc.splitTextToSize(this.detail.summary, 120);
      doc.text(summary, 85, this.mainContentY += 10);
    }

    doc.setFontSize(15).setTextColor(52, 92, 78).setFont('Courier-Bold', 'bold');
    doc.text('Experience', 80, this.mainContentY += 40);

    if (this.detail.experience_start_date && this.detail.experience_end_date && this.detail.job_experience
      && this.detail.position && this.detail.company_name) {
      doc.setFontSize(10).setFont('Helvetica', 'normal').setTextColor(89, 135, 119);
      doc.text(this.detail.experience_start_date + ' - ' + this.detail.experience_end_date, 85, this.mainContentY += 10);
      doc.text(this.detail.company_name, 85, this.mainContentY += 5);
      doc.setFont('Helvetica', 'bold');
      doc.text(this.detail.position, 85, this.mainContentY += 5);

      doc.setTextColor(38, 41, 40).setFont('Time-Italic', 'normal').setFontSize(11);
      summary = doc.splitTextToSize(this.detail.job_experience, 120);
      doc.text(summary, 85, this.mainContentY += 7);

    }

    doc.save(`resume`);
  }
}
