import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponentComponent} from './add-component/add-component.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
const routes: Routes = [
  {path: '', redirectTo:'employees',pathMatch:'full'},
  { path: 'employees', component: MainComponent },
  {
   path: 'employees',children : [
    
      { path: 'create', component: AddComponentComponent }
    ]
  },
  {
   path: 'employees',children : [
    { path: 'edit/:id', component: EditEmployeeComponent }

    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
