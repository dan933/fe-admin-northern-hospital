import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainMeasureTableComponent } from './pain-measure-table.component';

describe('PainMeasureTableComponent', () => {
  let component: PainMeasureTableComponent;
  let fixture: ComponentFixture<PainMeasureTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainMeasureTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainMeasureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
