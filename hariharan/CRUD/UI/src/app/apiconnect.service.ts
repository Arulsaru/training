import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiconnectService {

  constructor(private http : HttpClient) { }

   name:string='';
   phone:string='';
   email:string='';
   id:number = 0;
   commonUrl = 'http://localhost:3001/employees'
  calling() : Observable <any>
  {
    return this.http.get(this.commonUrl+'/list');
  }
  onSubmit(details)
  {
         return this.http.post(this.commonUrl+'/create',details);
  }
  onUpdate(updatedDetails) :  Observable <any>
  {  
         return this.http.put(this.commonUrl+'/'+this.id+'/edit',updatedDetails);
  }
  getdetails(id) : Observable <any>
  {
    let params = new HttpParams();
    params = params.append("id", id);
    return this.http.get(this.commonUrl+'/'+this.id+'/view',{params: params});
  }
  deleteDetails(id) : Observable <any>
  {
    let params = new HttpParams();
    params = params.append("id", id);
      
    return this.http.delete(this.commonUrl+'/'+this.id+'/delete',{params: params});
  }

  updetails(name:string,email:string,phone:string,id:number)
  {
   this.name=name;
   this.email=email;
   this.phone=phone;
   this.id=id;
  }
     
    getName()
    {
      return this.name;
    }
    getPhone()
    {
      return this.phone;
    }
    getEmail()
    {
      return this.email;
    }
   getId()
   {
    return this.id
   }

}
