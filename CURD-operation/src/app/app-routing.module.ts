import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayMainPageComponentComponent } from './display-main-page-component/display-main-page-component.component';
import { FormComponentComponent } from './form-component/form-component.component'

const routes: Routes = [
  {path: '',component:DisplayMainPageComponentComponent},
  {path: 'form',component:FormComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
