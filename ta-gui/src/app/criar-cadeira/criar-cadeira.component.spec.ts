import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCadeiraComponent } from './criar-cadeira.component';

describe('CriarCadeiraComponent', () => {
  let component: CriarCadeiraComponent;
  let fixture: ComponentFixture<CriarCadeiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarCadeiraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarCadeiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
