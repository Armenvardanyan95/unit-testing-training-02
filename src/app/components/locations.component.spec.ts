import { TestBed } from '@angular/core/testing';
import { LocationsComponent } from './locations.component';
import { Store } from '@ngrx/store';

describe('LocationsComponent', () => {
  let fixture;
  let component: LocationsComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationsComponent],
      providers: [{
        provide: Store,
        useValue: {
          dispatch: () => {},
          selectSignal: () => {},
        },
      }],
    }).compileComponents();
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should test addToFavorites', () => {
    const storeSpy = spyOn(TestBed.inject(Store), 'dispatch');
    component.addToFavorites({} as any);
    expect(storeSpy).toHaveBeenCalled();
  });
  it('should test removeFromFavorites', () => {
    const storeSpy = spyOn(TestBed.inject(Store), 'dispatch');
    component.removeFromFavorites({} as any);
    expect(storeSpy).toHaveBeenCalled();
  });
});
