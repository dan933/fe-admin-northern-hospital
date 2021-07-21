import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  ngxFormat(input:any[])
  {
    let name = Object.keys(input[0])[0]
    let dateValue = Object.keys(input[0])[1]
    let output:any = [
      {
        "name": name,
        "series":[]
      }
    ];
    let dateConvert:string = ""

    for (let row of input)
    {
      dateConvert = row[dateValue]
      dateConvert = dateConvert.slice(0,10)
      output[0].series.push({"name": new Date(dateConvert), "value":row[name]}) 
    }
    return output;    
  }
}
