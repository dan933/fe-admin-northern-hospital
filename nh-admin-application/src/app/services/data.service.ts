import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataService {

 constructor(private http:HttpClient) { }

 //get overview data 
   getOverview(sort:string,ascDesc:string,searchPatienthospitalnumber:string,searchSurname:string,searchFirstName:string,searchQuestionId:string,searchPainMeasure:string,searchd1:string,searchd2:string,page:number, size:number){
    let output:any = this.http.get(`${url}/overview/filter/${sort}/${ascDesc}?searchPatienthospitalnumber=${searchPatienthospitalnumber}&searchSurname=${searchSurname}&searchFirstName=${searchFirstName}&searchQuestionId=${searchQuestionId}&searchPainMeasure=${searchPainMeasure}&searchd1=${searchd1}&searchd2=${searchd2}&page=${page}&size=${size}`)
    return output
    //http://localhost:3000/api/overview/filter?searchPatienthospitalnumber=&searchSurname=&searchFirstName=&searchQuestionId=&searchPainMeasure=&searchd1=&searchd2=&size=30  
  }

//anxiety and depression endpoints
  getAnxiety(id:string, startDate:any, endDate:any){
    let output:any = this.http.get(`${url}/anxietydepression/find/questionare_date/true/id/${id}?startDate=${startDate}&endDate=${endDate}`)
    return output
  }

  //get patient name
  getPatientName(id:string){
    let output:any = this.http.get(`${url}/patients/name/id/${id}`)
    return output;
  }

  getPainMeasure(id:string, startDate:any, endDate:any){
    let output:any = this.http.get(`${url}/painmeasure/find/questionare_date/true/id/${id}?startDate=${startDate}&endDate=${endDate}`)
    return output;
  }
}
