import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../services/";
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule,
    ButtonComponent
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  toasts: string[] = []
  closeButton: Button;

  constructor(private toastsService: ToastService) {
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

  ngOnInit() {
    this.toastsService.toasts$.subscribe(toasts => {
      this.toasts = toasts
    })
  }

  removeToast(index: number) {
    this.toastsService.removeToast(index)
  }
}
