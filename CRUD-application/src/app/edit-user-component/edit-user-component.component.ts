import {Component, OnInit} from '@angular/core';
import {RedirectService} from '../services/redirect.service';
import Swal from 'sweetalert2';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-user-component',
  templateUrl: './edit-user-component.component.html',
  styleUrls: ['./edit-user-component.component.scss']
})
export class EditUserComponentComponent implements OnInit {
  public userId: number = 0;
  public employee: any = {
    user_id: 0,
    name: '',
    phone_number: '',
    email: '',
  };

  constructor(private api: RedirectService, route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  ngOnInit(): void {
    this.api.getOneEmployee(this.userId).subscribe((response) => {
      this.employee = response;
    })
  }

  onSubmit(value: object) {
    {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {

          this.api.updateEmployee(this.employee, this.userId).subscribe(response => {
            console.log(response, 'rrrrrrr')
          });

          // Swal.fire('Saved!', '', 'success')

        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
  }

}
