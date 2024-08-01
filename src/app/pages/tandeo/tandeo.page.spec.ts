import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TandeoPage } from './tandeo.page';

describe('TandeoPage', () => {
  let component: TandeoPage;
  let fixture: ComponentFixture<TandeoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TandeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
