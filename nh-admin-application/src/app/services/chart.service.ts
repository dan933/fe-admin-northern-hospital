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

  //source https://stackoverflow.com/questions/2086744/javascript-function-to-convert-date-yyyy-mm-dd-to-dd-mm-yy
  formatDate(input:string){
    input = input.slice(0,10)
    let datePart:any = input.match(/\d+/g)
    let year = datePart[0]
    let month = datePart[1]
    let day = datePart[2]
  
    return `${day}-${month}-${year}`  
  }

  echartsFormat(input:any,column:string){

    // X and Y Axis Initialisation
    let xData = []
    let yData = []

    //Date Column
    let questionareDate:string = 'questionare_date';

    //preperation for date conversion
    let date = ''

    
    //value for ydata
    for (let row in input)
    { 

      date = this.formatDate(input[row][questionareDate])
      

      //add Y Axis Data
      yData.push(input[row][column]);
      
      //add X Axis Data aka Dates
      xData.push(date)
    }

    let output:EChartsOption = 
    {
      title: {
        text:`Question ${column.toUpperCase()} Results`,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        }
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
      ],
    };
    return output;
  }
}
