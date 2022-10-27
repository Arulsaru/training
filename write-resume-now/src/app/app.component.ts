import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'write-resume-now';
  step = 0;

  personalDetailsForm = this.formBulider.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone_number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    date_of_birth: ['', Validators.required],
    email: ['', [Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" )]],
    state: ['', Validators.required],
    city: ['', Validators.required],
    pin_code: ['', Validators.required],
  })

  constructor(private formBulider: FormBuilder) {

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

  personalDetailsSubmit() {
    console.log(this.personalDetailsForm.value);
  }

}
