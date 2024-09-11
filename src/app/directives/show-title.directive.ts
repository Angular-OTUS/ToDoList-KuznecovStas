import {Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2} from '@angular/core';

@Directive({
  selector: '[appShowTitle]',
  standalone: true
})
export class ShowTitleDirective implements OnDestroy {
  @Input('appShowTitle') appShowTitle: string = ''
  private tooltip: HTMLElement | null = null;

  constructor(private el: ElementRef, private render: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    // console.log('mouseenter', 'title = ' + this.appShowTitle)
    // вывести подсказку что делает данная кнопку использую html
    if (!this.tooltip) {
      this.tooltip = this.render.createElement('div');
      const text = this.render.createText(this.appShowTitle);
      this.render.appendChild(this.tooltip, text);
      this.render.appendChild(document.body, this.tooltip);
      this.render.setStyle(this.tooltip, 'position', 'fixed');
      this.render.setStyle(this.tooltip, 'background', '#858484');
      this.render.setStyle(this.tooltip, 'color', '#fff');
      this.render.setStyle(this.tooltip, 'padding', '5px');
      this.render.setStyle(this.tooltip, 'borderRadius', '5px');
      this.render.setStyle(this.tooltip, 'zIndex', '1000');
      this.render.setStyle(this.tooltip, 'fontSize', '11px');

      // получение координат элемента для позиционирования подсказки
      const rect = this.el.nativeElement.getBoundingClientRect();
      this.render.setStyle(this.tooltip, 'top', `${rect.bottom + window.scrollY}px`);
      this.render.setStyle(this.tooltip, 'left', `${rect.left + window.scrollX}px`);
      // смещение подсказки вправо
      this.render.setStyle(this.tooltip, 'transform', 'translateX(+50%)');
    }
  }


  @HostListener('mouseleave') onMouseLeave() {
    this.removeTooltip();
  }

  ngOnDestroy() {
    this.removeTooltip();
  }

  private removeTooltip() {
    if (this.tooltip) {
      this.render.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }
  }

}
