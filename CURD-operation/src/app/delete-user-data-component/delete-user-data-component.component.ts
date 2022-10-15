import { Component, OnInit } from '@angular/core';
import { RedirectService } from '../services/redirect.service';

@Component({
  selector: 'app-delete-user-data-component',
  templateUrl: './delete-user-data-component.component.html',
  styleUrls: ['./delete-user-data-component.component.scss']
})
export class DeleteUserDataComponentComponent implements OnInit {

  user_id: number | null = null;

  constructor(private service: RedirectService) { }

  ngOnInit(): void {
  }

}
