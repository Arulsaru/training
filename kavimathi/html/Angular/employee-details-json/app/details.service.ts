import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  count: any;

  constructor(private _http: HttpClient) { }

  fetchData(): Observable<any> {
    return this._http.get('http://localhost:3700/data');
  }

  onCreate(employeeDetails: object) {
    return this._http.post('http://localhost:3700/create',employeeDetails);
  }

  fetchGet1(user_id: string) {
    return this._http.get('http://localhost:3700/get1' + user_id);
  }

  fetchUpdate(): Observable<any> {
    return this._http.get('http://localhost:3700/update');
  }

  fetchDelete(user_id: string) {
    return this._http.delete<object>('http://localhost:3700/delete?user_id=' + user_id);
  }
}
