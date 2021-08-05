import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnxietyDepressionTableComponent } from './anxiety-depression-table.component';

describe('AnxietyDepressionTableComponent', () => {
  let component: AnxietyDepressionTableComponent;
  let fixture: ComponentFixture<AnxietyDepressionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnxietyDepressionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnxietyDepressionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
