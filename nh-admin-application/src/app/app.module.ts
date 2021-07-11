import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OverviewComponent } from './overview/overview.component';
import { Router, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { DataService } from './services/data.service';

//for CRUD http requests
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//angular materials
import { MatTableModule } from '@angular/material/table' 
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    OverviewComponent,
    PatientsComponent  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatToolbarModule,
    RouterModule.forRoot([
      {path:'overview', component:OverviewComponent},
      {path:'patients', component:PatientsComponent},
      {path:'', redirectTo:'overview', pathMatch:'full'}
    ]),
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }