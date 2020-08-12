import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsInBloomComponent } from './foods-in-bloom.component';

describe('FoodsInBloomComponent', () => {
  let component: FoodsInBloomComponent;
  let fixture: ComponentFixture<FoodsInBloomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodsInBloomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodsInBloomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
