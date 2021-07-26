import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientOverviewNavBarComponent } from './patient-overview-nav-bar.component';

describe('PatientOverviewNavBarComponent', () => {
  let component: PatientOverviewNavBarComponent;
  let fixture: ComponentFixture<PatientOverviewNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientOverviewNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientOverviewNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
