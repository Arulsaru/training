import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  updateId: number = 0;

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get('http://localhost:4000/employees');
  }

  sendData(value: string) {
    return this.http.post('http://localhost:4000/create', value);
  }

  removeData(value: number) {
    return this.http.delete('http://localhost:4000/delete?id=' + value);
  }

  viewData(value: number) {
    
    return this.http.get('http://localhost:4000/get?id=' + value);
  }

  updateData(id: number) {
    this.updateId = id;  
  }

  firstName(value: any) {
    
    return this.http.put('http://localhost:4000/update?id=' + this.updateId + '&first_name=' + value.first_name, null);
  }

  lastName(value: any) {
    
    return this.http.put('http://localhost:4000/update?id=' + this.updateId + '&last_name=' + value.last_name, null);
  }

  phoneNumber(value: any) {
    
    return this.http.put('http://localhost:4000/update?id=' + this.updateId + '&phone_number=' + value.phone_number, null);
  }

  email(value: any) {
    
    return this.http.put('http://localhost:4000/update?id=' + this.updateId + '&email=' + value.email, null);
  }
}