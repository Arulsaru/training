import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  userData:object = {};

  userId:number = 0;
  name:string = '';
  email:string = '';
  phoneNumber:string = '';

  details:object = {};
  
  constructor(private _http:HttpClient) { 
    
  }

  getAllDetails() :Observable<any> {
    return this._http.get('http://localhost:8000/list');
  }

  createDataSend(data: object) {
    return this._http.post('http://localhost:8000/create', data);
  }

  deleteDataSend(userId: number) {
    return this._http.delete<object>('http://localhost:8000/delete?user_id=' + userId);
  }

  updateDataSend(data: any) {
    return this._http.put('http://localhost:8000/update?user_id=' + this.userId + '&name=' + data.name + '&phone_number=' + data.phone_number + '&email=' + data.email, null )
  }

  setUser(userId: number, name: string, phoneNumber: string, email: string) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  getUserId() {
    return this.userId;
  }

  getUserName() {
    return this.name;
  }

  getUserEmail() {
    return this.email;
  }

  getUserPhoneNumber() {
    return this.phoneNumber;
  }

  



}
