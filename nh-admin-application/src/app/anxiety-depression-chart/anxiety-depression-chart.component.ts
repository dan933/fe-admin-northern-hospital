import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';

//echarts
import { EChartsOption } from 'echarts';


@Component({
  selector: 'app-anxiety-depression-chart',
  templateUrl: './anxiety-depression-chart.component.html',
  styleUrls: ['./anxiety-depression-chart.component.scss']
})
export class AnxietyDepressionChartComponent implements OnInit {

  //Patient summary heading
  id:string=""
  name:any[]=[]
  

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
    private dataService : DataService,
    private chartService: ChartService,
    private route: ActivatedRoute) { 
    this.route.params.subscribe( params => 
    this.id = params.id)
  }


  ngOnInit(): void {
    this.dataService.getAnxiety(this.id,"d1")
    .subscribe((data:any) => {
      this.dOneOptions = this.chartService.echartsFormat(data);
    })

    this.dataService.getAnxiety(this.id,"d2")
    .subscribe((data:any) => {
      this.dTwoOptions = this.chartService.echartsFormat(data);
    })

    this.dataService.getAnxiety(this.id,"d3")
    .subscribe((data:any) => {
      this.dThreeOptions = this.chartService.echartsFormat(data);
    })

    this.dataService.getAnxiety(this.id,"d4")
    .subscribe((data:any) => {
      this.dFourOptions = this.chartService.echartsFormat(data);
    })
    this.dataService.getAnxiety(this.id,"d5")
    .subscribe((data:any) => {
      this.dFiveOptions = this.chartService.echartsFormat(data);
    })
    this.dataService.getAnxiety(this.id,"d6")
    .subscribe((data:any) => {
      this.dSixOptions = this.chartService.echartsFormat(data);
    })
    this.dataService.getAnxiety(this.id,"d7")
    .subscribe((data:any) => {
      this.dSevenOptions = this.chartService.echartsFormat(data);
    })
    this.dataService.getAnxiety(this.id,"d8")
    .subscribe((data:any) => {
      this.dEightOptions = this.chartService.echartsFormat(data);
    })

    this.dataService.getPatientName(this.id)
    .subscribe((data:any) => {
      this.name = data    
    })

    
    
  }

}

//TODO make endpoint get all questions d1 to a8 then filter and pass to charts format function 
//for now ask api to getAnxiety for each question