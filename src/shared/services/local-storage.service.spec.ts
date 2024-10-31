import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { provideHttpClient } from '@angular/common/http';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        provideHttpClient(),
      ]
    }).compileComponents();

    service = TestBed.inject(LocalStorageService);
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  it('should test removeItem', () => {
    const removeItemSpy = spyOn(localStorage, 'removeItem');
    service.removeItem('');
    expect(removeItemSpy).toHaveBeenCalled();
  });
  it('should test getItem', () => {
    const parseSpy = spyOn(JSON, 'parse').and.callThrough();
    const getItemSpy = spyOn(localStorage, 'getItem').and.callThrough();
    const result = service.getItem('test');
    expect(parseSpy).toHaveBeenCalled();
    expect(getItemSpy).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
  it('should test setItem', () => {
    const setItemSpy = spyOn(localStorage, 'setItem').and.callThrough();
    service.setItem('test1', 10);
    expect(setItemSpy).toHaveBeenCalled();
  });
});
