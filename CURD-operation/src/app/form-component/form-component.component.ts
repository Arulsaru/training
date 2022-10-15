import { Component, OnInit } from '@angular/core';
import { RedirectService } from '../services/redirect.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})

export class FormComponentComponent implements OnInit {

  name:string = '';
  phoneNumber:string= '';
  email:string='';

  constructor(private service: RedirectService) {
    
  }

  ngOnInit(): void {
  }

  onSubmit(data:  object) {
    return this.service.sendData(data).subscribe();
  }
}

function subscribe(arg0: (result: string) => void) {
  throw new Error('Function not implemented.');
}

