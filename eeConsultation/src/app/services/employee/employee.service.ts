import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly URL_API = this.config.getConfig().backend.url

  constructor(private config: ConfigService,
    private http: HttpClient) { }

    create(data:any){
      return this.http.post(this.URL_API+'/employee', data)
    }
  
    list(){
      return this.http.get(this.URL_API+'/employee/')
    }
    
    update(data:any){
      console.log(data)
      return this.http.put(this.URL_API+'/employee/'+data.id, data.employee)
    }
  
    delete(id:string){
      return this.http.delete(this.URL_API+'/employee/' + id)
    }
  
    // search(data:any){
    //   return this.http.post(this.URL_API+'/employee/search', data)
    // }
  
    searchGet(data:any){
      return this.http.get(this.URL_API+'/employee/'+data)
    }
}
