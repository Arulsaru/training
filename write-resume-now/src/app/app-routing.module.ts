import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationComponentComponent } from './education-component/education-component.component';
import { PersonalDetailsComponentComponent } from './personal-details-component/personal-details-component.component';

const routes: Routes = [
  { path: 'personalDetails', component: PersonalDetailsComponentComponent},
  { path: 'education', component: EducationComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
