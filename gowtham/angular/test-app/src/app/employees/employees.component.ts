import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {

  constructor(private service: EmployeesService) {
   }
   
  addData(newData: any) {
    // console.log(newData.value)
    return this.service.sendData(newData).subscribe();
  }
   
  ngOnInit(): void {
  }

}
