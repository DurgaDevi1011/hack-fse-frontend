import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchrestaurantsComponent } from './searchrestaurants.component';

describe('SearchrestaurantsComponent', () => {
  let component: SearchrestaurantsComponent;
  let fixture: ComponentFixture<SearchrestaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchrestaurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchrestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
