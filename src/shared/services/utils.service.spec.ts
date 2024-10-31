import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';
import { provideHttpClient } from '@angular/common/http';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UtilsService,
        provideHttpClient(),
      ]
    }).compileComponents();

    service = TestBed.inject(UtilsService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  it('should test clone', () => {
    const parseSpy = spyOn(JSON, 'parse').and.callThrough();
    const stringifySpy = spyOn(JSON, 'stringify').and.callThrough();
    service.clone({});
    expect(parseSpy).toHaveBeenCalled();
    expect(stringifySpy).toHaveBeenCalled();
  });
});
