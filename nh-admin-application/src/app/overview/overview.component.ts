import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { overview } from '../models/overview.model';





@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent /*implements OnInit*/{
 
  constructor(private dataService : DataService) {
    
  }
  dataSource:overview[]=[];
  displayedColumns:string[] = ['patienthospitalnumber','surname', 'firstname','question_id','painmeasure','d1','d2'];

  ngOnInit() {    
    this.dataService.getOverview().subscribe((data:any) => {
      this.dataSource = data.patients
      console.log(data.patients)
    })

  }
  
}
