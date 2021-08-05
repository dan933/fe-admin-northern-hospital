import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';

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
  


  ngOnInit(): void {
    
    this.dataService.getAnxietyChart(this.id,this.lastYear,this.today)
    .subscribe((data:any) => {
      this.dOneOptions = this.chartService.echartsFormat(data,'d1','scatter');
      this.dTwoOptions = this.chartService.echartsFormat(data,'d2','scatter');
      this.dThreeOptions = this.chartService.echartsFormat(data,'d3','scatter');
      this.dFourOptions = this.chartService.echartsFormat(data,'d4','scatter');
      this.dFiveOptions = this.chartService.echartsFormat(data,'d5','scatter');
      this.dSixOptions = this.chartService.echartsFormat(data,'d6','scatter');
      this.dSevenOptions = this.chartService.echartsFormat(data,'d7','scatter');
      this.dEightOptions = this.chartService.echartsFormat(data,'d8','scatter');
      this.aOneOptions = this.chartService.echartsFormat(data,'a1','scatter');
      this.aTwoOptions = this.chartService.echartsFormat(data,'a2','scatter');
      this.aThreeOptions = this.chartService.echartsFormat(data,'a3','scatter');
      this.aFourOptions = this.chartService.echartsFormat(data,'a4','scatter');
      this.aFiveOptions = this.chartService.echartsFormat(data,'a5','scatter');
      this.aSixOptions = this.chartService.echartsFormat(data,'a6','scatter');
      this.aSevenOptions = this.chartService.echartsFormat(data,'a7','scatter');
      this.aEightOptions = this.chartService.echartsFormat(data,'a8','scatter');
    })
  }

  // source https://stackoverflow.com/questions/63823557/angular-material-datepickerrange-get-value-on-change
  saveDate(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
    
    if (dateRangeStart.value != "" && dateRangeEnd.value != "")
    {
      this.dataService.getAnxietyChart(this.id,this.chartService.formatFilterDate(dateRangeStart,0), this.chartService.formatFilterDate(dateRangeEnd,1))
      .subscribe((data:any) => {
        this.dOneOptions = this.chartService.echartsFormat(data,'d1','scatter');
        this.dTwoOptions = this.chartService.echartsFormat(data,'d2','scatter');
        this.dThreeOptions = this.chartService.echartsFormat(data,'d3','scatter');
        this.dFourOptions = this.chartService.echartsFormat(data,'d4','scatter');
        this.dFiveOptions = this.chartService.echartsFormat(data,'d5','scatter');
        this.dSixOptions = this.chartService.echartsFormat(data,'d6','scatter');
        this.dSevenOptions = this.chartService.echartsFormat(data,'d7','scatter');
        this.dEightOptions = this.chartService.echartsFormat(data,'d8','scatter');
        this.aOneOptions = this.chartService.echartsFormat(data,'a1','scatter');
        this.aTwoOptions = this.chartService.echartsFormat(data,'a2','scatter');
        this.aThreeOptions = this.chartService.echartsFormat(data,'a3','scatter');
        this.aFourOptions = this.chartService.echartsFormat(data,'a4','scatter');
        this.aFiveOptions = this.chartService.echartsFormat(data,'a5','scatter');
        this.aSixOptions = this.chartService.echartsFormat(data,'a6','scatter');
        this.aSevenOptions = this.chartService.echartsFormat(data,'a7','scatter');
        this.aEightOptions = this.chartService.echartsFormat(data,'a8','scatter');
      })
    }
      
  }
}