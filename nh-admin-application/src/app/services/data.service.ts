import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//todo http request from api
//import overview model


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataService {
// overviews:overview[] = [
//   {
//     patientHospitalNumber:1,
//     surName:'Albert',
//     firtName:'Daniel',
//     question_id:1,
//     painMeasure:100,
//     d1:20,
//     d2:30
//   },
//   {
//     patientHospitalNumber:1,
//     surName:'Albert',
//     firtName:'Daniel',
//     question_id:1,
//     painMeasure:100,
//     d1:20,
//     d2:30
//   }
// ]



 constructor(private http:HttpClient) { }

   getOverview(){
    let output:any = this.http.get('http://localhost:3000/api/patients/overview/all?size=50')
    return output
    
  }
}
