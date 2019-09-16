import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTermComponent } from './dialog-term.component';

describe('DialogTermComponent', () => {
  let component: DialogTermComponent;
  let fixture: ComponentFixture<DialogTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
