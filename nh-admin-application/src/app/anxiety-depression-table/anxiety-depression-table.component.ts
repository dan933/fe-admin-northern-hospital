import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ChartService } from '../services/chart.service';
import { anxietyDepression } from '../models/anxietyDepression.model';
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
  selector: 'app-anxiety-depression-table',
  templateUrl: './anxiety-depression-table.component.html',
  styleUrls: ['./anxiety-depression-table.component.scss'],
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
export class AnxietyDepressionTableComponent implements OnInit {

  id:string=""

  today = new Date(Date.now())
  lastYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)

  range = new FormGroup({
    start: new FormControl(this.lastYear),
    end: new FormControl(this.today)
  });

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
  searchFilter:any[] = ["","","","","","","","","","","","","","","",""]
  pageSize = 10
  pageNumber = 0
  sort = 'questionare_date'
  ascDesc = 'false'

  dataSource:anxietyDepression[] = []
  displayedColumns:string[] = [
    'questionare_date','d1', 'd2','d3','d4','d5','d6','d7',
    'd8','a1','a2','a3','a4','a5','a6','a7','a8'];
  displayedColumnFilters:string[] = [
    'questionare_date-filter','d1-filter', 'd2-filter','d3-filter','d4-filter',
    'd5-filter','d6-filter','d7-filter','d8-filter','a1-filter','a2-filter',
    'a3-filter','a4-filter','a5-filter','a6-filter','a7-filter','a8-filter'];

  ngOnInit(): void {
    this.dataService.getAnxietyTable(
      this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter[0],this.searchFilter[1],
      this.searchFilter[2], this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],
      this.searchFilter[6],this.searchFilter[7], this.searchFilter[8],this.searchFilter[9],
      this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],this.searchFilter[13],
      this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
      .subscribe((data:any) => {
        console.log(data)
        this.dataSource = data.anxiety
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
      this.dataService.getAnxietyTable(
        this.id,this.chartService.formatFilterDate(dateRangeStart,0), this.chartService.formatFilterDate(dateRangeEnd,1),this.sort,this.ascDesc,this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
        this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
        this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
        this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
        .subscribe((data:any) => {
          this.dataSource = data.anxiety
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

    this.dataService.getAnxietyTable(
      this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
      this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
      this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
      this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
      .subscribe((data:any) => {
        this.dataSource = data.anxiety
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

      this.dataService.getAnxietyTable(
        this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
        this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
        this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
        this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
        .subscribe((data:any) => {
          this.dataSource = data.anxiety
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
        case 'a1':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a1',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
            case 'a2':
              return this.dataService.getAnxietyTable(
                this.id,this.lastYear,this.today,'a2',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
                this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
                this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
                this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
                .subscribe((data:any) => {
                  this.dataSource = data.anxiety
                  this.numberOfRecords = data.totalItems
                },
                (error:any) => {
                  console.log(error)
                  alert('api is down')
                })
        case 'a3':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a3',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'a4':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a4',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'a5':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a5',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'a6':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a6',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'a7':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a7',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'a8':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a8',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'd1':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d1',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'd2':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d2',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'd3':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d3',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'd4':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d4',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'd5':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d5',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'd6':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d6',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'd7':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d7',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'd8':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d8',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
        case 'questionare_date':
          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'questionare_date',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
            .subscribe((data:any) => {
              this.dataSource = data.anxiety
              this.numberOfRecords = data.totalItems
            },
            (error:any) => {
              console.log(error)
              alert('api is down')
            })
      }
    })
  }

  applyFilter(event:Event,index:number) {
    this.pageNumber = 0
    this.searchFilter[index] = (event.target as HTMLInputElement).value;

    this.dataService.getAnxietyTable(
      this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
      this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
      this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
      this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
      .subscribe((data:any) => {
        this.dataSource = data.anxiety
        this.numberOfRecords = data.totalItems
      },
      (error:any) => {
        console.log(error)
        alert('api is down')
      })
    
     
  }
}
