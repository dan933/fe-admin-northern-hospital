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
  
  numberOfRecords:number = 0
  searchPatienthospitalnumber = ""
  searchSurname = ""
  searchFirstName = ""
  searchQuestionId = ""
  searchPainMeasure = ""
  searchd1 = ""
  searchd2 = ""
  pageSize = 10
  pageNumber = 0
  sort = 'patienthospitalnumber'
  ascDesc = 'true'


  dataSource:overview[] = []

  
  

  displayedColumns:string[] = ['patienthospitalnumber','surname', 'firstname','question_id','painmeasure','d1','d2'];

  //Filter Columns
  displayedColumnFilters:string[] = ['patienthospitalnumber-filter','surname-filter','firstname-filter','question_id-filter','painmeasure-filter','d1-filter','d2-filter'];
  

  //When component first loads
  ngOnInit() {  
  this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe(
    (data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems    
    },
    (error:any) => {
      console.log(error)
      alert('api is down')
    })
    
  } 
  
  pageChange(PageEvent:any) {
    this.pageSize = PageEvent.pageSize
    this.pageNumber = PageEvent.pageIndex

    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
    .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    }) 
  }
  
  //Todo if have time
    //Pagination similar to the NBA website
    //e.g select which page you want


    sortData(sort: Sort) {
      const data = this.dataSource.slice();
      if (!sort.active || sort.direction === '') {
        this.dataService.getOverviewTable('patienthospitalnumber','true',this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
        .subscribe((data:any) => {
        this.dataSource = data.patients
        this.numberOfRecords = data.totalItems
    })
        return;
      }
      this.dataSource = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'patienthospitalnumber': 
            return this.dataService.getOverviewTable('patienthospitalnumber',String(isAsc),this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
            this.ascDesc = String(isAsc)
            this.dataSource = data.patients
            this.numberOfRecords = data.totalItems
            });
          case 'surname': 
            return this.dataService.getOverviewTable('surname',String(isAsc),this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
            this.ascDesc = String(isAsc)
            this.dataSource = data.patients
            this.numberOfRecords = data.totalItems
            });
          case 'firstname': 
            return this.dataService.getOverviewTable('firstname',String(isAsc),this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
            this.ascDesc = String(isAsc)
            this.dataSource = data.patients
            this.numberOfRecords = data.totalItems
            });
          case 'question_id': 
            return this.dataService.getOverviewTable('question_id',String(isAsc),this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
            this.ascDesc = String(isAsc)
            this.dataSource = data.patients
            this.numberOfRecords = data.totalItems
            });
          case 'painmeasure':
            return this.dataService.getOverviewTable('painmeasure',String(isAsc),this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
            this.ascDesc = String(isAsc)
            this.dataSource = data.patients
            this.numberOfRecords = data.totalItems
            });
          case 'd1':
            return this.dataService.getOverviewTable('d1',String(isAsc),this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
            this.ascDesc = String(isAsc)
            this.dataSource = data.patients
            this.numberOfRecords = data.totalItems
            });          
          case 'd2':
            return this.dataService.getOverviewTable('d2',String(isAsc),this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
            this.ascDesc = String(isAsc)
            this.dataSource = data.patients
            this.numberOfRecords = data.totalItems
            });    
          default: return 0;
        }
      })
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
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
     
  }

  applySurnameFilter(event:Event) {
    this.pageNumber = 0
    this.searchSurname = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
     
  }

  applyFirstnameFilter(event:Event) {
    this.pageNumber = 0
    this.searchFirstName = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
     
  }

  applyQuestionIdFilter(event:Event) {
    this.pageNumber = 0
    this.searchQuestionId = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })     
  }

  applyPainmeasureFilter(event:Event) {
    this.pageNumber = 0
    this.searchPainMeasure = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })     
  }

  applyD1Filter(event:Event) {
    this.pageNumber = 0
    this.searchd1 = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })     
  }

  applyD2Filter(event:Event) {
    this.pageNumber = 0
    this.searchd2 = (event.target as HTMLInputElement).value;
    this.dataService.getOverviewTable(this.sort,this.ascDesc,this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })     
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
