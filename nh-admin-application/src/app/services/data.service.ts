import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';


//todo http request from api
//import overview model

const url = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataService {

 constructor(private http:HttpClient) { }

   getOverview(page:number, size:number){
    let output:any = this.http.get(`${url}/patients/overview/all?page=${page}&size=${size}`)
    return output
    
  }
}
