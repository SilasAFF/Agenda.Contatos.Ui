import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCliComponent } from './add-edit-cli.component';

describe('AddEditCliComponent', () => {
  let component: AddEditCliComponent;
  let fixture: ComponentFixture<AddEditCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
