import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constant/constant'
import { Observable } from 'rxjs';
import details from '../types';

@Injectable({
  providedIn: 'root'  
})
export class ResumeApiService {

  constructor(private _http: HttpClient) { }

  createUser(datas: object){
    return this._http.post(`${BASE_URL}create`, datas);
  }

  getUserDetails(): Observable<details> {
    return this._http.get<details>(`${BASE_URL}details`);
  }
}
