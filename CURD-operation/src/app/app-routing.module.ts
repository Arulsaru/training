import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteUserDataComponentComponent } from './delete-user-data-component/delete-user-data-component.component';
import { DisplayMainPageComponentComponent } from './display-main-page-component/display-main-page-component.component';
import { FormComponentComponent } from './form-component/form-component.component'

const routes: Routes = [
  {path: '',component:DisplayMainPageComponentComponent},
  {path: 'form',component:FormComponentComponent},
  {path: 'deleteUser',component: DeleteUserDataComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
