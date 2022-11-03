import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../constant/constant'
import {Observable} from 'rxjs';
import Resume, {ResumeCreateResponse} from '../types';

@Injectable({
  providedIn: 'root'
})
export class ResumeApiService {

  constructor(private _http: HttpClient) {
  }

  createUser(resume: Resume) {
    return this._http.post<ResumeCreateResponse>(`${BASE_URL}create`, resume);
  }

  getUserDetails(): Observable<Resume> {
    return this._http.get<Resume>(`${BASE_URL}details`);
  }
}
