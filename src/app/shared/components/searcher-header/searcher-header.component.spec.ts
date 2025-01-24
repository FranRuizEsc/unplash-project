import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcherHeaderComponent } from './searcher-header.component';

describe('SearcherHeaderComponent', () => {
  let component: SearcherHeaderComponent;
  let fixture: ComponentFixture<SearcherHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearcherHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearcherHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
