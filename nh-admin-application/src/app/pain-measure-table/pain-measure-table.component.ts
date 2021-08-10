import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';
import { painMeasure } from '../models/painMeasure.model';
import {Sort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

//Date range picker
import {FormGroup, FormControl} from '@angular/forms';
import * as _moment from 'moment';
import { MY_DATE_FORMATS } from '../services/my-date-formats';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-pain-measure-table',
  templateUrl: './pain-measure-table.component.html',
  styleUrls: ['./pain-measure-table.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ]
})

export class PainMeasureTableComponent implements OnInit {

  id:string=""

  today = new Date(Date.now())
  lastYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)

  range = new FormGroup({
    start: new FormControl(this.lastYear),
    end: new FormControl(this.today)
  });

  rangeDownload = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  })

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private dataService : DataService,
    private chartService: ChartService
  ) { 
    this.route.params.subscribe( params => 
      this.id = params.id)
  }

  numberOfRecords:number = 0
  searchFilter:string = ""
  pageSize = 10
  pageNumber = 0
  sort = 'questionare_date'
  ascDesc = 'false'

  dataSource:painMeasure[] = []
  displayedColumns:string[] = ['questionare_date','painmeasure'];
  displayedColumnFilters:string[] = ['questionare_date-filter','painmeasure-filter'];

  ngOnInit(): void {
    this.dataService.getPainMeasureTable(this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter,this.pageNumber,this.pageSize)
    .subscribe((data:any) => {
      this.dataSource = data.rows

      //reformat date
      for(let row in this.dataSource)
      {
        this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
        this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
      }

      this.numberOfRecords = data.totalItems
    },
    (error:any) => {
      console.log(error)
      alert('api is down')
    })
  }

  saveDate(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
    
    if (dateRangeStart.value != "" && dateRangeEnd.value != "")
    {
      this.today = this.chartService.formatFilterDate(dateRangeEnd,0)
      
      this.lastYear = this.chartService.formatFilterDate(dateRangeStart,1)
      

      this.dataService.getPainMeasureTable(this.id,this.chartService.formatFilterDate(dateRangeStart,0), this.chartService.formatFilterDate(dateRangeEnd,1),this.sort,this.ascDesc,this.searchFilter,this.pageNumber,this.pageSize)
        .subscribe((data:any) => {
          console.log(data)
          this.dataSource = data.rows
          
          //reformat date
          for(let row in this.dataSource)
        {
          this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
          this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
        }        
         
          this.numberOfRecords = data.totalItems
        },
        (error:any) => {
          console.log(error)
          alert('api is down')
        })
    }
  }

  pageChange(PageEvent:any) {
    this.pageSize = PageEvent.pageSize
    this.pageNumber = PageEvent.pageIndex

    this.dataService.getPainMeasureTable(this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter,this.pageNumber,this.pageSize)
    .subscribe((data:any) => {
      this.dataSource = data.rows

      //reformat date
      for(let row in this.dataSource)
      {
        this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
        this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
      }

      this.numberOfRecords = data.totalItems
    },
    (error:any) => {
      console.log(error)
      alert('api is down')
    })
    
  }

  sortData(sort:Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {

      this.sort = 'questionare_date'
      this.ascDesc = 'false'
      this.pageNumber = 0

      this.dataService.getPainMeasureTable(this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter,this.pageNumber,this.pageSize)
      .subscribe((data:any) => {
        this.dataSource = data.rows

        //reformat date
        for(let row in this.dataSource)
        {
          this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
          this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
        }

        this.numberOfRecords = data.totalItems
      },
      (error:any) => {
        console.log(error)
        alert('api is down')
      })
      
      return;
    }
    this.dataSource = data.sort((a,b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'painmeasure':
          this.sort = 'painmeasure'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getPainMeasureTable(this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter,this.pageNumber,this.pageSize)
          .subscribe((data:any) => {
            this.dataSource = data.rows
    
            //reformat date
            for(let row in this.dataSource)
            {
              this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
              this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
            }
    
            this.numberOfRecords = data.totalItems
          },
          (error:any) => {
            console.log(error)
            alert('api is down')
          })

        case 'questionare_date':
          this.sort = 'questionare_date'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getPainMeasureTable(this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter[0],this.pageNumber,this.pageSize)
          .subscribe((data:any) => {
            this.dataSource = data.rows
    
            //reformat date
            for(let row in this.dataSource)
            {
              this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
              this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
            }
    
            this.numberOfRecords = data.totalItems
          },
          (error:any) => {
            console.log(error)
            alert('api is down')
          })
      }
    })
  }

  downloadData(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
    if (dateRangeStart.value != "" && dateRangeEnd.value != "")
    {
      
      let url:string = this.dataService.getPainMeasureDownload(this.id,this.chartService.formatFilterDate(dateRangeStart,0), this.chartService.formatFilterDate(dateRangeEnd,1))
      window.open(url,'_blank');
    }
  }

  applyFilter(event:Event,index:number) {
    this.pageNumber = 0
    this.searchFilter = (event.target as HTMLInputElement).value;

    this.dataService.getPainMeasureTable(this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter,this.pageNumber,this.pageSize)
      .subscribe((data:any) => {
        this.dataSource = data.rows

        //reformat date
        for(let row in this.dataSource)
        {
          this.dataSource[row].questionare_date = new Date(this.dataSource[row].questionare_date)
          this.dataSource[row].questionare_date = this.chartService.formatDateColumn(this.dataSource[row].questionare_date)
        }

        this.numberOfRecords = data.totalItems
      },
      (error:any) => {
        console.log(error)
        alert('api is down')
      })     
  }
  
}
