import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { Router } from '@angular/router';
import { __ } from 'lodash';
import * as _ from 'lodash';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  ngOnInit(): void {
  }

  page: number = 1;
  count: number = 10;
  datas: Array<any> = [];

  firstName: string = '';
  lastName: string = '';
  phoneNumber: number | null = null;

  deleteUser(userId: number) {
    console.log(userId);
    this.service.deleteUser(userId).subscribe();
  }

  getOne() {
    const tempId : number = 115;
    this.service.getOne(tempId).subscribe( response => {
      const getOneData = response;
      console.log(getOneData);
    });
  }

  navigateEditUser(str: string, userId: number) {
    
    this.service.setId(userId);
    this.router.navigate([`${str}`]);
  }
  
  constructor(private service: FetchDataService, private router: Router) {
      this.service.fetchData().subscribe(response => {
          this.datas = response;
        })
     }


  
}
