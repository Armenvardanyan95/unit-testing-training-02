import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatTable } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents, MockDirectives } from 'ng-mocks';
import { LocationsActions } from '../../shared/store/locations/locations.actions';
import {
  LocationsState,
  locationsFeature,
} from '../../shared/store/locations/locations.feature';
import { LocationsComponent } from './locations.component';

describe('LocationsComponent', () => {
  let store: MockStore;
  let mockLocationsStateSelector;
  const initialState: LocationsState = {
    locations: [
      {
        id: 1,
        name: 'name 1',
        region: 'region 1',
        country: 'country 1',
        lat: 1,
        lon: 1,
        url: 'url',
      },
      {
        id: 2,
        name: 'name 2',
        region: 'region 2',
        country: 'country 2',
        lat: 1,
        lon: 1,
        url: 'url',
      },
    ],
    favoriteLocations: [],
    loading: false,
    error: null,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MockComponents(MatFormField, MatTable, MatIcon, MatCard),
        MockDirectives(MatTooltip),
        FormsModule,
      ],
      providers: [provideMockStore(), provideNoopAnimations()],
    });

    store = TestBed.inject(MockStore);
    mockLocationsStateSelector = store.overrideSelector(
      locationsFeature.selectLocationsState,
      initialState
    );
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LocationsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render locations', () => {
    const fixture = TestBed.createComponent(LocationsComponent);
    fixture.detectChanges();
    store.refreshState();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('tr').length).toEqual(3);
  });

  it('should search locations', () => {
    const fixture = TestBed.createComponent(LocationsComponent);
    fixture.detectChanges();
    const instance = fixture.componentInstance;
    store.refreshState();
    const dispatchSpy = spyOn(store, 'dispatch').and.callFake(() => {});
    const compiled = fixture.nativeElement as HTMLElement;
    const [input] = Array.from(compiled.querySelectorAll('input'));
    expect(input).toBeTruthy();
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(instance.query()).toEqual('test');
    expect(dispatchSpy).toHaveBeenCalledWith(
      LocationsActions.searchLocations({ query: 'test' })
    );
  });

  it('should add to favorites', () => {
    const fixture = TestBed.createComponent(LocationsComponent);
    fixture.detectChanges();
    store.refreshState();
    const dispatchSpy = spyOn(store, 'dispatch').and.callFake(() => {});
    const compiled = fixture.nativeElement as HTMLElement;
    const [button] = Array.from(compiled.querySelectorAll('button'));
    expect(button).toBeTruthy();
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(
      LocationsActions.addToFavorites({ location: {...initialState.locations[0], favorite: false} } as unknown as any)
    );
  });
});
