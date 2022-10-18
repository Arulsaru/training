import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  
  constructor(private _http:HttpClient) { }

  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  phoneNumber: number = 0;

  fetchData():Observable <any> {
    return this._http.get('http://localhost:8000/');
  }

  createData(newUserData: object) {
    return this._http.post('http://localhost:8000/create', newUserData);
  }

  updateUser(datas: object, userId: number, firstName: string, lastName: string, phoneNumber: number) {
    console.log(typeof datas, datas);
    console.log(userId) ;
    return this._http.put<object>('http://localhost:8000/update?user_id=' + userId + '&first_name=' + firstName + '&last_name=' + lastName + '&phone_number=' + phoneNumber, datas);
    // return this._http.put<object>('http://localhost:8000/update/user', datas);
  }

  deleteUser(userId: number){
    return this._http.delete<object>('http://localhost:8000/delete?user_id=' + userId);
  }

  getOne(userId: number) {
    return this._http.get('http://localhost:8000/getone?user_id=' + userId);
  }

  setId(userId: number) {
    this.id = userId;
  } 

  setDetails(firstName: string, lastName: string, phoneNumber: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getId() {
    return this.id;
  }

}
