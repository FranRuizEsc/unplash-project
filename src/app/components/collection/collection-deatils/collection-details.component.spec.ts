import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCollectionPhotosComponent } from './collection-details.component';

describe('UserCollectionPhotosComponent', () => {
  let component: UserCollectionPhotosComponent;
  let fixture: ComponentFixture<UserCollectionPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCollectionPhotosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserCollectionPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
