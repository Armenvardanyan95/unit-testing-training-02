import { provideHttpClient } from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Environment } from '../environment';
import { WeatherLocation } from '../types/location.type';
import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  let service: LocationsService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        LocationsService,
        { provide: Environment, useValue: { apiKey: 'test', apiUrl: 'test' } },
      ],
    });

    service = TestBed.inject(LocationsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search locations', () => {
    const testResponse: WeatherLocation[] = [
      {
        id: 1,
        name: 'test',
        region: 'test',
        country: 'test',
        lat: 1,
        lon: 1,
        url: 'test',
      },
    ];

    service.searchLocations('test').subscribe(response => {
      expect(response).toEqual(testResponse);
    });

    const req = controller.expectOne({
      method: 'GET',
      url: `test/search.json?q=test&limit=20&key=test`,
    });

    req.flush(testResponse);
  });
});
