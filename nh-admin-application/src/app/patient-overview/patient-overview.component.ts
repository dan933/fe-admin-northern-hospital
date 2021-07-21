import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.css']
})
export class PatientOverviewComponent implements OnInit {

  id:string=""

  //chart params
  multi:any[] = [];
  view: any[] = [700,300];

  // chart options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

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
      this.multi = this.chartService.ngxFormat(data)
      console.log(this.multi)
    })
    
  }
}
// https://swimlane.gitbook.io/ngx-charts/