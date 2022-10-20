import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {

  updateId: number = 0;
  first_name: string = '';
  last_name: string = '';
  phone_number: number = 0;
  email_id: string = '';

  constructor(private http: HttpClient) { }

  url = 'http://localhost:4000/employees';

  getAllEmployees(): Observable<any> {
    return this.http.get(this.url);
  }

  sendData(value: string) {
    
    return this.http.post(this.url + '/create', value);
  }

  removeData(value: number) {
    return this.http.delete(this.url + '/delete?id=' + value);
  }

  viewData(value: number) {

  }

  getData(id: number) {

    return this.http.get(this.url + `/${id}`);
  }

  updateData(id: number) {
    this.updateId = id;
  }

  shareDetails(data: any) {

    this.updateId = data.id;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.phone_number = data.phone_number;
    this.email_id = data.email;
  }

  getId() {
    return this.updateId;
  }

  getFirstName() {
    return  this.first_name;
  }

  getLastName() {
    return  this.last_name;
  }

  getPhoneNumber() {
    return  this.phone_number;
  }

  getEmail() {
    return  this.email_id;
  }

  update(value: object, id: number) {
    return this.http.put(this.url + `/update/${id}`, value);
  }

  firstName(value: any) {

    return this.http.put('http://localhost:4000/employees/' + this.updateId + '/update',value);
  }

  lastName(value: any) {

    return this.http.put('http://localhost:4000/employees/update?id=' + this.updateId + '&last_name=' + value.last_name, null);
  }

  phoneNumber(value: any) {

    return this.http.put('http://localhost:4000/employees/update?id=' + this.updateId + '&phone_number=' + value.phone_number, null);
  }

  email(value: any) {

    return this.http.put('http://localhost:4000/employees/update?id=' + this.updateId + '&email=' + value.email, null);
  }
}