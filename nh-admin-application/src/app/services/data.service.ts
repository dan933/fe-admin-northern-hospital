import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//auth token
import { KeycloakService } from 'keycloak-angular';

const url = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataService {

 constructor(
   private http:HttpClient,
   protected keycloakAngular: KeycloakService) { }

   getToken(){
    try {
      let token:any = this.keycloakAngular.getKeycloakInstance().idToken;      
      return token;
    } catch (e){
      console.log('Failed to load token', e);
    }
   }

 //get overview data 
   getOverviewTable(sort:string,ascDesc:string,searchPatienthospitalnumber:string,searchSurname:string,searchFirstName:string,searchQuestionId:string,searchPainMeasure:string,searchd1:string,searchd2:string,page:number, size:number){    //loads JWT token todo add to utils and use token for api authorization ect
    let token = this.getToken()
    console.log(token)
    let output:any = this.http.get(`${url}/overview/filter/${sort}/${ascDesc}?searchPatienthospitalnumber=${searchPatienthospitalnumber}&searchSurname=${searchSurname}&searchFirstName=${searchFirstName}&searchQuestionId=${searchQuestionId}&searchPainMeasure=${searchPainMeasure}&searchd1=${searchd1}&searchd2=${searchd2}&page=${page}&size=${size}`)
    return output
    //http://localhost:3000/api/overview/filter?searchPatienthospitalnumber=&searchSurname=&searchFirstName=&searchQuestionId=&searchPainMeasure=&searchd1=&searchd2=&size=30  
  }

//anxiety and depression endpoints
  getAnxietyChart(id:string, startDate:any, endDate:any){
    let token = this.getToken()
    console.log(token)
    let output:any = this.http.get(`${url}/anxietydepression/find/questionare_date/true/id/${id}?startDate=${startDate}&endDate=${endDate}`)
    return output
  }

  getAnxietyTable(id:string,startDate:any, endDate:any,sort:string,ascDesc:string,searchd1:string,searchd2:string,searchd3:string,searchd4:string,searchd5:string,searchd6:string,searchd7:string,searchd8:string, searcha1:string, searcha2:string, searcha3:string, searcha4:string, searcha5:string, searcha6:string, searcha7:string,searcha8:string,page:number, size:number){
    let token = this.getToken()
    console.log(token)
    let output:any = this.http.get(`${url}/anxietydepression/filter/${sort}/${ascDesc}/id/${id}?startDate=${startDate}&endDate=${endDate}&searchd1=${searchd1}&searchd2=${searchd2}&searchd3=${searchd3}&searchd4=${searchd4}&searchd5=${searchd5}&searchd6=${searchd6}&searchd7=${searchd7}&searchd8=${searchd8}&searcha1=${searcha1}&searcha2=${searcha2}&searcha3=${searcha3}&searcha4=${searcha4}&searcha5=${searcha5}&searcha6=${searcha6}&searcha7=${searcha7}&searcha8=${searcha8}&page=${page}&size=${size}`)
    return output
  }
  //http://localhost:3000/api/anxietydepression/filter/d1/true/id/2?startDate=2020-06-18T00:50:12.000Z&endDate=2025-01-01T00:50:12.000Z&page=0&size=10&searchd1=&searchd2=&searchd3=&searchd4=&searchd5=&searchd6=&searchd7=&searchd8=&searcha1=&searcha2=&searcha3=&searcha4=&searcha5=&searcha6=&searcha7=&searcha8=


  getAnxietyDownload(id:string,startDate:any,endDate:any){
    let token = this.getToken()
    console.log(token)
    let output:any = `${url}/anxietydepression/download/${id}?startDate=${startDate}&endDate=${endDate}`
    return output
  }
  //http://localhost:3000/api/anxietydepression/download/3?startDate=2021-06-16&endDate=2021-06-17

  //get patient name
  getPatientName(id:string){
    let token = this.getToken()
    console.log(token)
    let output:any = this.http.get(`${url}/patients/name/id/${id}`)
    return output;
  }

  getPainMeasureChart(id:string, startDate:any, endDate:any){
    let token = this.getToken()
    console.log(token)
    let output:any = this.http.get(`${url}/painmeasure/find/questionare_date/true/id/${id}?startDate=${startDate}&endDate=${endDate}`)
    return output;
  }

  getPainMeasureTable(id:string,startDate:any, endDate:any,sort:string,ascDesc:string,searchpainmeasure:string,page:number, size:number){
    let token = this.getToken()
    console.log(token)
    let output:any = this.http.get(`${url}/painmeasure/filter/${sort}/${ascDesc}/id/${id}?startDate=${startDate}&endDate=${endDate}&searchpainmeasure=${searchpainmeasure}&page=${page}&size=${size}`)
    return output;
  }

  getPainMeasureDownload(id:string,startDate:any,endDate:any){
    let token = this.getToken()
    console.log(token)
    let output:any = `${url}/painmeasure/download/${id}?startDate=${startDate}&endDate=${endDate}`
    return output
  }
  //http://localhost:3000/api/painmeasure/filter/questionare_date/false/id/3?startDate=Mon%20Aug%2010%202020%2011:04:01%20GMT+1000%20(Australian%20Eastern%20Standard%20Time)&endDate=Tue%20Aug%2010%202021%2011:04:01%20GMT+1000%20(Australian%20Eastern%20Standard%20Time)&searchpainmeasure=&page=0&size=10
}
