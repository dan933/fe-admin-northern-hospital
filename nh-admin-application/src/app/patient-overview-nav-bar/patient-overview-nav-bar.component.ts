import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-patient-overview-nav-bar',
  templateUrl: './patient-overview-nav-bar.component.html',
  styleUrls: ['./patient-overview-nav-bar.component.scss']
})
export class PatientOverviewNavBarComponent implements OnInit {
  id:string=""
  name:any[]=[{surname:"", firstname:""}]
  heading:string = ""

  constructor(
    private route: ActivatedRoute,
    private dataService : DataService,
    ) {
    this.route.params.subscribe( params => 
      this.id = params.id)
      
      this.dataService.getPatientName(this.id)
      .subscribe((data:any) => {
        this.name = data
      })
   }

  ngOnInit(): void {
    
  }

}
