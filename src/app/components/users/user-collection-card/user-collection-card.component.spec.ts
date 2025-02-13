import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCollectionCardComponent } from './user-collection-card.component';

describe('UserCollectionCardComponent', () => {
  let component: UserCollectionCardComponent;
  let fixture: ComponentFixture<UserCollectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCollectionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCollectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
