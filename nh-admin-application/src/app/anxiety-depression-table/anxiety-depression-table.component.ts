import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { anxietyDepression } from '../models/anxietyDepression.model';
import {Sort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anxiety-depression-table',
  templateUrl: './anxiety-depression-table.component.html',
  styleUrls: ['./anxiety-depression-table.component.scss']
})
export class AnxietyDepressionTableComponent implements OnInit {

  id:string=""

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private dataService : DataService
  ) { 
    this.route.params.subscribe( params => 
      this.id = params.id)
  }

  numberOfRecords:number = 0
  searchd1 = ""
  searchd2 = ""
  searchd3 = ""
  searchd4 = ""
  searchd5 = ""
  searchd6 = ""
  searchd7 = ""
  searchd8 = ""
  searcha1 = ""
  searcha2 = ""
  searcha3 = ""
  searcha4 = ""
  searcha5 = ""
  searcha6 = ""
  searcha7 = ""
  searcha8 = ""
  pageSize = 10
  pageNumber = 0
  sort = 'questionare_date'
  ascDesc = 'true'

  dataSource:anxietyDepression[] = []
  displayedColumns:string[] = ['questionare_date','d1', 'd2','d3','d4','d5','d6','d7','d8','a1','a2','a3','a4','a5','a6','a7','a8'];
  displayedColumnFilters:string[] = ['questionare_date-filter','d1-filter', 'd2-filter','d3-filter','d4-filter','d5-filter','d6-filter','d7-filter','d8-filter','a1-filter','a2-filter','a3-filter','a4-filter','a5-filter','a6-filter','a7-filter','a8-filter'];

  ngOnInit(): void {
    this.dataService.getAnxietyTable(this.id,this.sort,this.ascDesc,this.searchd1,this.searchd2,this.searchd3,this.searchd4,this.searchd5,this.searchd6,this.searchd7,this.searchd8,this.searcha1,this.searcha2,this.searcha3,this.searcha4,this.searcha5,this.searcha6,this.searcha7,this.searcha8,this.pageNumber,this.pageSize)
    
  }

}
