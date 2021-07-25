import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnxietyDepressionChartComponent } from './anxiety-depression-chart.component';

describe('AnxietyDepressionChartComponent', () => {
  let component: AnxietyDepressionChartComponent;
  let fixture: ComponentFixture<AnxietyDepressionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnxietyDepressionChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnxietyDepressionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
