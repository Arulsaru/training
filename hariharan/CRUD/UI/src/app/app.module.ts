import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DirectoryDirective } from './directory.directive';
import { SecondsDirective } from './seconds.directive';
import { HttpClientModule } from '@angular/common/http'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { MainComponent } from './main/main.component';
@NgModule({
  declarations: [
    
    AppComponent,
    DirectoryDirective,
    SecondsDirective,
    EditEmployeeComponent,
    AddComponentComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatStepperModule,
    MatGridListModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
