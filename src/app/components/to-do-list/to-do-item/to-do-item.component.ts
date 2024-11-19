import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button, TodoTask} from "../../../interfaces";
import {ButtonComponent} from "../../button/button.component";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {Router} from '@angular/router';
import {ROUTERS} from "../../../constants/routers";

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
  public deleteButton: Button
  public editButton: Button

  @Input() public todo!: TodoTask;
  @Input() public selectedItem!: number | null;
  @Output() public deleteToDoItem = new EventEmitter<number>;
  @Output() public finishToDoItem = new EventEmitter<number>;
  @Output() public showDescriptionToDoItem = new EventEmitter<number>();
  @Output() public updateToDoItem = new EventEmitter<TodoTask>();

  public constructor(private router: Router) {
    this.deleteButton = {
      icon: "BUTTONS.DELETE",
      title: "BUTTONS.DELETE_TITLE",
      class: {
        color: "#FFFFFFFF",
        background: "#ca0000",
      }
    }
    this.editButton = {
      icon: "BUTTONS.EDIT",
      title: "BUTTONS.EDIT_TITLE",
      class: {
        color: "#FFFFFFFF",
        background: "#4d7839",
      }
    }
  }

  public finishItem(todoId: number): void {
    this.finishToDoItem.emit(todoId)
  }

  public deleteItem(todoId: number): void {
    this.deleteToDoItem.emit(todoId)
  }

  // показывает описание таска
  public goToTodo(id: number): void {
    this.router.navigate([ROUTERS.BACKLOG, id])
  }

  // редактирование таска
  public editItem(todo: TodoTask): void {
    this.router.navigate([ROUTERS.BACKLOG, todo.id, 'edit'], {state: {todo: this.todo}})
  }
}


