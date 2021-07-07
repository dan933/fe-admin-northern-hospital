import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OverviewComponent } from './overview/overview.component';
import { Router, RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { PatientsComponent } from './patients/patients.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    OverviewComponent,
    PatientsComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'overview', component:OverviewComponent},
      {path:'patients', component:PatientsComponent},
      {path:'', redirectTo:'overview', pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }