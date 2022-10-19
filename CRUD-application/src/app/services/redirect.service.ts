import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private _http: HttpClient) {
  }

  getAllDetails(): Observable<any> {
    return this._http.get('http://localhost:8000/list');
  }

  getOneEmployee(id: number): Observable<any> {
    return this._http.get(`http://localhost:8000/employees/${id}`);
  }

  createDataSend(data: object) {
    return this._http.post('http://localhost:8000/create', data);
  }

  deleteDataSend(userId: number) {
    return this._http.delete<object>('http://localhost:8000/delete/' + userId);
  }

  updateEmployee(employee: any, id: any) {
    return this._http.put<object>(`http://localhost:8000/employees/${id}`, employee);
  }
}
