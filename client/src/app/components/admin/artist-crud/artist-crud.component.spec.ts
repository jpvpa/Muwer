import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCrudComponent } from './artist-crud.component';

describe('ArtistCrudComponent', () => {
  let component: ArtistCrudComponent;
  let fixture: ComponentFixture<ArtistCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
