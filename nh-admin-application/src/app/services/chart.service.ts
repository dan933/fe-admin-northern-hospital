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

  echartsAnxietyFormat(input:any){
    

    // X and Y Axis Initialisation
    let questions:any = {d1Data:[],d2Data:[],d3Data:[],d4Data:[],d5Data:[],d6Data:[], d7Data:[],d8Data:[],
                        a1Data:[],a2Data:[],a3Data:[],a4Data:[],a5Data:[],a6Data:[],a7Data:[],a8Data:[]}
    questions.d1Data.push("D1")
    questions.d2Data.push("D2")
    questions.d3Data.push("D3")
    questions.d4Data.push("D4")
    questions.d5Data.push("D5")
    questions.d6Data.push("D6")
    questions.d7Data.push("D7")
    questions.d8Data.push("D8")
    questions.a1Data.push("A1")
    questions.a2Data.push("A2")
    questions.a3Data.push("A3")
    questions.a4Data.push("A4")
    questions.a5Data.push("A5")
    questions.a6Data.push("A6")
    questions.a7Data.push("A7")
    questions.a8Data.push("A8")

    let dateData:any = []
    dateData.push("type")
    
    

    //Date Column
    let questionareDate:string = 'questionare_date';

    //preperation for date conversion
    let date = ''
    
    //value for ydata
    for (let row in input)
    { 

      date = input[row][questionareDate]

      //add Y Axis Data
      questions.d1Data.push(input[row]['d1']);
      questions.d2Data.push(input[row]['d2']); 
      questions.d3Data.push(input[row]['d3']);     
      questions.d4Data.push(input[row]['d4']);     
      questions.d5Data.push(input[row]['d5']);     
      questions.d6Data.push(input[row]['d6']);     
      questions.d7Data.push(input[row]['d7']);     
      questions.d8Data.push(input[row]['d8']);     
      questions.a1Data.push(input[row]['a1']);     
      questions.a2Data.push(input[row]['a2']);     
      questions.a3Data.push(input[row]['a3']);     
      questions.a4Data.push(input[row]['a4']);     
      questions.a5Data.push(input[row]['a5']);     
      questions.a6Data.push(input[row]['a6']);     
      questions.a7Data.push(input[row]['a7']);     
      questions.a8Data.push(input[row]['a8']);     
      
      //add X Axis Data aka Dates
      dateData.push(date)
    }

    let output:any = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'none'
        }
      },
      color: ['#2962ff', '#284987', '#001c76','#0045d8','#e75874','#0092b2','#195d7d','#01adb5','#2980b9',
              '#bedb39','#7ecd55','#40a96a','#009777','#5fad8e','#246672','#7ae79a','#80c63b'],
      dataset: {
        source: [
          dateData,
          questions.d1Data,
          questions.d2Data,
          questions.d3Data,
          questions.d4Data,
          questions.d5Data,
          questions.d6Data,
          questions.d7Data,
          questions.d8Data,
          questions.a1Data,
          questions.a2Data,
          questions.a3Data,
          questions.a4Data,
          questions.a5Data,
          questions.a6Data,
          questions.a7Data,
          questions.a8Data,
        ]
      },
      legend: {
        type:'scroll',
        itemWidth:30,
        itemHeight:30,
        icon:'square',
        selected:{
          'D1':true,'D2':false,'D3':false,'D4':false,'D5':false,'D6':false,'D7':false,'D8':false,
          'A1':false,'A2':false,'A3':false,'A4':false,'A5':false,'A6':false,'A7':false,'A8':false}
      },
      xAxis: {
        type: "category",
        axisTick: {
        }
      },
      yAxis: {},
      series: [{
        type: "scatter",
        seriesLayoutBy: "row",
      },{
        type: "scatter",
        seriesLayoutBy: "row",
      },{
        type: "scatter",
        seriesLayoutBy: "row",
      },{
        type: "scatter",
        seriesLayoutBy: "row",
      },{
        type: "scatter",
        seriesLayoutBy: "row",
      },{
        type: "scatter",
        seriesLayoutBy: "row",
      },{
        type: "scatter",
        seriesLayoutBy: "row",
      },{
        type: "scatter",
        seriesLayoutBy: "row",
      },
      {
        type: "scatter",
        seriesLayoutBy: "row",
      }, {
        type: "scatter",
        seriesLayoutBy: "row",
      },{      
        type: "scatter",
        seriesLayoutBy: "row",
      },{
        type:"scatter",
        seriesLayoutBy:"row",      
      }, {
        type:"scatter",
        seriesLayoutBy:"row",      
      }, {       
        type:"scatter",
        seriesLayoutBy:"row",      
      },{
      type:"scatter",
      seriesLayoutBy:"row",        
      }, {
      type:"scatter",
      seriesLayoutBy:"row",        
      }],
        dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'filter'
        },
        {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'filter'
        }
      ],
    }
    console.log(questions.d1Data)
    
    return output;
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
            filterMode: 'filter'
        },
        {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'filter'
        },
        {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'filter'
        },
        {
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'filter'
        }
      ],
    };
    return output;
  }

}


//todo log colour change northern to #005cb9