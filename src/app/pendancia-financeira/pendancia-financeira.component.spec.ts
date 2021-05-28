import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendanciaFinanceiraComponent } from './pendancia-financeira.component';

describe('PendanciaFinanceiraComponent', () => {
  let component: PendanciaFinanceiraComponent;
  let fixture: ComponentFixture<PendanciaFinanceiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendanciaFinanceiraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendanciaFinanceiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
