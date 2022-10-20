import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DisplayMainPageComponentComponent} from './display-main-page-component/display-main-page-component.component';
import {EditUserComponentComponent} from './edit-user-component/edit-user-component.component';
import {FormComponentComponent} from './form-component/form-component.component'

const routes: Routes = [
  {path: '', redirectTo: 'employees', pathMatch: 'full'},
  {path: 'employees', component: DisplayMainPageComponentComponent},
  {path: 'employees/create', component: FormComponentComponent},
  {path: 'employees/edit/:id', component: EditUserComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}