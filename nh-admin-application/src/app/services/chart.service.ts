import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  //source https://stackoverflow.com/questions/2086744/javascript-function-to-convert-date-yyyy-mm-dd-to-dd-mm-yy
  
  
  
  //todo fix dates for anxiety chart
  formatDate(input:string){
    input = input.slice(0,10)
    let datePart:any = input.match(/\d+/g)
    let year = datePart[0]
    let month = datePart[1]
    let day = datePart[2]
  
    return `${day}-${month}-${year}`  
  }

  //format date for anxiety table
  formatDateColumn(date:Date)
  {
    let day:any = date.getDate();
    day = String(day)
    day = day.length == 2 ? day : `0${day}`

    let month:any = date.getMonth();
    month = String(month + 1)
    month = month.length == 2 ? month : `0${month}`

    let year:any = date.getFullYear();
    
    return `${day}-${month}-${year}`
  }

  //date input filter reformat for api
  formatFilterDate(input:HTMLInputElement, days:number){
    let datePart:any = input.value.match(/\d+/g)
    let year = datePart[2]
    let month = datePart[1]
    let day = datePart[0]

    let output:any = `${month}-${day}-${year}` 

    output = new Date(output)
    output.setDate(output.getDate() + days)

    day = output.getDate()
    month = output.getMonth() + 1
    year = output.getFullYear()

    output = `${year}-${month}-${day}`

    return output
  }

  echartsFormat(input:any,column:string, chartType:string){

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

      date = input[row][questionareDate]
      

      //add Y Axis Data
      yData.push(input[row][column]);
      
      //add X Axis Data aka Dates
      xData.push(date)
    }

    let output:any = 
    {
      title: {
        text:`${column.toUpperCase()}`,
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
          type: chartType,
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
