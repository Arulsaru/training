import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../resume.service';
import jsPDF from 'jspdf';
import resume from '../types'

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  resumeData: resume = {
    first_name: null,
    last_name: null,
    date_of_birth: null,
    gender: null,
    contact_number: null,
    email: null,
    location: null,
    pin_code: null,
    institute_name: null,
    institute_location: null,
    qualification: null,
    field_of_study: null,
    year_of_graduation: null,
    company_name: null,
    job_title: null,
    comapany_location: null,
    years_of_experience: null,
    skills: null,
    summary: null
  }

  constructor(private router: Router, private service: ResumeService) {
    this.createResumeData();
  }

  ngOnInit() {
    this.service.getResumeData().subscribe((response) => {
      this.resumeData = response;
    });
  }

  createResumeData() {
    this.service.pdfData().subscribe();
  }

  toSummary() {
    this.router.navigate(['summary']);
  }

  generatePdf() {
    const doc = new jsPDF();

    doc.setFillColor(245, 245, 245);
    doc.rect(1, 1, 63, 295, 'F');      //white smoke
    doc.rect(20, 10, 25, 25);          //profile pic
    doc.line(65, 45, 207, 45);         //horizontal line
    doc.line(3, 45, 63, 45);
    doc.line(3, 72, 63, 72);
    doc.line(3, 132, 63, 132);

    doc.setTextColor(0, 206, 209);    //sky blue color
    doc.setFontSize(12);
    doc.text('Summary', 65, 50);
    doc.text('Skills', 4, 43);
    doc.text('Education', 4, 70);
    doc.text('Experience', 4, 130);
    doc.setTextColor(105, 105, 105);   //black color 

    if (this.resumeData.first_name) {
      doc.setFontSize(30);
      doc.text(this.resumeData.first_name, 65, 15);
    }

    if (this.resumeData.last_name) {
      doc.setFontSize(30);
      doc.text(this.resumeData.last_name, 113, 15);
    }

    doc.setFontSize(12);
    if (this.resumeData.date_of_birth) {
      doc.text(this.resumeData.date_of_birth, 140, 29);
    }

    if (this.resumeData.gender) {
      doc.text(this.resumeData.gender, 170, 29);
    }

    if (this.resumeData.contact_number) {
      doc.text(this.resumeData.contact_number, 65, 40);
    }

    if (this.resumeData.email) {
      doc.text(this.resumeData.email, 100, 40);
    }

    if (this.resumeData.location) {
      doc.text(this.resumeData.location + " - ", 160, 40);
    }

    if (this.resumeData.pin_code) {
      doc.text(this.resumeData.pin_code, 185, 40);
    }

    if (this.resumeData.job_title) {
      doc.setTextColor(0, 206, 209);
      doc.text(this.resumeData.job_title, 66, 22);
    }

    doc.setTextColor(105, 105, 105);
    if (this.resumeData.company_name) {
      doc.text(this.resumeData.company_name, 7, 140);
    }

    if (this.resumeData.comapany_location) {
      doc.text(this.resumeData.comapany_location, 7, 150);
    }

    if (this.resumeData.years_of_experience) {
      doc.text(this.resumeData.years_of_experience, 7, 160);
    }

    if (this.resumeData.institute_name) {
      doc.text(this.resumeData.institute_name, 7, 80);
    }

    if (this.resumeData.institute_location) {
      doc.text(this.resumeData.institute_location, 7, 90);
    }

    if (this.resumeData.qualification) {
      doc.text(this.resumeData.qualification, 7, 100);
    }

    if (this.resumeData.field_of_study) {
      doc.text(this.resumeData.field_of_study, 6, 110);
    }

    if (this.resumeData.year_of_graduation) {
      doc.text(this.resumeData.year_of_graduation, 7, 120);
    }

    if (this.resumeData.skills) {
      doc.text(this.resumeData.skills, 7, 55);
    }

    if (this.resumeData.summary) {
      let splitsummary = doc.splitTextToSize(this.resumeData.summary, 135);
      doc.text(splitsummary, 70, 59);
    }

    doc.save(`${this.resumeData.first_name}`);
    alert('Resume Generated')

    this.router.navigate(['personal-details']);
  }
}
