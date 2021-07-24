import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';


//Wijmo Chart


@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.css']
})
export class PatientOverviewComponent implements OnInit {

  id:string=""
  

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
    
  }
}
// https://swimlane.gitbook.io/ngx-charts/