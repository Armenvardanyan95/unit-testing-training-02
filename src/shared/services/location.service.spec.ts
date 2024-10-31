import { TestBed } from '@angular/core/testing';
import { LocationsService } from './locations.service';
import { HttpParams, provideHttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Environment } from '../environment';

describe('LocationsService', () => {
  let service: LocationsService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        LocationsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    service = TestBed.inject(LocationsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  it('should check getMyLocations', () => {
    const store = TestBed.inject(LocalStorageService);
    const getItemSpy = spyOn(store, 'getItem');
    service.getMyLocations();
    expect(getItemSpy).toHaveBeenCalledWith('myLocations');
  });
  it('should test searchLocations', () => {
    const search = 'New York';
    const payload = [{
      id: 1,
      name: 'New York',
      region: 'New York',
      country: 'United States of America',
      lat: 40.7143,
      lon: -74.006,
      url: 'https://www.weatherapi.com/weather/40.7143/-74.006',
    }];
    service.searchLocations(search).subscribe((result) => {
      expect(result).toEqual(payload);
   });
   const env = TestBed.inject(Environment);
   const params = new HttpParams({
    fromObject: {
        q: search,
        limit: 20,
        key: env.apiKey,
    },
   });
   const req = httpTestingController.expectOne(
      `${env.apiUrl}/search.json?${params.toString()}`
   );
   expect(req.request.params.toString()).toBe(params.toString());
   expect(req.request.method).toBe('GET');
  });
});
