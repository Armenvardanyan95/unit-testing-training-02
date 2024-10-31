import { TestBed } from '@angular/core/testing';
import { ForecastService } from './forecast.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Environment } from '../environment';

describe('ForecastService', () => {
  let service: ForecastService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ForecastService,
        provideHttpClient(),
        provideHttpClientTesting(),
        Environment,
      ]
    }).compileComponents();

    service = TestBed.inject(ForecastService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  it('should test getBulkForecast', () => {
    const payload = {
        bulk: []
    };

    const locations = [{
      lat: 40.7128,
       lon: -74.006,
       country: 'US',
       region: 'New York',
       name: 'New York',
       id: 1,
      url: 'https://www.weatherapi.com/weather/40.7128/-74.006'
    }];

    service.getBulkForecast(locations).subscribe((result) => {
        expect(result).toEqual(payload);
    });

    const env = TestBed.inject(Environment);
    const req = httpTestingController.expectOne(
        `${env.apiUrl}/current.json?key=${env.apiKey}&q=bulk`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
        locations: locations.map((location) => ({
            q: `${location.lat},${location.lon}`,
        })),
    });

    req.flush(payload);
  });
});
