import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})

export class LanguageSelectorService {
  private defaultLanguage: string = "ru"


  public constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.defaultLanguage)
    this.translate.use(this.defaultLanguage)
  }

  public getDefaultLanguage(): string {
    return this.defaultLanguage
  }

  public use(lang: string): void {
    this.translate.use(lang)
  }
}
