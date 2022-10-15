import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent implements OnInit {

  employees: Array<object> = [];
  constructor(
    private fetch: DetailsService
  ) { }

  send(data: any) {
    console.log(data);
    this.fetch.onCreate(data).subscribe();
  }

  del(data: string) {
    this.fetch.fetchDelete(data).subscribe();
  }

  update() {
    this.fetch.fetchUpdate().subscribe();
  }
  ngOnInit(): void {
  }

}
