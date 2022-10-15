import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDetailsComponent } from './add-details/add-details.component';
import { AppComponent } from './app.component';

const routes: Routes = [{ path: 'add', component: AddDetailsComponent },
{ path: 'update', component: AddDetailsComponent },
// { path: '', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
