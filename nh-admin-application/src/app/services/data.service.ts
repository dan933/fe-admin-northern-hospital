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

   getOverview(sort:string,ascDesc:string,searchPatienthospitalnumber:string,searchSurname:string,searchFirstName:string,searchQuestionId:string,searchPainMeasure:string,searchd1:string,searchd2:string,page:number, size:number){
    let output:any = this.http.get(`${url}/overview/${sort}/${ascDesc}?searchPatienthospitalnumber=${searchPatienthospitalnumber}&searchSurname=${searchSurname}&searchFirstName=${searchFirstName}&searchQuestionId=${searchQuestionId}&searchPainMeasure=${searchPainMeasure}&searchd1=${searchd1}&searchd2=${searchd2}&page=${page}&size=${size}`)
    return output
    
  }
}
//http://localhost:3000/api/overview?searchPatienthospitalnumber=&searchSurname=&searchFirstName=&searchQuestionId=&searchPainMeasure=&searchd1=&searchd2=&size=30