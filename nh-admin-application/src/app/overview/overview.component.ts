import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { DataService } from '../services/data.service';
import { overview } from '../models/overview.model';
import {Sort} from '@angular/material/sort';
import { Router } from '@angular/router';

//source https://material.angular.io/components/paginator/examples


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{
 
  constructor(
    private router:Router,
    private dataService : DataService ) {
    
  }
  
  //initialise variables
  numberOfRecords:number = 0
  searchPatienthospitalnumber = ""
  searchSurname = ""
  searchFirstName = ""
  searchQuestionId = ""
  searchPainMeasure = ""
  searchd1 = ""
  searchd2 = ""
  pageSize = 3
  pageNumber = 0
  sort = 'patienthospitalnumber'
  ascDesc = 'true'


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
  
  pageChange(PageEvent:any) {
    this.pageSize = PageEvent.pageSize
    this.pageNumber = PageEvent.pageIndex

    this.getTableData()
  }
  
  //Todo if have time
    //Pagination similar to the NBA website
    //e.g select which page you want


    sortData(sort: Sort) {
      const data = this.dataSource.slice();      
      if (!sort.active || sort.direction === '') {

        this.sort = 'patienthospitalnumber';
        this.ascDesc = 'true';
        this.pageNumber = 0;

        this.getTableData()
        
        return;
      }

      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'patienthospitalnumber':
          
        this.sort = 'patienthospitalnumber';
        this.ascDesc = String(isAsc);
        this.pageNumber = 0;

        this.getTableData();
        return; 

        case 'surname': 
          this.sort = 'surname';
          this.ascDesc = String(isAsc);
          this.pageNumber = 0;   

          return this.getTableData();

        case 'firstname': 
          this.sort = 'firstname';
          this.ascDesc = String(isAsc);
          this.pageNumber = 0;   

          return this.getTableData();

        case 'question_id': 
          this.sort = 'question_id';
          this.ascDesc = String(isAsc);
          this.pageNumber = 0;   

          return this.getTableData();
        
        case 'painmeasure':
          this.sort = 'painmeasure';
          this.ascDesc = String(isAsc);
          this.pageNumber = 0;   

          return this.getTableData();
        
        case 'd1':
          this.sort = 'd1';
          this.ascDesc = String(isAsc);
          this.pageNumber = 0;   

          return this.getTableData();   
          
        case 'd2':
          this.sort = 'd1';
          this.ascDesc = String(isAsc);
          this.pageNumber = 0;   

          return this.getTableData(); 
        default: return 0;
        }
    }

  getPatientOverview(id:any)
  {
    this.router.navigate([`/overview/anxietydepressionchart/${id}`]);
  }

  //TODO Create one function to work with all input fields

  applyIdFilter(event:Event) {
    this.pageNumber = 0
    this.searchPatienthospitalnumber = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.rows
      this.numberOfRecords = data.totalItems
    })
     
  }

  applySurnameFilter(event:Event) {
    this.pageNumber = 0
    this.searchSurname = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.rows
      this.numberOfRecords = data.totalItems
    })
     
  }

  applyFirstnameFilter(event:Event) {
    this.pageNumber = 0
    this.searchFirstName = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.rows
      this.numberOfRecords = data.totalItems
    })
     
  }

  applyQuestionIdFilter(event:Event) {
    this.pageNumber = 0
    this.searchQuestionId = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.rows
      this.numberOfRecords = data.totalItems
    })     
  }

  applyPainmeasureFilter(event:Event) {
    this.pageNumber = 0
    this.searchPainMeasure = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.rows
      this.numberOfRecords = data.totalItems
    })     
  }

  applyD1Filter(event:Event) {
    this.pageNumber = 0
    this.searchd1 = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.rows
      this.numberOfRecords = data.totalItems
    })     
  }

  applyD2Filter(event:Event) {
    this.pageNumber = 0
    this.searchd2 = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.rows
      this.numberOfRecords = data.totalItems
    })     
  }


  getTableData(){
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
    .subscribe(
      (data:any) => {
        this.dataSource = data.rows
        this.numberOfRecords = data.totalItems    
      },
      (error:any) => {
        console.log(error)
        alert('api is down')
      })
    //Todo make function to avoid repeating code
  }
}