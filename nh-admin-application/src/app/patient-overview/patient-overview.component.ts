import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';

//echarts
import { EChartsOption } from 'echarts';


@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.scss']
})
export class PatientOverviewComponent implements OnInit {

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
    // this.dataService.getAnxiety(this.id)
    // .subscribe((data:any) => {
    //   this.multi = this.chartService.ngxFormat(data)
    //   console.log(this.multi)
    // })

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
// https://swimlane.gitbook.io/ngx-charts/