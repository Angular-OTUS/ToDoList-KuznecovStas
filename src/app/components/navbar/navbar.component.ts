import {Component} from '@angular/core';
import {LanguageSelectorComponent} from "../language-selector/language-selector.component";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LanguageSelectorComponent,
    TranslateModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public constructor(private router: Router) {
  }

  
  public goTo(target: string): void {
    this.router.navigate([target]);
  }
}
