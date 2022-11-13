import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { ApiService } from 'src/service/api.service';
import ts from 'src/type/types';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import * as $ from "jquery";// import { identifierName, r3JitTypeSourceSpan } from '@angular/compiler';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment/moment.js';
import { Moment } from 'moment/moment.js';
import { IfStmt, ThisReceiver } from '@angular/compiler';

// import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    }
  ]
})

export class AppComponent {
  title = 'resume-builder';

  @ViewChild("techSkillList") techSkillList: any;
  @ViewChild("nonTechSkillList") nonTechSkillList: any;
  @ViewChild("hobbyList") hobbyList: any;

  ngOnInit(): void {
  }

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
    return this.experienceDetails.controls["experiences"] as FormArray;
  }

  userDetails: ts = {
    first_name: '',
    last_name: '',
    phone_number: null,
    email: '',
    birthday: '',
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
    company_name: '',
    company_location: '',
    technical_skills: null,
    non_technical_skills: null,
    hobbies: null,
    user_profiles: null,
    github_url: '',
    linikedIn_url: '',
    description: '',
    profile_picture: null,
    field_of_study: '',
    project_name: '',
    project_domain: '',
    project_description: ''
  }

  personalDetails = this._formBuilder.group({
    firstName: ['Arulmozhi', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    lastName: ['Karunagaran', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
    phoneNumber: [1234567890, (Validators.required, Validators.min(10000000000), Validators.max(999999999999), Validators.pattern(/[0-9]/))],
    birthday: ['15/12/2002', Validators.required],
    gender: '1',
    email: ['arulmozhi.ec19@bitsathy.ac.in', [Validators.required, Validators.email]],
    state: ['Dharmapuri', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    city: ['Tamil Nadu', Validators.required],
    pinCode: [636701, (Validators.required, Validators.pattern(/[0-9]{6}/))],
    languagesKnown: [null, Validators.required]
  })

  academicDetails = this._formBuilder.group({
    collegeName: ['Bannari Amman Institute Of Technology', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    collegeStudy: ['B.E ECE', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
    collegeLocation: ['Sathyamangalam', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    collegeStartYear: [2019, [Validators.required, Validators.pattern(/[0-9]{4}/)]],
    collegeEndYear: [2023, [Validators.required, Validators.pattern(/[0-9]{4}/)]],
    collegeCGPA: [8.84, Validators.required],
    schoolName: ['Kamalam International School', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    schoolLocation: ['Dharmapuri', [Validators.required, Validators.pattern(/[A-Z][a-z]/)]],
    sslcPercentage: [90, [Validators.required]],
    hscPercentage: [90, [Validators.required]]
  })

  experienceDetails = this._formBuilder.group({
    experiences: this._formBuilder.array([])
  })

  addExperience() {
    const experienceForm = this._formBuilder.group({
      companyName: ['TrusTrace', Validators.required],
      companyLocation: ['Coimbatore', Validators.required],
      startYear: ['2222', Validators.required],
      endYear: ['', Validators.required],
      projectName: ['', Validators.required],
      projectDomain: ['', Validators.required],
      projectDescription: ['', Validators.required],
    })

    this.experiences.push(experienceForm);
  }

  deleteExperience(experienceIdx: number) {
    this.experiences.removeAt(experienceIdx)
  }

  skillDetails = this._formBuilder.group({
    technicalSkill: [null, Validators.required],
    nonTechnicalSkill: [null, Validators.required]
  })

  additionalDetails = this._formBuilder.group({
    description: [`I am an enthusiastic, self-motivated, reliable, responsible and hard working person. I am a mature team worker and adaptable to all challenging situations. I am able to work well both in a team environment as well as using own initiative. I am able to work well under pressure and adhere to strict deadlines.`,
      Validators.required],
    hobbies: [null, Validators.required],
    githubURL: ['https://github.com/Arulmozhi-Karunagaran/TrusTrace-Training', Validators.required],
    linkedInURL: ['https://www.linkedin.com/in/preethiuthayakumar/', Validators.required],
    profilePicture: [null, Validators.required]
  })

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  technicalSkills: string[] = [];
  nonTechnicalSkills: string[] = [];
  hobbies: string[] = [];
  flag: boolean = true;
  isImageUploaded: boolean = false;
  isTechSkillEmpty: boolean = false;
  languages: string[] = ['Tamil', 'English', 'Hindi', 'Telungu', 'Malayalam'];
  skillLength: number = 6;

  addTechSkills(event: MatChipInputEvent): boolean {

    if (this.technicalSkills.length === 6) {
      return false;
    }

    const value = (event.value || '').trim();
    const duplicateIdx = this.technicalSkills.findIndex(
      skill => value.toLowerCase() === skill.toLowerCase()
    );

    if (duplicateIdx !== -1) {
      this.techSkillList.errorState = true;
      return false;
    }

    if (value) {
      this.technicalSkills.push(value);
      this.techSkillList.errorState = false;
    }

    event.chipInput!.clear();
    return true;
  }

  removeTechSkill(skill: string): void {
    const index = this.technicalSkills.indexOf(skill);

    if (index >= 0) {
      this.technicalSkills.splice(index, 1);
      return;
    }

  }

  addNonTechSkills(event: MatChipInputEvent): boolean {

    if (this.nonTechnicalSkills.length === 6) {
      return false;
    }

    const value = (event.value || '').trim();
    const duplicateIdx = this.nonTechnicalSkills.findIndex(
      skill => value.toLowerCase() === skill.toLowerCase()
    );

    if (duplicateIdx !== -1) {
      this.nonTechSkillList.errorState = true;
      return false;
    }

    if (value) {
      this.nonTechnicalSkills.push(value);
      this.nonTechSkillList.errorState = false;
    }

    event.chipInput!.clear();
    return true;
  }

  removeNonTechSkill(skill: string): void {
    const index = this.nonTechnicalSkills.indexOf(skill);

    if (index >= 0) {
      this.nonTechnicalSkills.splice(index, 1);
    }
  }

  addHobbies(event: MatChipInputEvent) {

    if (this.hobbies.length === 6) {
      return false;
    }

    const value = (event.value || '').trim();

    const duplicateIdx = this.hobbies.findIndex(
      hobby => value.toLowerCase() === hobby.toLowerCase()
    );

    if (duplicateIdx !== -1) {
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
    const index = this.hobbies.indexOf(hobby);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }

  }

  setDetails() {

    this.userDetails.first_name = this.personalDetails.value.firstName;
    this.userDetails.last_name = this.personalDetails.value.lastName;
    this.userDetails.phone_number = this.personalDetails.value.phoneNumber;
    this.userDetails.email = this.personalDetails.value.email;
    this.userDetails.birthday = this.personalDetails.value.birthday;

    // const temp = this.personalDetails.value.birthday;
    // const bday: Date = new Date(this.personalDetails.value.birthday);

    this.personalDetails.value.gender === '1' ? this.userDetails.gender = 'Male' : this.userDetails.gender = 'Female';


    this.userDetails.languages_known = this.personalDetails.value.languagesKnown;
    this.userDetails.state = this.personalDetails.value.state;
    this.userDetails.city = this.personalDetails.value.city;

    this.userDetails.pin_code = this.personalDetails.value.pinCode;
    this.userDetails.college_name = this.academicDetails.value.collegeName;
    this.userDetails.college_location = this.academicDetails.value.collegeLocation;
    this.userDetails.field_of_study = this.academicDetails.value.collegeStudy;
    this.userDetails.college_start_period = this.academicDetails.value.collegeStartYear;
    this.userDetails.college_end_period = this.academicDetails.value.collegeEndYear;
    this.userDetails.college_cgpa = this.academicDetails.value.collegeCGPA;
    this.userDetails.school_name = this.academicDetails.value.schoolName;
    this.userDetails.school_location = this.academicDetails.value.schoolLocation;
    this.userDetails.sslc_percentage = this.academicDetails.value.sslcPercentage
    this.userDetails.hsc_percentage = this.academicDetails.value.hscPercentage;

    // this.userDetails.company_name = this.experienceDetails.value.companyName;
    // this.userDetails.company_location = this.experienceDetails.value.companyLocation;
    // this.userDetails.project_name = this.experienceDetails.value.projectName;
    // this.userDetails.project_domain = this.experienceDetails.value.projectDomain;
    // this.userDetails.project_description = this.experienceDetails.value.projectDescription;

    this.userDetails.technical_skills = this.technicalSkills;
    this.userDetails.non_technical_skills = this.nonTechnicalSkills;
    this.userDetails.hobbies = this.hobbies;
    this.userDetails.github_url = this.additionalDetails.value.githubURL;
    this.userDetails.linikedIn_url = this.additionalDetails.value.linkedInURL;
    this.userDetails.description = this.additionalDetails.value.description;
  }

  showSwalFire() {

    this.setDetails();

    this.apiService.createUser(this.userDetails).subscribe(res => {
      this.userDetails = res.data;
    }, err => {
      console.log('');
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
      text: "Yeew have completed the entire process, Click below to download the pdf",
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
          'Your pdf file has been downloaded, Check your downloads',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Are yeew sure',
          'This wont delete any of your details',
          'error'
        )
      }
    })

  }

  imageUrl: string | null | ArrayBuffer = '';

  xAxisDownLeft = 0;
  yAxisDownLeft = 0;
  xAxisDownRight = 0;
  yAxisDownRight = 0;

  generatePDF() {

    let splittedText;
    let yAxisTop = 0;
    let xAxisTop = 0;

    const doc = new jsPDF();

    doc.setFillColor(24, 24, 24);
    doc.rect(0, 0, 320, 75, 'F');

    doc.setFillColor(234, 234, 234);
    doc.rect(0, 75, 300, 240, 'F');

    // doc.setFillColor(242, 242, 242);
    // doc.rect(0, 60, 55, 240, 'F');

    doc.setFont('Times', 'bold').setFontSize(15);
    doc.setTextColor(255, 255, 255).text(`${this.userDetails.first_name?.toUpperCase()} ${this.userDetails.last_name?.toUpperCase()}`, xAxisTop += 55, yAxisTop += 15);

    doc.setFontSize(13).setFont('', 'bold').text('Front End Developer', xAxisTop, yAxisTop += 10);

    if (this.userDetails.description) {
      splittedText = doc.splitTextToSize(this.userDetails.description, 170);
      doc.setFontSize(12).setLineHeightFactor(1.5).setFont('default', 'normal').text(splittedText, xAxisTop, yAxisTop += 10);
    }

    doc.setLineWidth(2).setDrawColor(24, 24, 24);
    doc.line(0, 75, 300, 75);
    doc.line(0, 296.5, 300, 296.5);
    // doc.setDrawColor(255, 255, 255).line(75, 1, 296.5, 1);
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
    // doc.setLineWidth(0.5).setDrawColor( 24, 24, 24);
    // doc.line(17, 88, this.xAxisDownLeft + 30, this.yAxisDownLeft += 3);

    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.text(`${'\u2022'}   ${this.userDetails.college_name} (${this.userDetails.college_start_period} - ${this.userDetails.college_end_period} batch)`, this.xAxisDownLeft += 5, this.yAxisDownLeft += 10);
    doc.text(`${this.userDetails.field_of_study} - ${this.userDetails.college_cgpa} - CGPA`, this.xAxisDownLeft += 5, this.yAxisDownLeft += 8);
    this.userDetails.college_location ? doc.text(this.userDetails.college_location, this.xAxisDownLeft, this.yAxisDownLeft += 8) : null;

    doc.text(`${'\u2022'}   ${this.userDetails.school_name}, ${this.userDetails.school_location}`, this.xAxisDownLeft -= 5, this.yAxisDownLeft += 10);
    doc.text(`HSC Percentage - ${this.userDetails.hsc_percentage}`, this.xAxisDownLeft += 5, this.yAxisDownLeft += 8);
    doc.text(`SSLC Percentage - ${this.userDetails.sslc_percentage}`, this.xAxisDownLeft, this.yAxisDownLeft += 8);

    // doc.setLineWidth(0.5).setDrawColor( 24, 24, 24);
    // doc.line(this.xAxisDownLeft += 10, this.yAxisDownLeft + 3, this.xAxisDownLeft + 10, this.yAxisDownLeft += 3);

    doc.setFontSize(13).setFont('Times', 'bold');
    doc.text('EXPERIENCE', this.xAxisDownRight += 130, this.yAxisDownRight += 85);
    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.text(`${'\u2022'}   ${this.userDetails.company_name} - (Jan 2020 - May 2023)`, this.xAxisDownRight += 5, this.yAxisDownRight += 10);
    doc.text(`Front End Developer`, this.xAxisDownRight += 5, this.yAxisDownRight += 10);
    doc.text(`${this.userDetails.company_location}`, this.xAxisDownRight, this.yAxisDownRight += 10);

    doc.setFontSize(13).setFont('Times', 'bold');

    doc.setTextColor(24, 24, 24).text('PROJECTS', this.xAxisDownLeft -= 10, this.yAxisDownLeft += 15);
    doc.setFontSize(12);
    doc.setFont('times', 'bold').text(`${'\u2022'}   ${this.userDetails.project_name} - (Jan 2020 - May 2023)`, this.xAxisDownLeft += 5, this.yAxisDownLeft += 10);

    doc.setFont('timies', 'normal').text(`${this.userDetails.project_domain}`, this.xAxisDownLeft += 5, this.yAxisDownLeft += 8);

    if (this.userDetails.project_description) {
      doc.setFont('times', 'normal');
      splittedText = doc.splitTextToSize(this.userDetails.project_description, 110);
      doc.setFontSize(12).setLineHeightFactor(1.5).setFont('default', 'normal').text(splittedText, this.xAxisDownLeft, this.yAxisDownLeft += 8);
    }

    this.addTechnicalSkillsInsidePDF(doc);
    this.addNonTechnicalSkillsInsidePDF(doc);
    this.addHobbiesInsidePDF(doc);
    // const ele: HTMLElement | null = document.getElementById('jspdf-button');
    // if(ele) {
    //   doc.html(ele, {
    //     callback: function(doc) {
    //       doc.save('afds');
    //     }
    //   })
    // }

    if (this.imageUrl && typeof this.imageUrl === 'string') {
      doc.addImage(this.imageUrl, 'JPEG', 7, 10, 40, 45, 'profile-picture');
    }

    doc.save(`${this.userDetails.first_name} ${this.userDetails.last_name}.pdf`);

  }

  addTechnicalSkillsInsidePDF(doc: jsPDF) {

    console.log(this.xAxisDownRight, this.yAxisDownRight);
    // this.technicalSkills.push('Java');
    // this.technicalSkills.push('JavaScript');
    // this.technicalSkills.push('Python');
    // this.technicalSkills.push('TypeScript');
    // this.technicalSkills.push('C');
    // this.technicalSkills.push('C++');

    if (this.userDetails.technical_skills && this.userDetails.technical_skills.length !== 0) {
      doc.setFont('times', 'normal');
      let idx = 0;
      let maxLength = 3;

      doc.setFontSize(13).setFont('Times', 'bold');
      doc.text('TECHNICAL SKILLS', this.xAxisDownRight -= 10, this.yAxisDownRight += 15);

      this.yAxisDownRight += 10;
      this.xAxisDownRight += 5;

      doc.setFontSize(13).setFont('Times', 'normal');

      while (idx < this.technicalSkills.length) {

        if (idx === maxLength) {
          this.xAxisDownRight += 30;
          this.yAxisDownRight -= 30;
        }

        doc.text('\u2022   ' + this.userDetails.technical_skills[idx], this.xAxisDownRight, this.yAxisDownRight);
        idx += 1;
        this.yAxisDownRight += 10;
      }

    }

  }

  addNonTechnicalSkillsInsidePDF(doc: jsPDF) {

    console.log(this.xAxisDownRight, this.yAxisDownRight);
    // this.nonTechnicalSkills.push('Positivity');
    // this.nonTechnicalSkills.push('Communication');
    // this.nonTechnicalSkills.push('Co-operation');
    // this.nonTechnicalSkills.push('Creativity');
    // this.nonTechnicalSkills.push('Prioritization');
    // this.nonTechnicalSkills.push('Team Work');

    if (this.userDetails.non_technical_skills && this.userDetails.non_technical_skills.length !== 0) {
      doc.setFont('times', 'normal');
      let idx = 0;
      let maxLength = 3;
      this.xAxisDownRight = 140;
      doc.setFontSize(13).setFont('Times', 'bold');
      doc.text('NON TECHNICAL SKILLS', this.xAxisDownRight -= 10, this.yAxisDownRight += 5);
      this.yAxisDownRight += 10;
      this.xAxisDownRight += 5;
      doc.setFontSize(13).setFont('Times', 'normal');

      while (idx < this.nonTechnicalSkills.length) {

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

  addHobbiesInsidePDF(doc: jsPDF) {

    if (this.userDetails.hobbies && this.userDetails.hobbies.length !== 0) {
      doc.setFont('times', 'normal');
      let idx = 0;
      let maxLength = 3;
      this.xAxisDownRight = 140;
      doc.setFontSize(13).setFont('Times', 'bold');
      doc.text('HOBBIES', this.xAxisDownRight -= 10, this.yAxisDownRight += 5);
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

  load(event: any) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onloadend = (event) => { // called once readAsDataURL is completed

        if (event.target) {
          this.imageUrl = event.target.result;
          this.isImageUploaded = true;
        }

      }
    }

  }

  setImageCondition() {
    this.isImageUploaded = false;
  }

  public date = new Date();

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService) { }

}
