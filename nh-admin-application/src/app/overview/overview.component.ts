import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { overview } from '../models/overview.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
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
  numberOfRecords:number = 0
  searchPatienthospitalnumber=""
  searchSurname=""
  searchFirstName=""
  searchQuestionId=""
  searchPainMeasure=""
  searchd1=""
  searchd2=""
  pageSize = 20;
  pageNumber = 0;


  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns:string[] = ['patienthospitalnumber','surname', 'firstname','question_id','painmeasure','d1','d2'];
  

  //When component first loads
  ngOnInit() {  
  this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.ELEMENT_DATA = data.patients
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
  } 
  
  //this link will be useful change to use API calls
  // https://material.angular.io/components/paginator/examples


  pageChange(PageEvent:any) {
    this.pageSize = PageEvent.pageSize
    this.pageNumber = PageEvent.pageIndex
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize).subscribe((data:any) => {
      this.ELEMENT_DATA = data.patients
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    }) 
  }
  
  //Todo if have time
    //Pagination similar to the NBA website

  applyFilter(event:Event) {
    let filterValue = (event.target as HTMLInputElement).value;

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyIdFilter(event:Event) {
    this.searchPatienthospitalnumber = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.ELEMENT_DATA = data.patients
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
     
  }

  applySurnameFilter(event:Event) {
    this.searchSurname = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.ELEMENT_DATA = data.patients
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
     
  }

  applyFirstnameFilter(event:Event) {
    this.searchFirstName = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.ELEMENT_DATA = data.patients
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
     
  }

  applyQuestionIdFilter(event:Event) {
    this.searchQuestionId = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.ELEMENT_DATA = data.patients
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })
    console.log(this.searchQuestionId)
     
  }

  applyPainmeasureFilter(event:Event) {
    this.searchPainMeasure = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.ELEMENT_DATA = data.patients
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })     
  }

  applyD1Filter(event:Event) {
    this.searchd1 = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.ELEMENT_DATA = data.patients
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })     
  }

  applyD2Filter(event:Event) {
    this.searchd2 = (event.target as HTMLInputElement).value;
    this.dataService.getOverview(this.searchPatienthospitalnumber,this.searchSurname,this.searchFirstName,this.searchQuestionId,this.searchPainMeasure,this.searchd1,this.searchd2,this.pageNumber,this.pageSize)
  .subscribe((data:any) => {
      this.ELEMENT_DATA = data.patients
      this.dataSource = data.patients
      this.numberOfRecords = data.totalItems
    })     
  }





}


