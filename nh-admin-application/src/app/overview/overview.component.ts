import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { DataService } from '../services/data.service';
import { overview } from '../models/overview.model';
import {Sort} from '@angular/material/sort';
import { Router } from '@angular/router';

import { KeycloakService } from 'keycloak-angular';

//source https://material.angular.io/components/paginator/examples


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{
 
  constructor(
    protected router:Router,
    protected keycloakAngular: KeycloakService,
    private dataService : DataService ) {
    
  }
  
  //search filter for columns
  searchFilter:any[] = ["","","","","","",""]


  //page object 
  page = {pageSize:10,pageNumber:0,numberOfRecords:0}

  sort = 'patienthospitalnumber'
  ascDesc = 'true'

  //object to hold table data
  dataSource:overview[] = []
  
  //table columns
  displayedColumns:string[] = ['patienthospitalnumber','surname', 'firstname','question_id','painmeasure','d1','d2'];

  //Filter input Columns
  displayedColumnFilters:string[] = ['patienthospitalnumber-filter','surname-filter','firstname-filter','question_id-filter','painmeasure-filter','d1-filter','d2-filter'];
  

  //When component first loads
  ngOnInit() {
    
    //gets row data and the number of rows
    this.getTableData()
  } 
  
  //next, previous, first and last page navigation
  pageChange(PageEvent:any) {
    this.page.pageSize = PageEvent.pageSize
    this.page.pageNumber = PageEvent.pageIndex

    this.getTableData()
  }
  
  //Todo if have time
    //Pagination similar to the NBA website
    //e.g select which page you want

    //sort columns
    sortData(sort: Sort) {
      const data = this.dataSource.slice();      
      if (!sort.active || sort.direction === '') {

        this.sort = 'patienthospitalnumber';
        this.ascDesc = 'true';
        this.page.pageNumber = 0;

        this.getTableData()
        
        return;
      }

      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'patienthospitalnumber':
          
        this.sort = 'patienthospitalnumber';
        this.ascDesc = String(isAsc);
        this.page.pageNumber = 0;

        this.getTableData();
        return; 

        case 'surname': 
          this.sort = 'surname';
          this.ascDesc = String(isAsc);
          this.page.pageNumber = 0;   

          return this.getTableData();

        case 'firstname': 
          this.sort = 'firstname';
          this.ascDesc = String(isAsc);
          this.page.pageNumber = 0;   

          return this.getTableData();

        case 'question_id': 
          this.sort = 'question_id';
          this.ascDesc = String(isAsc);
          this.page.pageNumber = 0;   

          return this.getTableData();
        
        case 'painmeasure':
          this.sort = 'painmeasure';
          this.ascDesc = String(isAsc);
          this.page.pageNumber = 0;   

          return this.getTableData();
        
        case 'd1':
          this.sort = 'd1';
          this.ascDesc = String(isAsc);
          this.page.pageNumber = 0;   

          return this.getTableData();   
          
        case 'd2':
          this.sort = 'd1';
          this.ascDesc = String(isAsc);
          this.page.pageNumber = 0;   

          return this.getTableData(); 
        default: return 0;
        }
    }

  //route to the patients individual page
  getPatientOverview(id:any)
  {
    this.router.navigate([`/overview/anxietydepressionchart/${id}`]);
  }

  applyFilter(event:Event,index:number) {
    this.page.pageNumber = 0
    this.searchFilter[index] = (event.target as HTMLInputElement).value;

    this.getTableData();
    
     
  }


  getTableData(){
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.page.pageNumber,this.page.pageSize)
    .subscribe(
      (data:any) => {
        this.dataSource = data.rows
        this.page.numberOfRecords = data.totalItems    
      },
      (error:any) => {
        console.log(error)
        alert('api is down')
      })
    //Todo make function to avoid repeating code
  }
}