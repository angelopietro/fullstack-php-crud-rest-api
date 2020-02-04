import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewUrlComponent } from './preview.component';

describe('PreviewUrlComponent', () => {
  let component: PreviewUrlComponent;
  let fixture: ComponentFixture<PreviewUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
