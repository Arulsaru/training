import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/constant/constant';
import ts, {ResumeCreateResponse} from 'src/type/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) {}
  
  createUser(userData: ts) {
    return this._http.post<ResumeCreateResponse>(`${BASE_URL}create-user`, userData); 
  }
  
}
