import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  // @Input() id: number;
  // employeeId: number;

  updateFirstName(firstName: any) {

    return this.service.firstName(firstName).subscribe();
  }

  updateLastName(lastName: any) {
   
    return this.service.lastName(lastName).subscribe();
  }

  updatePhoneNumber(phoneNumber: any) {
    
    return this.service.phoneNumber(phoneNumber).subscribe();
  }

  updateEmail(email: any) {
    
    return this.service.email(email).subscribe();
  }

  constructor(private service: EmployeesService) { }

  ngOnInit(): void {
  }

}
