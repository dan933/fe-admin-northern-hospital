import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { PatientOverviewComponent } from './patient-overview/patient-overview.component';
import { PatientsComponent } from './patients/patients.component';
import { AnxietyDepressionChartComponent } from './anxiety-depression-chart/anxiety-depression-chart.component';

const routes: Routes = [
  {path:'overview/:id', component:PatientOverviewComponent},
  {path:'overview/anxietydepressionchart/:id', component:AnxietyDepressionChartComponent},
  {path:'overview', component:OverviewComponent},
  {path:'patients', component:PatientsComponent},
  {path:'', redirectTo:'overview', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }