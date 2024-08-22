import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoTask} from "../../interfaces/to-do";

@Component({
  selector: 'app-to-do-list-item',
  standalone: true,
  imports: [],
  templateUrl: './to-do-list-item.component.html',
  styleUrl: './to-do-list-item.component.scss'
})
export class ToDoListItemComponent {
  @Input() todo!: TodoTask;
  @Output() deleteToDoItem = new  EventEmitter<number>;
  @Output() finishToDoItem = new  EventEmitter<number>;


  finishItem(taskId: number) {
    this.finishToDoItem.emit(taskId)
  }

  deleteItem(taskId: any) {
    this.deleteToDoItem.emit(taskId)
  }
}


