import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeesComponent } from './employees/employees.component'
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

const routes: Routes = [
  // {path: ' ', redirectTo: 'AppComponent', pathMatch: 'full'},
  {path: 'create', component: EmployeesComponent},
  {path: 'update', component: EditEmployeeComponent},
  {path: 'view', component: ViewEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
