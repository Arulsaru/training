import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private _http:HttpClient) { }

  getAllDetails() :Observable<any> {
    return this._http.get('http://localhost:8000/list');
  }

  sendData(data: object) {
    return this._http.post('http://localhost:8000/create', data);
  }
}
