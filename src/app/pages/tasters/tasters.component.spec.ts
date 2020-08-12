import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TastersComponent } from './tasters.component';

describe('TastersComponent', () => {
  let component: TastersComponent;
  let fixture: ComponentFixture<TastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
