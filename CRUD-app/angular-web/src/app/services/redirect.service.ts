import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private _http: HttpClient) {
  }

  getAllDetails(): Observable<any> {
    return this._http.get(`${BASE_URL}employees`);
  }

  getOneEmployee(id: number): Observable<any> {
    return this._http.get(`${BASE_URL}employee/${id}`);
  }

  createDataSend(data: object) {
    return this._http.post(`${BASE_URL}create`, data);
  }

  deleteDataSend(id: number) {
    return this._http.delete<object>(`${BASE_URL}delete/${id}`);
  }

  updateEmployee(employee: any, id: any) {
    return this._http.put<object>(`${BASE_URL}employees/${id}`, employee);
  }
}
