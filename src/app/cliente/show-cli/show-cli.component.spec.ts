import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCliComponent } from './show-cli.component';

describe('ShowCliComponent', () => {
  let component: ShowCliComponent;
  let fixture: ComponentFixture<ShowCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
