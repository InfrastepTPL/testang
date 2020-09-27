import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalOComponent;
  let fixture: ComponentFixture<ModalOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
