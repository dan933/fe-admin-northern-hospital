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

  records:overview[] = []
  

  ngOnInit() {    
    this.dataService.getOverview().subscribe((data:any) => {
      this.records = data.patients
      console.log(data)
    })
    
    
  }
  
}
