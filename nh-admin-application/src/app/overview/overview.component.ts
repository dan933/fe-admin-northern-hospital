import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { overview } from '../models/overview.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{
 
  constructor(private dataService : DataService) {
    
  }
  ELEMENT_DATA:overview[]=[]
  numberOfRecords:number = 0;
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns:string[] = ['patienthospitalnumber','surname', 'firstname','question_id','painmeasure','d1','d2'];
  

  //When component first loads
  ngOnInit() {  
    //paginator default gets page 1 and ten items 
    this.dataService.getOverview(0,10).subscribe((data:any) => {
      this.ELEMENT_DATA = data.patients
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })

    
  }

  
  //todo paginator functionality
  //this link will be useful change to use API calls
  // https://material.angular.io/components/paginator/examples
  

  //todo applyfilter needs to use the search overview call instead once I make it lol


  //Filter the data
  //Todo filter using the whole dataset
  //Todo filter individual columns

  applyFilter(event: Event) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
