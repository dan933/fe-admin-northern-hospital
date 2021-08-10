import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';
import { painMeasure } from '../models/painMeasure.model';

//echarts
import { EChartsOption } from 'echarts';

//Date range picker
import {FormGroup, FormControl} from '@angular/forms';
import * as _moment from 'moment';
import { MY_DATE_FORMATS } from '../services/my-date-formats';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-pain-measure-chart',
  templateUrl: './pain-measure-chart.component.html',
  styleUrls: ['./pain-measure-chart.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ]
})
export class PainMeasureChartComponent implements OnInit {

  //Patient summary heading
  id:string=""
  name:any[]=[]
  
  today = new Date(Date.now())
  lastYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)

  range = new FormGroup({
    start: new FormControl(this.lastYear),
    end: new FormControl(this.today)
  });

  painMeasureOptions: EChartsOption = {}

  constructor(
    private route: ActivatedRoute,
    private dataService : DataService,
    private chartService: ChartService
  ) {
    this.route.params.subscribe( params => 
      this.id = params.id
    )
  }

  dataSource:painMeasure[] = []

  ngOnInit(): void {
    
    this.dataService.getPainMeasureChart(this.id,this.lastYear,this.today)
    .subscribe((data:any) => {
      this.dataSource = data

      //reformat date
      for(let row in this.dataSource)
      {
        this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
        this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
      } 

      this.painMeasureOptions = this.chartService.echartsFormat(this.dataSource,'painmeasure','line');
    })

  }

  saveDate(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
    
    if (dateRangeStart.value != "" && dateRangeEnd.value != "")
    {
      this.dataService.getPainMeasureChart(this.id, this.chartService.formatFilterDate(dateRangeStart,0), this.chartService.formatFilterDate(dateRangeEnd,1))
      .subscribe((data:any) => {
        this.dataSource = data

        //reformat date
        for(let row in this.dataSource)
        {
          this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
          this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
        } 

        this.painMeasureOptions = this.chartService.echartsFormat(this.dataSource,'painmeasure','line');
      })
    }
  }

  saveRange(days:number){
    let startRange:any;
    let endRange:any = new Date()

    startRange = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    let day:any = startRange.getDate()
    day = String(day)
    day = day.length == 2 ? day : `0${day}`

    let month:any = startRange.getMonth()
    month = String(month + 1)
    month = month.length == 2 ? month : `0${month}`

    let year:any = startRange.getFullYear();

    startRange = `${year}-${month}-${day}`

    endRange.setDate(endRange.getDate()+1)

    day = endRange.getDate()
    day = String(day)
    day = day.length == 2 ? day : `0${day}`

    month = endRange.getMonth()
    month = String(month + 1)
    month = month.length == 2 ? month : `0${month}`

    year = endRange.getFullYear();

    endRange = `${year}-${month}-${day}`

    this.today = endRange
    this.lastYear = startRange


    this.dataService.getPainMeasureChart(this.id, startRange , endRange)
      .subscribe((data:any) => {
        this.dataSource = data

        //reformat date
        for(let row in this.dataSource)
        {
          this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
          this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
        } 

        this.painMeasureOptions = this.chartService.echartsFormat(this.dataSource,'painmeasure','line');
      })
      
    
  }

}
