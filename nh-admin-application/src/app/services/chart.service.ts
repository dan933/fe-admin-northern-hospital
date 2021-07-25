import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//echarts
import { EChartsOption } from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  // ngxFormat(input:any[])
  // {
  //   let name = Object.keys(input[0])[0]
  //   let dateValue = Object.keys(input[0])[1]
  //   let output:any = [
  //     {
  //       "name": name,
  //       "series":[]
  //     }
  //   ];
  //   let dateConvert:string = ""

  //   for (let row of input)
  //   {
  //     dateConvert = row[dateValue]
  //     dateConvert = dateConvert.slice(0,10)
  //     output[0].series.push({"name": new Date(dateConvert), "value":row[name]}) 
  //   }
  //   return output;    
  // }

  echartsFormat(input:any){

    let xData = []
    let yData = []

    let name = Object.keys(input[0])[0]
    let dateValue = Object.keys(input[0])[1]

    let dateConvert:any = ''

    for (let row of input)
    {

      dateConvert = row[dateValue]
      dateConvert = dateConvert.slice(0,10)
      
      xData.push(dateConvert);
      yData.push(row[name]);
    }

    let output:EChartsOption = 
    {
      title: {
        text:`Question ${name.toUpperCase()} Results`,
        left: 'center'
      },
      
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: yData,
          type: 'scatter',
        },
      ],
      dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'none'
        },
        {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'none'
        },
        {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'none'
        },
        {
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'none'
        }
    ]
    };
    return output;
  }
}
