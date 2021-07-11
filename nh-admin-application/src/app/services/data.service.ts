import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//todo http request from api
//import overview model


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataService {

 constructor(private http:HttpClient) { }

   getOverview(){
    let output:any = this.http.get('http://localhost:3000/api/patients/overview/all?size=50')
    return output
    
  }
}
