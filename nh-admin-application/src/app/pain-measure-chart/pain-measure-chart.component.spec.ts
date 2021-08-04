import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainMeasureChartComponent } from './pain-measure-chart.component';

describe('PainMeasureChartComponent', () => {
  let component: PainMeasureChartComponent;
  let fixture: ComponentFixture<PainMeasureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainMeasureChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainMeasureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
