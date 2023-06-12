import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TibOperationComponent } from './tib-operation.component';

describe('TibOperationComponent', () => {
  let component: TibOperationComponent;
  let fixture: ComponentFixture<TibOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TibOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TibOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
