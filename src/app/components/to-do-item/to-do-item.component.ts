import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoTask} from "../../interfaces/to-do";
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces/button";

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [
    ButtonComponent,
  ],
  templateUrl: './to-do-tem.component.html',
  styleUrl: './to-do-item.component.scss'
})
export class ToDoItemComponent {
  deleteButton: Button
  finishButton: Button

  @Input() todo!: TodoTask;
  @Input() selectedItem!: number | null;
  @Output() deleteToDoItem = new EventEmitter<number>;
  @Output() finishToDoItem = new EventEmitter<number>;
  @Output() showDescriptionToDoItem = new EventEmitter<number>();

  constructor() {
    this.deleteButton = {
      icon: "BUTTONS.DELETE",
      title: "BUTTONS.DELETE_TITLE",
      color: "white",
      background: "red"
    }
    this.finishButton = {
      icon: "BUTTONS.FINISH",
      title: "BUTTONS.FINISH_TITLE",
      color: "white",
      background: "green"
    }
  }

  finishItem(todoId: number) {
    this.finishToDoItem.emit(todoId)
  }

  deleteItem(todoId: any) {
    this.deleteToDoItem.emit(todoId)
  }

  showDescription(todoId: number) {
    this.showDescriptionToDoItem.emit(todoId)
  }
}


