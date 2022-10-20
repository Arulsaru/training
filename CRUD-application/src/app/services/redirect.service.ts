import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  baseURL:string = `http://localhost:8000/`;

  constructor(private _http: HttpClient) {
  }

  getAllDetails(): Observable<any> {
    return this._http.get(this.baseURL+`employees`);
  }

  getOneEmployee(id: number): Observable<any> {
    return this._http.get(this.baseURL+`employee/${id}`);
  }

  createDataSend(data: object) {
    return this._http.post(this.baseURL+`create`, data);
  }

  deleteDataSend(id: number) {
    return this._http.delete<object>(this.baseURL + `delete/${id}`);
  }

  updateEmployee(employee: any, id: any) {
    return this._http.put<object>(this.baseURL + `employees/${id}`, employee);
  }
}