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

  it('Создания сервиса', () => {
    expect(service).toBeTruthy();
  });

  it('Устанавливаем язык ', () => {
    expect(translateServiceSpy.setDefaultLang).toHaveBeenCalledWith('ru');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('ru');
  });

  it('возвращает язык по умолчанию', () => {
    expect(service.getDefaultLanguage()).toBe('ru');
  });

  it('изменяет язык', () => {
    service.use('en');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
  });
  it('не изменяет язык, если передан пустой строкой', () => {
    service.use('');
    expect(translateServiceSpy.use).not.toHaveBeenCalledWith('');
  });
});
