import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {TodoStoreService} from "../../../services/todo-store.service";
import {Button, TodoTask} from '../../../interfaces';
import {catchError, tap} from 'rxjs';
import {JsonPipe, NgIf} from "@angular/common";
import {ButtonComponent} from "../../button/button.component";
import {ROUTERS} from "../../../constants/routers";


@Component({
  selector: 'app-to-do-item-view',
  standalone: true,
  imports: [
    JsonPipe,
    ButtonComponent,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './to-do-item-view.component.html',
  styleUrl: './to-do-item-view.component.scss'
})
export class ToDoItemViewComponent implements OnInit {
  public todo: TodoTask | undefined;
  public goBackButton: Button
  public editTodoButton: Button


  public constructor(
    private route: ActivatedRoute,
    private store: TodoStoreService,
    private router: Router
  ) {
    this.goBackButton = {
      icon: "BUTTONS.GO_BACK",
      title: "BUTTONS.GO_BACK_TITLE",
      class: {
        color: "white",
        background: "red",
      }
    }
    this.editTodoButton = {
      icon: "BUTTONS.EDIT",
      title: "BUTTONS.EDIT_TITLE",
      class: {
        color: "white",
        background: "green",
      }
    }

  }


  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.store.getTaskByID(id).pipe(
        tap(data => {
          this.todo = data;
        }),
        catchError(() => {
          return this.router.navigate([ROUTERS.NOT_FOUND]);
        })
      ).subscribe();
    });
  }

  public goBack() {
    this.router.navigate(['/']);
  }


  public editTodo() {
    this.router.navigate(['edit'], {relativeTo: this.route, state: {todo: this.todo}})
  }

  public isTaskEdit() {
    return this.route.snapshot.firstChild !== null; // если есть дочерний роутер, значит выбрана задача
  }
}
