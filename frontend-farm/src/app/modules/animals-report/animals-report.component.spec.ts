import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsReportComponent } from './animals-report.component';

describe('AnimalsReportComponent', () => {
  let component: AnimalsReportComponent;
  let fixture: ComponentFixture<AnimalsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
