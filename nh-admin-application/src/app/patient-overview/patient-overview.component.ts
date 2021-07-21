import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.css']
})
export class PatientOverviewComponent implements OnInit {

  id:string=""

  constructor(
    private dataService : DataService,
    private route: ActivatedRoute) { 
    this.route.params.subscribe( params => 
    this.id = params.id)
  }

  dataSource:any[] = []


  ngOnInit(): void {
    this.dataService.getAnxiety(this.id)
    .subscribe((data:any) => {
      this.dataSource = data    
      console.log(this.dataSource)  
    })
    
  }

}
// https://swimlane.gitbook.io/ngx-charts/