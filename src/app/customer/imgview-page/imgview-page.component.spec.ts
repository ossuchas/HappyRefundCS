import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgviewPageComponent } from './imgview-page.component';

describe('ImgviewPageComponent', () => {
  let component: ImgviewPageComponent;
  let fixture: ComponentFixture<ImgviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
