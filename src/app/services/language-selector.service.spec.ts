import {TestBed} from '@angular/core/testing';
import {LanguageSelectorService} from './language-selector.service';
import {TranslateService} from '@ngx-translate/core';

describe('LanguageSelectorService', () => {
  let service: LanguageSelectorService;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use']);

    TestBed.configureTestingModule({
      providers: [
        LanguageSelectorService,
        {provide: TranslateService, useValue: spy}
      ]
    });

    service = TestBed.inject(LanguageSelectorService);
    translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set default language on initialization', () => {
    expect(translateServiceSpy.setDefaultLang).toHaveBeenCalledWith('ru');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('ru');
  });

  it('should return default language', () => {
    expect(service.getDefaultLanguage()).toBe('ru');
  });

  it('should change language', () => {
    service.use('en');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
  });
});
