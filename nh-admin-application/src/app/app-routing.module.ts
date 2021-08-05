import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { PatientsComponent } from './patients/patients.component';
import { AnxietyDepressionChartComponent } from './anxiety-depression-chart/anxiety-depression-chart.component';
import { PainMeasureChartComponent } from './pain-measure-chart/pain-measure-chart.component';
import { AnxietyDepressionTableComponent } from './anxiety-depression-table/anxiety-depression-table.component';

const routes: Routes = [
  {path:'overview/anxietydepressionchart/:id', component:AnxietyDepressionChartComponent},
  {path:'overview/anxietydepressiontable/:id', component:AnxietyDepressionTableComponent},
  {path:'overview/painmeasurechart/:id', component:PainMeasureChartComponent},
  {path:'overview', component:OverviewComponent},
  {path:'patients', component:PatientsComponent},
  {path:'', redirectTo:'overview', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }