import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFirstComponent } from './dialog-first.component';

describe('DialogFirstComponent', () => {
  let component: DialogFirstComponent;
  let fixture: ComponentFixture<DialogFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
