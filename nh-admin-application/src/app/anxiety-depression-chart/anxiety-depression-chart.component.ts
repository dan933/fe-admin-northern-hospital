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

  id:string=""
  name:any[]=[]
  
  chartOption: EChartsOption = {}

  constructor(
    private dataService : DataService,
    private chartService: ChartService,
    private route: ActivatedRoute) { 
    this.route.params.subscribe( params => 
    this.id = params.id)
  }


  ngOnInit(): void {
    this.dataService.getAnxiety(this.id)
    .subscribe((data:any) => {
      this.chartOption = this.chartService.echartsFormat(data)
    })

    this.dataService.getPatientName(this.id)
    .subscribe((data:any) => {
      this.name = data
      console.log(this.name)
    })
    
  }

}
