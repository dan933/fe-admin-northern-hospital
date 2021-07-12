import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
  {path:'overview', component:OverviewComponent},
  {path:'patients', component:PatientsComponent},
  {path:'', redirectTo:'overview', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }