import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  userData:object = {};
  
  constructor(private _http:HttpClient) { }

  getAllDetails() :Observable<any> {
    return this._http.get('http://localhost:8000/list');
  }

  createDataSend(data: object) {
    return this._http.post('http://localhost:8000/create', data);
  }

  deleteDataSend(userId: number) {
    return this._http.delete<object>('http://localhost:8000/delete?user_id=' + userId);
  }

 
  setUserData(data: object) {
    this.userData = data
  }

  getUserData() {
    return this.userData;
  }

}
