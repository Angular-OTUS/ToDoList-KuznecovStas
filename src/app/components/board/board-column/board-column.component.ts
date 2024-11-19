import {Component, Input} from '@angular/core';
import {TodoTask} from "../../../interfaces";
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-board-column',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule
  ],
  templateUrl: './board-column.component.html',
  styleUrl: './board-column.component.scss'
})
export class BoardColumnComponent {
  @Input() public items: TodoTask[] = [];
  @Input() public title: string = '';

  public trackBy(index: number, task: TodoTask): number {
    return task.id;
  }
}
