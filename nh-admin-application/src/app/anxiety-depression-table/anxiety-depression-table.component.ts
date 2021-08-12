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

  today:any = new Date(Date.now()).toISOString().slice(0,10);  
  lastYear:any = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);

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
    this.createChart();
  }

  saveDate(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
    
    if (dateRangeStart.value != "" && dateRangeEnd.value != "")
    {
      this.lastYear = this.chartService.formatFilterDate(dateRangeStart,0)
      
      this.today = this.chartService.formatFilterDate(dateRangeEnd,1)
      
      this.createChart();
    }
  }

  downloadData(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
    if (dateRangeStart.value != "" && dateRangeEnd.value != "")
    {
      
      let url:string = this.dataService.getAnxietyDownload(this.id,this.chartService.formatFilterDate(dateRangeStart,0), this.chartService.formatFilterDate(dateRangeEnd,1))
      window.open(url,'_blank');
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

      this.dataService.getAnxietyTable(
        this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
        this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
        this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
        this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'a1':
          this.sort = 'a1'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a1',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
            case 'a2':
              this.sort = 'a2'
              this.ascDesc = String(isAsc)
              this.pageNumber = 0

              return this.dataService.getAnxietyTable(
                this.id,this.lastYear,this.today,'a2',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
                this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
                this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
                this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'a3':
          this.sort = 'a3'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a3',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'a4':
          this.sort = 'a4'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a4',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'a5':
          this.sort = 'a5'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a5',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'a6':
          this.sort = 'a6'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a6',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'a7':
          this.sort = 'a7'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a7',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'a8':
          this.sort = 'a8'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'a8',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'd1':
          this.sort = 'd1'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d1',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'd2':
          this.sort = 'd2'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d2',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'd3':
          this.sort = 'd3'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d3',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'd4':
          this.sort = 'd4'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d4',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'd5':
          this.sort = 'd5'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d5',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'd6':
          this.sort = 'd6'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d6',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'd7':
          this.sort = 'd7'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d7',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
        case 'd8':

          this.sort = 'd8'
          this.ascDesc = String(isAsc)
          this.pageNumber = 0

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'d8',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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

          return this.dataService.getAnxietyTable(
            this.id,this.lastYear,this.today,'questionare_date',String(isAsc),this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
            this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
            this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
            this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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

  applyFilter(event:Event,index:number) {
    this.pageNumber = 0
    this.searchFilter[index] = (event.target as HTMLInputElement).value;

    this.dataService.getAnxietyTable(
      this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter[0],this.searchFilter[1],this.searchFilter[2],
      this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],this.searchFilter[6],this.searchFilter[7],
      this.searchFilter[8],this.searchFilter[9],this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],
      this.searchFilter[13],this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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

  createChart(){
    this.dataService.getAnxietyTable(
      this.id,this.lastYear,this.today,this.sort,this.ascDesc,this.searchFilter[0],this.searchFilter[1],
      this.searchFilter[2], this.searchFilter[3],this.searchFilter[4],this.searchFilter[5],
      this.searchFilter[6],this.searchFilter[7], this.searchFilter[8],this.searchFilter[9],
      this.searchFilter[10],this.searchFilter[11],this.searchFilter[12],this.searchFilter[13],
      this.searchFilter[14],this.searchFilter[15],this.pageNumber,this.pageSize)
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
