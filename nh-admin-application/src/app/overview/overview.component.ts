import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { overview } from '../models/overview.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginatorIntl, MatPaginator, PageEvent} from '@angular/material/paginator';
import {Subject} from 'rxjs';
import {Sort} from '@angular/material/sort';

//source https://material.angular.io/components/paginator/examples


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{
 
  constructor(private dataService : DataService) {
    
  }
  
  numberOfRecords:number = 0
  searchPatienthospitalnumber = ""
  searchSurname = ""
  searchFirstName = ""
  searchQuestionId = ""
  searchPainMeasure = ""
  searchd1 = ""
  searchd2 = ""
  pageSize = 20
  pageNumber = 0


  dataSource:overview[] = []

  
  

  displayedColumns:string[] = ['patienthospitalnumber','surname', 'firstname','question_id','painmeasure','d1','d2'];

  //Filter Columns
  displayedColumnFilters:string[] = ['patienthospitalnumber-filter','surname-filter','firstname-filter','question_id-filter','painmeasure-filter','d1-filter','d2-filter'];
  

  //When component first loads
  ngOnInit() {  
  this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
    
  } 
  
  pageChange(PageEvent:any) {
    this.pageSize = PageEvent.pageSize
    this.pageNumber = PageEvent.pageIndex

    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
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
        this.dataSource = data;
        return;
      }
      this.dataSource = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'patienthospitalnumber': return compare(a.patienthospitalnumber, b.patienthospitalnumber, isAsc);
          case 'surname': return compare(a.surname, b.surname, isAsc);
          case 'firstname': return compare(a.firstname, b.firstname, isAsc);
          case 'question_id': return compare(a.question_id, b.question_id, isAsc);
          case 'painmeasure': return compare(a.painmeasure, b.painmeasure, isAsc);
          case 'd1': return compare(a.d1, b.d1, isAsc);
          case 'd2': return compare(a.d2, b.d2, isAsc);
          default: return 0;
        }
      })
    }

  applyIdFilter(event:Event) {
    this.pageNumber = 0
    this.searchPatienthospitalnumber = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
     
  }

  applySurnameFilter(event:Event) {
    this.pageNumber = 0
    this.searchSurname = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
     
  }

  applyFirstnameFilter(event:Event) {
    this.pageNumber = 0
    this.searchFirstName = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
     
  }

  applyQuestionIdFilter(event:Event) {
    this.pageNumber = 0
    this.searchQuestionId = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
    console.log(this.searchQuestionId)
     
  }

  applyPainmeasureFilter(event:Event) {
    this.pageNumber = 0
    this.searchPainMeasure = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })     
  }

  applyD1Filter(event:Event) {
    this.pageNumber = 0
    this.searchd1 = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })     
  }

  applyD2Filter(event:Event) {
    this.pageNumber = 0
    this.searchd2 = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })     
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
