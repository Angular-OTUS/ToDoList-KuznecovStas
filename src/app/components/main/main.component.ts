import {Component, OnInit} from '@angular/core';
import {SpinnerComponent} from "../spiner/spinner.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SpinnerComponent,
    TranslateModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  public isLoading?: boolean;

  public ngOnInit(): void {
    setTimeout(() => this.isLoading = true, 500)
  }
}
