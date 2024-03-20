import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuejasFugasPage } from './quejas-fugas.page';

describe('QuejasFugasPage', () => {
  let component: QuejasFugasPage;
  let fixture: ComponentFixture<QuejasFugasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuejasFugasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
