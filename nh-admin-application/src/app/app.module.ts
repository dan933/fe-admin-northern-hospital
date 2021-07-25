import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//routing
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { OverviewComponent } from './overview/overview.component';
import { PatientsComponent } from './patients/patients.component';

//data and chart services
import { DataService } from './services/data.service';
import { ChartService } from './services/chart.service';

//for CRUD http requests
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//angular materials
import { MatTableModule } from '@angular/material/table' 
import { MatToolbarModule } from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


//Pagination and sorting
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSortModule} from '@angular/material/sort';
import { PatientOverviewComponent } from './patient-overview/patient-overview.component';

//charts
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    OverviewComponent,
    PatientOverviewComponent,
    PatientsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    FlexLayoutModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    })
  ],
  exports:[MatToolbarModule,MatFormFieldModule, MatButtonModule],
  providers: [DataService, ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
