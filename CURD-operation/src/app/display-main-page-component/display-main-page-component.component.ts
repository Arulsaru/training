import { Component, OnInit } from '@angular/core';
import { RedirectService } from '../services/redirect.service';

@Component({
  selector: 'app-display-main-page-component',
  templateUrl: './display-main-page-component.component.html',
  styleUrls: ['./display-main-page-component.component.scss']
})
export class DisplayMainPageComponentComponent implements OnInit {

  detailsData:Array<any> = [];

  page: number = 1;
  limit: number = 10;

  constructor(private allDetails:RedirectService) {
    this.allDetails.getAllDetails().subscribe((response) => {
        this.detailsData = response;
      }
    )
   }

  ngOnInit(): void {
    
  }

}
