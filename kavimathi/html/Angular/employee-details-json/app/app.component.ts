import { Component, OnInit } from '@angular/core';
import { AddDetailsComponent } from './add-details/add-details.component';
import { Router } from '@angular/router';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  ngOnInit() { }
  public addDetailsComponent = AddDetailsComponent;

  employees: Array<any> = [];
  count: number = 0;
  constructor(
    private fetch: DetailsService
  ) {
    this.fetch.fetchData().subscribe(response => {
      this.employees = response.Data;
      this.count = response.count;
      console.log(this.employees);
      console.log(this.count); 
    }
    )
  }
  p: number = 1;
}

