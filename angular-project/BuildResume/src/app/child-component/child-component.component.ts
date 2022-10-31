import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountService } from 'src/service/count-service';
@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {

  count: number = 0;
  constructor(private countService: CountService) { }
  ngOnInit() {
    this.countService.currentValue.subscribe(value => {
      this.count = value;
    })
  }

}
