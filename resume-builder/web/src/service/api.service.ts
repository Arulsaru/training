import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/constant/constant';
import ts from 'src/app/type/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  
  createUser(userData: ts) {
    return this._http.post(`${BASE_URL}create`, userData); 
  }

  fetchDetails(): Observable<ts> {
    return this._http.get<ts>(`${BASE_URL}`);
  }

}
