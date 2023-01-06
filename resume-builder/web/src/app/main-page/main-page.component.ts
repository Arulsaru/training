import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from 'src/service/api.service';
import ts from 'src/type/types';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {

  ngOnInit(): void {
  }

  // error state kaaga 
  
  @ViewChild("techSkillList") techSkillList: any;
  @ViewChild("nonTechSkillList") nonTechSkillList: any;
  @ViewChild("hobbyList") hobbyList: any;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  hasExperience: boolean = true;
  hasProjects: boolean = true;
  technicalSkillsArray: string[] = [];
  nonTechnicalSkillsArray: string[] = [];
  hobbies: string[] = [];
  isImageUploaded: boolean = false;
  isTechSkillEmpty: boolean = false;
  languages: string[] = ['Tamil', 'English', 'Hindi', 'Telungu', 'Malayalam'];
  imageUrl: string | null | ArrayBuffer = '';
  xAxisDownLeft: number = 0;
  yAxisDownLeft: number = 0;
  xAxisDownRight: number = 0;
  yAxisDownRight: number = 0;
  isExperienceLimitReached: boolean = false;

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService) {}

  userDetails: ts = {
    first_name: '',
    last_name: '',
    phone_number: null,
    email: '',
    birthday: '',
    field_of_study: '',
    gender: '',
    languages_known: null,
    state: '',
    city: '',
    pin_code: null,
    college_name: '',
    college_location: '',
    college_start_period: null,
    college_end_period: null,
    college_cgpa: null,
    school_name: '',
    school_location: '',
    hsc_percentage: null,
    sslc_percentage: null,
    companies: [
      {
        company_name: '',
        company_location: '',
        company_start_year: null,
        company_end_year: null
      }
    ],
    projects: [
      {
        project_name: '',
        project_domain: '',
        project_description: ''
      }
    ],
    technical_skills: null,
    non_technical_skills: null,
    hobbies: null,
    user_profiles: null,
    github_url: '',
    linikedIn_url: '',
    description: '',
    profile_picture: null
  }

  personalDetails = this._formBuilder.group({
    firstName: ['Arulmozhi', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    lastName: ['Karunagaran', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
    phoneNumber: [6374553281, (Validators.required, Validators.min(10000000000), Validators.max(999999999999), Validators.pattern(/[0-9]/))],
    birthday: ['15/04/2002', Validators.required],
    gender: '1',
    email: ['saruarul154@gmail.com', [Validators.required, Validators.email]],
    state: ['Tamil Nadu', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    city: ['Dharmapuri', Validators.required],
    pinCode: [636701, (Validators.required, Validators.pattern(/[0-9]{6}/))],
    languagesKnown: [null, Validators.required]
  })

  academicDetails = this._formBuilder.group({
    collegeName: ['Bannari Amman Institute Of Technology', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    collegeStudy: ['B.E ECE', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
    collegeLocation: ['Sathyamangalam', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    collegeStartYear: [2019, [Validators.required, Validators.pattern(/[0-9]{4}/)]],
    collegeEndYear: [2023, [Validators.required, Validators.pattern(/[0-9]{4}/)]],
    collegeCGPA: [90, Validators.required],
    schoolName: ['Kamalam International School', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    schoolLocation: ['Dharmapuri', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    sslcPercentage: [90, [Validators.required]],
    hscPercentage: [90, [Validators.required]]
  })

  experienceDetails = this._formBuilder.group({
    experiences: this._formBuilder.array([])
  })

  skillDetails = this._formBuilder.group({
    technicalSkill: [null, Validators.required],
    nonTechnicalSkill: [null, Validators.required]
  })

  projectDetails = this._formBuilder.group({
    projects: this._formBuilder.array([])
  })

  additionalDetails = this._formBuilder.group({
    description: [`I am an enthusiastic, self-motivated, reliable, responsible and hard working person. I am a mature team worker and adaptable to all challenging situations. I am able to work well both in a team environment as well as using own initiative. I am able to work well under pressure and adhere to strict deadlines.`, Validators.required],
    hobbies: [null, Validators.required],
    githubURL: ['https://github.com/Arulmozhi-Karunagaran/TrusTrace-Training', Validators.required],
    linkedInURL: ['https://www.linkedin.com/in/preethiuthayakumar/', Validators.required],
    profilePicture: [null, Validators.required]
  })

  get personalDetailsControl() {
    return this.personalDetails.controls;
  }

  get academicDetailsControl() {
    return this.academicDetails.controls;
  }

  get experienceDetailsControl() {
    return this.experienceDetails.controls;
  }

  get skillDetailsControl() {
    return this.skillDetails.controls;
  }

  get additionalDetailsControl() {
    return this.additionalDetails.controls;
  }

  get experiences() {
    return this.experienceDetails.controls['experiences'] as FormArray;
  }

  get projects() {
    return this.projectDetails.controls['projects'] as FormArray;
  }

  addExperience(): void {
    const experienceForm = this._formBuilder.group({
      companyName: ['TrusTrace', Validators.required],
      companyLocation: ['Coimbatore', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
    })

    if(this.experiences.length !== 3) {
      this.hasExperience = false;
      this.experiences.push(experienceForm); // experiences array kulla push pandree... each and every user gets new experience form   
    }
    else {
      this.isExperienceLimitReached = true;
    }
    
  }

  deleteExperience(experienceIdx: number): void {
    this.experiences.removeAt(experienceIdx);
    if(this.experiences.length === 0) {
      this.hasExperience = true;
    }
  }

  addProjects(): void {
    const projectForm = this._formBuilder.group({
      projectName: ['TrusTrace', Validators.required],
      projectDomain: ['Coimbatore', Validators.required],
      projectDescription: ['Begin each item by stating the name of the place, location, dates, and job title (e.g. manager, volunteer) List experiences in reverse chronological order (most current experience first).', Validators.required],
    })
    
    if(this.projects.length !== 2) {
      this.hasProjects = false;
      this.projects.push(projectForm);
    }

  }

  deleteProjects(experienceIdx: number): void {
    this.projects.removeAt(experienceIdx);
    if(this.projects.length === 0) {
      this.hasProjects = true;
    }
  }

  addTechSkills(event: MatChipInputEvent): boolean {

    if (this.technicalSkillsArray.length === 6) {
      return false;
    }

    const value = (event.value || '').trim();
    const hasDuplicate = this.technicalSkillsArray.findIndex(
      skill => value.toLowerCase() === skill.toLowerCase()
    );

    if (hasDuplicate !== -1) {
      this.techSkillList.errorState = true;
      return false;
    }

    if (value) {
      this.technicalSkillsArray.push(value);
      this.techSkillList.errorState = false;
    }

    event.chipInput!.clear();
    return true;
  }

  removeTechSkill(skill: string): void {
    const idx = this.technicalSkillsArray.indexOf(skill);

    if (idx >= 0) {
      this.technicalSkillsArray.splice(idx, 1);
      return;
    }

  }

  addNonTechSkills(event: MatChipInputEvent): boolean {

    if (this.nonTechnicalSkillsArray.length === 6) {
      return false;
    }

    const value = (event.value || '').trim();
    const hasDuplicate = this.nonTechnicalSkillsArray.findIndex(
      skill => value.toLowerCase() === skill.toLowerCase()
    );

    if (hasDuplicate !== -1) { 
      this.nonTechSkillList.errorState = true;
      return false;
    }

    if (value) {
      this.nonTechnicalSkillsArray.push(value);
      this.nonTechSkillList.errorState = false;
    }

    event.chipInput!.clear();
    return true;
  }

  removeNonTechSkill(skill: string): void {
    const idx = this.nonTechnicalSkillsArray.indexOf(skill);

    if (idx >= 0) {
      this.nonTechnicalSkillsArray.splice(idx, 1);
    }

  }

  addHobbies(event: MatChipInputEvent): boolean {

    if (this.hobbies.length === 6) {
      return false;
    }

    const value = (event.value || '').trim();
    const hasDuplicate = this.hobbies.findIndex(
      hobby => value.toLowerCase() === hobby.toLowerCase()
    );

    if (hasDuplicate !== -1) {
      this.hobbyList.errorState = true;
      return false;
    }

    if (value) {
      this.hobbies.push(value);
      this.hobbyList.errorState = false;
    }

    event.chipInput!.clear();
    return true;
  }

  removeHobbies(hobby: string): void {
    const idx = this.hobbies.indexOf(hobby);

    if (idx >= 0) {
      this.hobbies.splice(idx, 1);
    }

  }

  setDetails(): void {
    this.userDetails.first_name = this.personalDetails.value.firstName;
    this.userDetails.last_name = this.personalDetails.value.lastName;
    this.userDetails.phone_number = this.personalDetails.value.phoneNumber;
    this.userDetails.email = this.personalDetails.value.email;
    // this.userDetails.birthday = this.personalDetails.value.birthday;

    // const temp = this.personalDetails.value.birthday;
    // const bday: Date = new Date(this.personalDetails.value.birthday);

    this.personalDetails.value.gender === '1' ? this.userDetails.gender = 'Male' : this.userDetails.gender = 'Female'; // value fetch panni edukanu 
    this.userDetails.languages_known = this.personalDetails.value.languagesKnown;
    this.userDetails.state = this.personalDetails.value.state;
    this.userDetails.city = this.personalDetails.value.city;
    this.userDetails.pin_code = this.personalDetails.value.pinCode;
    this.userDetails.college_name = this.academicDetails.value.collegeName;
    this.userDetails.college_location = this.academicDetails.value.collegeLocation;
    this.userDetails.field_of_study = this.academicDetails.value.collegeStudy;
    this.userDetails.college_start_period = 2019;
    this.userDetails.college_end_period = 2023;
    this.userDetails.college_cgpa = this.academicDetails.value.collegeCGPA;
    this.userDetails.school_name = this.academicDetails.value.schoolName;
    this.userDetails.school_location = this.academicDetails.value.schoolLocation;
    this.userDetails.sslc_percentage = this.academicDetails.value.sslcPercentage
    this.userDetails.hsc_percentage = this.academicDetails.value.hscPercentage;
    this.userDetails.companies = this.experiences.value;
    this.userDetails.projects = this.projects.value;
    this.userDetails.technical_skills = this.technicalSkillsArray; // array
    this.userDetails.non_technical_skills = this.nonTechnicalSkillsArray;
    this.userDetails.hobbies = this.hobbies;
    this.userDetails.github_url = this.additionalDetails.value.githubURL;
    this.userDetails.linikedIn_url = this.additionalDetails.value.linkedInURL;
    this.userDetails.description = this.additionalDetails.value.description;
  }

  showAlert(): void {
    this.setDetails();

    this.apiService.createUser(this.userDetails).subscribe( res => {
      this.userDetails = res.data;
    });

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Congrats..',
      text: "Yeew have completed the entire process, Click below to download the pdf", // msg node js la irundhu edukanu
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Download the PDF',
      cancelButtonText: 'Go Back',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.generatePDF();
        swalWithBootstrapButtons.fire(
          'Success!',
          'Your pdf file has been downloaded, Check your downloads', // msg node js la irundhu edukanu
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Are yeew sure',
          'This wont delete any of your details',
          'error'
        )
      }

    })
  }

  generatePDF(): void {

    let splittedText: string;
    let yAxisTop: number = 0;
    let xAxisTop: number = 0;
    const doc = new jsPDF();
    doc.setFillColor(24, 24, 24);
    doc.rect(0, 0, 320, 75, 'F');
    doc.setFillColor(234, 234, 234);
    doc.rect(0, 75, 300, 240, 'F');
    doc.setFont('Times', 'bold').setFontSize(15);
    doc.setTextColor(255, 255, 255).text(`${this.userDetails.first_name?.toUpperCase()} ${this.userDetails.last_name?.toUpperCase()}`, xAxisTop += 55, yAxisTop += 15);
    doc.setFontSize(13).setFont('times', 'bold').text('Front End Developer', xAxisTop, yAxisTop += 10);

    if (this.userDetails.description) {
      splittedText = doc.splitTextToSize(this.userDetails.description, 170);
      doc.setFontSize(12).setLineHeightFactor(1.5).setFont('times', 'normal').text(splittedText, xAxisTop, yAxisTop += 10);
    }

    doc.setLineWidth(2).setDrawColor(24, 24, 24);
    doc.line(0, 75, 300, 75);
    doc.line(0, 296.5, 300, 296.5);
    doc.line(0.6, 75, 0.6, 296.5);
    doc.line(209.5, 75, 209.5, 296.5);
    doc.setLineWidth(1);
    doc.line(125, 75, 125, 296.5);  // center vertical line

    xAxisTop = 5;
    doc.setFont('times', 'normal').text(`+91 ${this.userDetails.phone_number} `, xAxisTop, yAxisTop += 30);
    this.userDetails.email ? doc.text(this.userDetails.email, xAxisTop += 40, yAxisTop) : null;
    this.userDetails.state ? doc.text(this.userDetails.state, xAxisTop += 70, yAxisTop -= 3) : null
    this.userDetails.city ? doc.text(this.userDetails.city, xAxisTop, yAxisTop += 5) : null;

    if (this.userDetails.linikedIn_url) {
      splittedText = doc.splitTextToSize(this.userDetails.linikedIn_url, 50);
      doc.text(splittedText, xAxisTop += 40, yAxisTop -= 5);
    }

    doc.setFontSize(13).setFont('Times', 'bold');
    doc.setTextColor(24, 24, 24).text('ACADEMIC DETAILS', this.xAxisDownLeft += 5, this.yAxisDownLeft += 85);
    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.text(`${'\u2022'}   ${this.userDetails.college_name} (${this.userDetails.college_start_period} - ${this.userDetails.college_end_period} batch)`, this.xAxisDownLeft += 5, this.yAxisDownLeft += 10);
    doc.text(`${this.userDetails.field_of_study} - ${this.userDetails.college_cgpa} - CGPA`, this.xAxisDownLeft += 5, this.yAxisDownLeft += 8);

    if(this.userDetails.college_location) {
      doc.text(this.userDetails.college_location, this.xAxisDownLeft, this.yAxisDownLeft += 8);
    }

    doc.text(`${'\u2022'}   ${this.userDetails.school_name}, ${this.userDetails.school_location}`, this.xAxisDownLeft -= 5, this.yAxisDownLeft += 10);
    doc.text(`HSC Percentage - ${this.userDetails.hsc_percentage}`, this.xAxisDownLeft += 5, this.yAxisDownLeft += 8);
    doc.text(`SSLC Percentage - ${this.userDetails.sslc_percentage}`, this.xAxisDownLeft, this.yAxisDownLeft += 8);

    this.addExperienceInsidePDF(doc);
    this.addTechnicalSkillsInsidePDF(doc);
    this.addNonTechnicalSkillsInsidePDF(doc);
    this.addHobbiesInsidePDF(doc);
    this.addProjectsInsidePDF(doc);

    if (this.imageUrl && typeof this.imageUrl === 'string') {
      doc.addImage(this.imageUrl, 'JPEG', 7, 10, 40, 45, 'profile-picture');
    }

    doc.save(`${this.userDetails.first_name} ${this.userDetails.last_name}.pdf`);
  }

  addExperienceInsidePDF(doc: jsPDF) {
    let idx: number = 0;
    doc.setFontSize(13).setFont('Times', 'bold');
    doc.text('EXPERIENCE', this.xAxisDownRight += 130, this.yAxisDownRight += 85);

    while (idx < this.experiences.length) {
      doc.setFontSize(12);
      doc.setFont('times', 'normal');
      doc.text(`${'\u2022'}   ${this.experiences.value[idx].companyName} - (Jan 2020 - May 2023)`, this.xAxisDownRight += 5, this.yAxisDownRight += 10);
      doc.text(`Front End Developer`, this.xAxisDownRight += 5, this.yAxisDownRight += 10);
      doc.text(`${this.experiences.value[idx].companyLocation}`, this.xAxisDownRight, this.yAxisDownRight += 10);

      this.xAxisDownRight -= 10;
      idx += 1;
    }

    this.xAxisDownRight += 10; // last time ah ignore pandrathuku
  }

  addTechnicalSkillsInsidePDF(doc: jsPDF): void {

    if (this.userDetails.technical_skills && this.userDetails.technical_skills.length !== 0) {
      doc.setFont('times', 'normal');
      let idx = 0;
      const maxLength = 3;
      doc.setFontSize(13).setFont('Times', 'bold');
      doc.text('TECHNICAL SKILLS', this.xAxisDownRight -= 10, this.yAxisDownRight += 15);
      this.yAxisDownRight += 10;
      this.xAxisDownRight += 5;
      doc.setFontSize(13).setFont('Times', 'normal');

      while (idx < this.technicalSkillsArray.length) {

        if (idx === maxLength) {
          this.xAxisDownRight += 30;
          this.yAxisDownRight -= 30;
        }

        doc.text('\u2022   ' + this.userDetails.technical_skills[idx], this.xAxisDownRight, this.yAxisDownRight);
        this.yAxisDownRight += 10;
        idx += 1; 
      }

    }

  }

  addNonTechnicalSkillsInsidePDF(doc: jsPDF): void {

    if (this.userDetails.non_technical_skills && this.userDetails.non_technical_skills.length !== 0) {
      doc.setFont('times', 'normal');
      let idx: number = 0;
      const maxLength: number = 3;
      this.xAxisDownRight = 140;
      doc.setFontSize(13).setFont('Times', 'bold');
      doc.text('NON TECHNICAL SKILLS', this.xAxisDownRight -= 10, this.yAxisDownRight += 10);
      this.yAxisDownRight += 10;
      this.xAxisDownRight += 5;
      doc.setFontSize(13).setFont('Times', 'normal');

      while (idx < this.nonTechnicalSkillsArray.length) {

        if (idx === maxLength) {
          this.xAxisDownRight += 30;
          this.yAxisDownRight -= 30;
        }

        doc.text('\u2022   ' + this.userDetails.non_technical_skills[idx], this.xAxisDownRight, this.yAxisDownRight);
        idx += 1;
        this.yAxisDownRight += 10;
      }

    }

  }

  addHobbiesInsidePDF(doc: jsPDF): void {

    if (this.userDetails.hobbies && this.userDetails.hobbies.length !== 0) {
      doc.setFont('times', 'normal');
      let idx: number = 0;
      const maxLength: number = 3;
      this.xAxisDownRight = 140;
      doc.setFontSize(13).setFont('Times', 'bold');
      doc.text('HOBBIES', this.xAxisDownRight -= 10, this.yAxisDownRight += 10);
      this.yAxisDownRight += 10;
      this.xAxisDownRight += 5;
      doc.setFontSize(13).setFont('Times', 'normal');

      while (idx < this.hobbies.length) {

        if (idx === maxLength) {
          this.xAxisDownRight += 30;
          this.yAxisDownRight -= 30;
        }

        doc.text('\u2022   ' + this.userDetails.hobbies[idx], this.xAxisDownRight, this.yAxisDownRight);
        idx += 1;
        this.yAxisDownRight += 10;
      }

    }

  }


  addProjectsInsidePDF(doc: jsPDF): void {
    let idx: number = 0;
    let splittedText: string;
    doc.setFontSize(13).setFont('Times', 'bold');
    doc.setTextColor(24, 24, 24).text('PROJECTS', this.xAxisDownLeft -= 10, this.yAxisDownLeft += 15);

    while (idx < this.projects.length) {
      doc.setFontSize(12);
      doc.setFont('times', 'bold').text(`${'\u2022'}   ${this.projects.value[0].projectName} - (Jan 2020 - May 2023)`, this.xAxisDownLeft += 5, this.yAxisDownLeft += 10);
      doc.setFont('times', 'normal').text(`${this.projects.value[0].projectDomain}`, this.xAxisDownLeft += 5, this.yAxisDownLeft += 8);
      doc.setFont('times', 'normal');
      splittedText = doc.splitTextToSize(this.projects.value[0].projectDescription, 100);
      doc.setFontSize(12).setLineHeightFactor(1.5).setFont('times', 'normal').text(splittedText, this.xAxisDownLeft, this.yAxisDownLeft += 8);
      this.xAxisDownLeft -= 10;
      this.yAxisDownLeft += splittedText.length * 5;
      idx += 1;
    }

  }

  profilePicture(event: any): void {
    console.log(typeof event);

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onloadend = (event) => { // called once readAsDataURL is completed

        if (event.target) {
          this.imageUrl = event.target.result;
          this.isImageUploaded = true;
        }

      }
    }

  }

  removeImage(): void {
    this.isImageUploaded = false;
  }

}
