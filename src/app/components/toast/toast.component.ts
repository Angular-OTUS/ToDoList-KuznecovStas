import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ToastService} from "../../services/toast.service";
import {NgForOf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces";
import {TuiAlertService, TuiButton} from '@taiga-ui/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    ButtonComponent,
    TuiButton
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {
  public toasts: string[] = []
  public closeButton: Button;
  private readonly alerts = inject(TuiAlertService);
  private readonly translate = inject(TranslateService);

  public constructor(
    private toastsService: ToastService) {
    this.closeButton = {
      icon: "BUTTONS.CLOSE",
      title: "BUTTONS.CLOSE_TITLE",
      class: {
        color: "white",
        background: "red",
        height: "20px",
        width: "20px",
      }
    }
  }


  public ngOnInit() {
    this.toastsService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
      this.showToasts();
    });
  }

  public showToasts() {
    this.toasts.forEach((toast, index) => {
      const translatedToast = this.translate.instant(toast);
      this.alerts
        .open(translatedToast, {label: 'Notification', autoClose: 5000})
        .subscribe({
          complete: () => this.removeToast(index)
        });
    });
  }

  public removeToast(index: number) {
    this.toastsService.removeToast(index);
  }
}
