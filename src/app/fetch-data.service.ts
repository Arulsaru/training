import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  
  constructor(private _http:HttpClient) { }

  id: number = 0;

  fetchData():Observable <any> {
    return this._http.get('http://localhost:8000/');
  }

  createData(newUserData: object) {
    return this._http.post('http://localhost:8000/create', newUserData);
  }

  editUser(datas: object) {
    return this._http.put<object>('http:/localhost:8000/update', datas );
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

  getId() {
    return this.id;
  }

}
