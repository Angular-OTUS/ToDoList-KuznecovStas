import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoTask} from "../../interfaces/to-do";
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces/button";

@Component({
  selector: 'app-to-do-list-item',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.scss'
})
export class ToDoListItemComponent {
  deleteButton: Button

  @Input() todo!: TodoTask;
  @Output() deleteToDoItem = new  EventEmitter<number>;
  @Output() finishToDoItem = new  EventEmitter<number>;
  constructor() {
    this.deleteButton = {
      title: "delete",
      color: "white",
      background: "red"
    }
  }

  finishItem(taskId: number) {
    this.finishToDoItem.emit(taskId)
  }

  deleteItem(taskId: any) {
    this.deleteToDoItem.emit(taskId)
  }
}


