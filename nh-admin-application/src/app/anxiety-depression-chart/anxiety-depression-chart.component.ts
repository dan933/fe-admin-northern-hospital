import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';
import { anxietyDepression } from '../models/anxietyDepression.model';

//echarts
import { EChartsOption } from 'echarts';

//Date range picker
import {FormGroup, FormControl} from '@angular/forms';
import * as _moment from 'moment';
import { MY_DATE_FORMATS } from '../services/my-date-formats';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';



@Component({
  selector: 'app-anxiety-depression-chart',
  templateUrl: './anxiety-depression-chart.component.html',
  styleUrls: ['./anxiety-depression-chart.component.scss'],
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
export class AnxietyDepressionChartComponent implements OnInit {
  //Patient summary heading
  id:string=""
  name:any[]=[]
  
  today = new Date(Date.now())
  lastYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)

  range = new FormGroup({
    start: new FormControl(this.lastYear),
    end: new FormControl(this.today)
  });

  
  

  //charts d1 to a8 questions
  dOneOptions: EChartsOption = {}
  dTwoOptions:EChartsOption = {}
  dThreeOptions:EChartsOption = {}
  dFourOptions:EChartsOption = {}
  dFiveOptions:EChartsOption = {}
  dSixOptions:EChartsOption = {}
  dSevenOptions:EChartsOption = {}
  dEightOptions:EChartsOption = {}
  aOneOptions:EChartsOption = {}
  aTwoOptions:EChartsOption = {}
  aThreeOptions:EChartsOption = {}
  aFourOptions:EChartsOption = {}
  aFiveOptions:EChartsOption = {}
  aSixOptions:EChartsOption = {}
  aSevenOptions:EChartsOption = {}
  aEightOptions:EChartsOption = {}


  constructor(
    private route: ActivatedRoute,
    private dataService : DataService,
    private chartService: ChartService
    ) { 
    this.route.params.subscribe( params => 
    this.id = params.id)
  }

  dataSource:anxietyDepression[] = []
  


  ngOnInit(): void {
    
    this.dataService.getAnxietyChart(this.id,this.lastYear,this.today)
    .subscribe((data:any) => {
      this.dataSource = data

      //reformat date
      for(let row in this.dataSource)
      {
        this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
        this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
      } 
       
      this.dOneOptions = this.chartService.echartsFormat(this.dataSource,'d1','scatter');
      this.dTwoOptions = this.chartService.echartsFormat(this.dataSource,'d2','scatter');
      this.dThreeOptions = this.chartService.echartsFormat(this.dataSource,'d3','scatter');
      this.dFourOptions = this.chartService.echartsFormat(this.dataSource,'d4','scatter');
      this.dFiveOptions = this.chartService.echartsFormat(this.dataSource,'d5','scatter');
      this.dSixOptions = this.chartService.echartsFormat(this.dataSource,'d6','scatter');
      this.dSevenOptions = this.chartService.echartsFormat(this.dataSource,'d7','scatter');
      this.dEightOptions = this.chartService.echartsFormat(this.dataSource,'d8','scatter');
      this.aOneOptions = this.chartService.echartsFormat(this.dataSource,'a1','scatter');
      this.aTwoOptions = this.chartService.echartsFormat(this.dataSource,'a2','scatter');
      this.aThreeOptions = this.chartService.echartsFormat(this.dataSource,'a3','scatter');
      this.aFourOptions = this.chartService.echartsFormat(this.dataSource,'a4','scatter');
      this.aFiveOptions = this.chartService.echartsFormat(this.dataSource,'a5','scatter');
      this.aSixOptions = this.chartService.echartsFormat(this.dataSource,'a6','scatter');
      this.aSevenOptions = this.chartService.echartsFormat(this.dataSource,'a7','scatter');
      this.aEightOptions = this.chartService.echartsFormat(this.dataSource,'a8','scatter');
    })
  }

  // source https://stackoverflow.com/questions/63823557/angular-material-datepickerrange-get-value-on-change
  saveDate(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
    
    if (dateRangeStart.value != "" && dateRangeEnd.value != "")
    {
      this.dataService.getAnxietyChart(this.id,this.chartService.formatFilterDate(dateRangeStart,0), this.chartService.formatFilterDate(dateRangeEnd,1))
      .subscribe((data:any) => { 
        this.dataSource = data

      //reformat date
      for(let row in this.dataSource)
      {
        this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
        this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
      } 

      this.dOneOptions = this.chartService.echartsFormat(this.dataSource,'d1','scatter');
      this.dTwoOptions = this.chartService.echartsFormat(this.dataSource,'d2','scatter');
      this.dThreeOptions = this.chartService.echartsFormat(this.dataSource,'d3','scatter');
      this.dFourOptions = this.chartService.echartsFormat(this.dataSource,'d4','scatter');
      this.dFiveOptions = this.chartService.echartsFormat(this.dataSource,'d5','scatter');
      this.dSixOptions = this.chartService.echartsFormat(this.dataSource,'d6','scatter');
      this.dSevenOptions = this.chartService.echartsFormat(this.dataSource,'d7','scatter');
      this.dEightOptions = this.chartService.echartsFormat(this.dataSource,'d8','scatter');
      this.aOneOptions = this.chartService.echartsFormat(this.dataSource,'a1','scatter');
      this.aTwoOptions = this.chartService.echartsFormat(this.dataSource,'a2','scatter');
      this.aThreeOptions = this.chartService.echartsFormat(this.dataSource,'a3','scatter');
      this.aFourOptions = this.chartService.echartsFormat(this.dataSource,'a4','scatter');
      this.aFiveOptions = this.chartService.echartsFormat(this.dataSource,'a5','scatter');
      this.aSixOptions = this.chartService.echartsFormat(this.dataSource,'a6','scatter');
      this.aSevenOptions = this.chartService.echartsFormat(this.dataSource,'a7','scatter');
      this.aEightOptions = this.chartService.echartsFormat(this.dataSource,'a8','scatter');
      })
    }
      
  }
}