import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoTask} from "../../../interfaces/to-do";
import {ButtonComponent} from "../../button/button.component";
import {Button} from "../../../interfaces/button";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from '@angular/router';

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './to-do-tem.component.html',
  styleUrl: './to-do-item.component.scss'
})
export class ToDoItemComponent {
  deleteButton: Button
  editButton: Button

  @Input() todo!: TodoTask;
  @Input() selectedItem!: number | null;
  @Output() deleteToDoItem = new EventEmitter<number>;
  @Output() finishToDoItem = new EventEmitter<number>;
  @Output() showDescriptionToDoItem = new EventEmitter<number>();
  @Output() updateToDoItem = new EventEmitter<TodoTask>();

  constructor(private router: Router) {
    this.deleteButton = {
      icon: "BUTTONS.DELETE",
      title: "BUTTONS.DELETE_TITLE",
      class: {
        color: "white",
        background: "red",
      }
    }
    this.editButton = {
      icon: "BUTTONS.EDIT",
      title: "BUTTONS.EDIT_TITLE",
      class: {
        color: "white",
        background: "green",
      }
    }
  }

  public finishItem(todoId: number): void {
    this.finishToDoItem.emit(todoId)
  }

  public deleteItem(todoId: any): void {
    this.deleteToDoItem.emit(todoId)
  }

  // показывает описание таска
  public goToTodo(id: number): void {
    this.router.navigate(['/tasks', id])
  }

  // редактирование таска
  public editItem(todo: TodoTask): void {
    this.router.navigate(['/tasks', todo.id, 'edit'], {state: {todo: this.todo}})
  }
}


