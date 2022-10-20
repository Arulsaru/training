import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeesComponent } from './employees/employees.component'
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ShowEmployeeComponent } from './show-employee/show-employee.component';

const routes: Routes = [
  {path: 'employees', component: ShowEmployeeComponent},
  {path: 'employees/create', component: EmployeesComponent},
  {path: 'employees/update/:id', component: EditEmployeeComponent},
  {path: 'employees/view', component: ViewEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
